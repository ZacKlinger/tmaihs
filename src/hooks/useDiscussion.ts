import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { filterContent, generateAnonymousId, getVoterId } from '@/lib/contentFilter';

export type PostType = 'question' | 'concern' | 'excitement';

export interface DiscussionPost {
  id: string;
  author_name: string;
  is_anonymous: boolean;
  post_type: PostType;
  content: string;
  upvotes: number;
  created_at: string;
  replies?: DiscussionReply[];
}

export interface DiscussionReply {
  id: string;
  post_id: string;
  author_name: string;
  is_anonymous: boolean;
  content: string;
  upvotes: number;
  created_at: string;
}

export function useDiscussion() {
  const [posts, setPosts] = useState<DiscussionPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [userVotes, setUserVotes] = useState<Set<string>>(new Set());
  const { toast } = useToast();

  const fetchPosts = async () => {
    try {
      // Use public views to ensure anonymous_identifier is never exposed at database level
      // Views exclude sensitive columns and enforce is_hidden=false filter
      const { data: postsData, error: postsError } = await supabase
        .from('discussion_posts_public')
        .select('id, author_name, is_anonymous, post_type, content, upvotes, created_at, updated_at')
        .order('created_at', { ascending: false });

      if (postsError) throw postsError;

      // Use public view for replies - excludes anonymous_identifier
      const { data: repliesData, error: repliesError } = await supabase
        .from('discussion_replies_public')
        .select('id, post_id, author_name, is_anonymous, content, upvotes, created_at')
        .order('created_at', { ascending: true });

      if (repliesError) throw repliesError;

      // Group replies by post
      const repliesByPost = (repliesData || []).reduce((acc, reply) => {
        if (!acc[reply.post_id]) acc[reply.post_id] = [];
        acc[reply.post_id].push(reply);
        return acc;
      }, {} as Record<string, DiscussionReply[]>);

      const postsWithReplies = (postsData || []).map(post => ({
        ...post,
        post_type: post.post_type as PostType,
        replies: repliesByPost[post.id] || []
      }));

      setPosts(postsWithReplies);
    } catch (error) {
      console.error('Error fetching posts:', error);
      toast({
        title: 'Error',
        description: 'Failed to load discussions',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchUserVotes = async () => {
    const voterId = getVoterId();
    // Use secure RPC function instead of direct SELECT to prevent voting pattern tracking
    const { data, error } = await supabase.rpc('check_user_votes', {
      p_voter_identifier: voterId
    });

    if (error) {
      console.error('Error fetching user votes:', error);
      return;
    }

    if (data) {
      const voteIds = new Set(
        data.map((v: { target_id: string }) => v.target_id).filter(Boolean)
      );
      setUserVotes(voteIds);
    }
  };

  useEffect(() => {
    fetchPosts();
    fetchUserVotes();

    // Subscribe to realtime updates
    const postsChannel = supabase
      .channel('posts-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'discussion_posts' }, () => {
        fetchPosts();
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'discussion_replies' }, () => {
        fetchPosts();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(postsChannel);
    };
  }, []);

  // Content length limits (must match server-side)
  const MAX_CONTENT_LENGTH = 5000;
  const MAX_AUTHOR_NAME_LENGTH = 100;

  const moderateContent = async (content: string, authorName?: string): Promise<{ isAppropriate: boolean; reason: string | null }> => {
    // Client-side length validation first
    if (content.length > MAX_CONTENT_LENGTH) {
      return { 
        isAppropriate: false, 
        reason: `Content exceeds maximum length of ${MAX_CONTENT_LENGTH} characters.` 
      };
    }
    if (authorName && authorName.length > MAX_AUTHOR_NAME_LENGTH) {
      return { 
        isAppropriate: false, 
        reason: `Author name exceeds maximum length of ${MAX_AUTHOR_NAME_LENGTH} characters.` 
      };
    }

    try {
      const { data, error } = await supabase.functions.invoke('moderate-content', {
        body: { content, authorName }
      });

      if (error) {
        console.error('Moderation error:', error);
        // Check for rate limit error
        if (error.message?.includes('429') || error.message?.includes('Too many requests')) {
          return { isAppropriate: false, reason: 'Too many requests. Please wait a moment before posting again.' };
        }
        // Fall back to client-side filter if server moderation fails
        const clientResult = filterContent(content);
        return { isAppropriate: clientResult.isClean, reason: clientResult.reason || null };
      }

      // Handle rate limit response
      if (data?.error && data?.retryAfter) {
        return { isAppropriate: false, reason: data.error };
      }

      return data;
    } catch (err) {
      console.error('Moderation request failed:', err);
      const clientResult = filterContent(content);
      return { isAppropriate: clientResult.isClean, reason: clientResult.reason || null };
    }
  };

  const createPost = async (
    content: string,
    postType: PostType,
    authorName: string,
    isAnonymous: boolean
  ) => {
    // Client-side content filter (fast initial check)
    const filterResult = filterContent(content);
    if (!filterResult.isClean) {
      toast({
        title: 'Content Not Allowed',
        description: filterResult.reason,
        variant: 'destructive'
      });
      return false;
    }

    setSubmitting(true);
    try {
      // Server-side AI moderation with length validation and rate limiting
      const moderationResult = await moderateContent(content, authorName);
      if (!moderationResult.isAppropriate) {
        toast({
          title: 'Content Not Allowed',
          description: moderationResult.reason || 'This content does not meet our community guidelines.',
          variant: 'destructive'
        });
        setSubmitting(false);
        return false;
      }

      const { error } = await supabase.from('discussion_posts').insert({
        content,
        post_type: postType,
        author_name: isAnonymous ? 'Anonymous' : authorName,
        is_anonymous: isAnonymous,
        anonymous_identifier: isAnonymous ? generateAnonymousId() : null
      });

      if (error) throw error;

      toast({
        title: 'Posted!',
        description: 'Your contribution has been shared with the community.'
      });
      return true;
    } catch (error) {
      console.error('Error creating post:', error);
      toast({
        title: 'Error',
        description: 'Failed to create post',
        variant: 'destructive'
      });
      return false;
    } finally {
      setSubmitting(false);
    }
  };

  const createReply = async (
    postId: string,
    content: string,
    authorName: string,
    isAnonymous: boolean
  ) => {
    // Client-side content filter (fast initial check)
    const filterResult = filterContent(content);
    if (!filterResult.isClean) {
      toast({
        title: 'Content Not Allowed',
        description: filterResult.reason,
        variant: 'destructive'
      });
      return false;
    }

    setSubmitting(true);
    try {
      // Server-side AI moderation with length validation and rate limiting
      const moderationResult = await moderateContent(content, authorName);
      if (!moderationResult.isAppropriate) {
        toast({
          title: 'Content Not Allowed',
          description: moderationResult.reason || 'This content does not meet our community guidelines.',
          variant: 'destructive'
        });
        setSubmitting(false);
        return false;
      }

      const { error } = await supabase.from('discussion_replies').insert({
        post_id: postId,
        content,
        author_name: isAnonymous ? 'Anonymous' : authorName,
        is_anonymous: isAnonymous,
        anonymous_identifier: isAnonymous ? generateAnonymousId() : null
      });

      if (error) throw error;

      toast({
        title: 'Reply Added',
        description: 'Your reply has been posted.'
      });
      return true;
    } catch (error) {
      console.error('Error creating reply:', error);
      toast({
        title: 'Error',
        description: 'Failed to create reply',
        variant: 'destructive'
      });
      return false;
    } finally {
      setSubmitting(false);
    }
  };

  const upvote = async (postId?: string, replyId?: string) => {
    const targetId = postId || replyId;
    if (!targetId) return;

    if (userVotes.has(targetId)) {
      toast({
        title: 'Already Voted',
        description: 'You have already upvoted this.',
        variant: 'destructive'
      });
      return;
    }

    try {
      const voterId = getVoterId();

      // Insert upvote record - the database trigger automatically increments the counter
      // This is atomic and secure: UNIQUE constraint prevents duplicates, trigger handles counting
      const { error: upvoteError } = await supabase.from('discussion_upvotes').insert({
        post_id: postId || null,
        reply_id: replyId || null,
        voter_identifier: voterId
      });

      if (upvoteError) throw upvoteError;

      setUserVotes(prev => new Set([...prev, targetId]));
      fetchPosts();
    } catch (error) {
      console.error('Error upvoting:', error);
    }
  };

  return {
    posts,
    loading,
    submitting,
    userVotes,
    createPost,
    createReply,
    upvote,
    refetch: fetchPosts
  };
}
