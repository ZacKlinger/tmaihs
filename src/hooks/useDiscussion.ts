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
      // Select only public fields, excluding moderation_notes and anonymous_identifier
      const { data: postsData, error: postsError } = await supabase
        .from('discussion_posts')
        .select('id, author_name, is_anonymous, post_type, content, upvotes, created_at, updated_at')
        .eq('is_hidden', false)
        .order('created_at', { ascending: false });

      if (postsError) throw postsError;

      // Select only public fields for replies
      const { data: repliesData, error: repliesError } = await supabase
        .from('discussion_replies')
        .select('id, post_id, author_name, is_anonymous, content, upvotes, created_at')
        .eq('is_hidden', false)
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
    const { data } = await supabase
      .from('discussion_upvotes')
      .select('post_id, reply_id')
      .eq('voter_identifier', voterId);

    if (data) {
      const voteIds = new Set(
        data.map(v => v.post_id || v.reply_id).filter(Boolean) as string[]
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

  const moderateContent = async (content: string): Promise<{ isAppropriate: boolean; reason: string | null }> => {
    try {
      const { data, error } = await supabase.functions.invoke('moderate-content', {
        body: { content }
      });

      if (error) {
        console.error('Moderation error:', error);
        // Fall back to client-side filter if server moderation fails
        const clientResult = filterContent(content);
        return { isAppropriate: clientResult.isClean, reason: clientResult.reason || null };
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
      // Server-side AI moderation (more thorough check)
      const moderationResult = await moderateContent(content);
      if (!moderationResult.isAppropriate) {
        toast({
          title: 'Content Not Allowed',
          description: moderationResult.reason || 'This content does not meet our community guidelines.',
          variant: 'destructive'
        });
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
      // Server-side AI moderation (more thorough check)
      const moderationResult = await moderateContent(content);
      if (!moderationResult.isAppropriate) {
        toast({
          title: 'Content Not Allowed',
          description: moderationResult.reason || 'This content does not meet our community guidelines.',
          variant: 'destructive'
        });
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

      // Insert upvote record
      const { error: upvoteError } = await supabase.from('discussion_upvotes').insert({
        post_id: postId || null,
        reply_id: replyId || null,
        voter_identifier: voterId
      });

      if (upvoteError) throw upvoteError;

      // Use secure RPC functions to increment upvotes
      if (postId) {
        const { error: rpcError } = await supabase.rpc('increment_post_upvote', { 
          post_id_param: postId 
        });
        if (rpcError) throw rpcError;
      } else if (replyId) {
        const { error: rpcError } = await supabase.rpc('increment_reply_upvote', { 
          reply_id_param: replyId 
        });
        if (rpcError) throw rpcError;
      }

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
