import { useState } from 'react';
import { MessageCircle, ThumbsUp, HelpCircle, AlertTriangle, Sparkles, Clock } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import type { DiscussionPost, PostType } from '@/hooks/useDiscussion';

interface PostCardProps {
  post: DiscussionPost;
  userVotes: Set<string>;
  onUpvote: (postId?: string, replyId?: string) => void;
  onReply: (postId: string, content: string, authorName: string, isAnonymous: boolean) => Promise<boolean>;
  submitting: boolean;
}

const postTypeConfig: Record<PostType, { icon: typeof HelpCircle; label: string; className: string }> = {
  question: {
    icon: HelpCircle,
    label: 'Question',
    className: 'bg-blue-500/10 text-blue-600 border-blue-500/20'
  },
  concern: {
    icon: AlertTriangle,
    label: 'Concern',
    className: 'bg-amber-500/10 text-amber-600 border-amber-500/20'
  },
  excitement: {
    icon: Sparkles,
    label: 'Excitement',
    className: 'bg-green-500/10 text-green-600 border-green-500/20'
  }
};

export function PostCard({ post, userVotes, onUpvote, onReply, submitting }: PostCardProps) {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyContent, setReplyContent] = useState('');
  const [replyAuthor, setReplyAuthor] = useState('');
  const [replyAnonymous, setReplyAnonymous] = useState(false);

  const config = postTypeConfig[post.post_type];
  const Icon = config.icon;
  const hasVotedPost = userVotes.has(post.id);

  const handleSubmitReply = async () => {
    if (!replyContent.trim()) return;
    
    const success = await onReply(
      post.id,
      replyContent,
      replyAnonymous ? 'Anonymous' : replyAuthor || 'Anonymous',
      replyAnonymous || !replyAuthor
    );

    if (success) {
      setReplyContent('');
      setReplyAuthor('');
      setReplyAnonymous(false);
      setShowReplyForm(false);
    }
  };

  return (
    <div className="rounded-xl border border-border bg-card p-6 transition-all hover:shadow-md">
      {/* Post Header */}
      <div className="mb-4 flex items-start justify-between">
        <div className="flex items-center gap-3">
          <span className={cn(
            'inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium',
            config.className
          )}>
            <Icon className="h-3.5 w-3.5" />
            {config.label}
          </span>
          <span className="text-sm font-medium text-charcoal">
            {post.author_name}
          </span>
        </div>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Clock className="h-3 w-3" />
          {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
        </div>
      </div>

      {/* Post Content */}
      <p className="mb-4 leading-relaxed text-foreground">
        {post.content}
      </p>

      {/* Post Actions */}
      <div className="flex items-center gap-4 border-t border-border pt-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onUpvote(post.id)}
          disabled={hasVotedPost}
          className={cn(
            'gap-1.5',
            hasVotedPost && 'text-primary'
          )}
        >
          <ThumbsUp className={cn('h-4 w-4', hasVotedPost && 'fill-current')} />
          {post.upvotes}
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowReplyForm(!showReplyForm)}
          className="gap-1.5"
        >
          <MessageCircle className="h-4 w-4" />
          {post.replies?.length || 0} Replies
        </Button>
      </div>

      {/* Replies */}
      {post.replies && post.replies.length > 0 && (
        <div className="mt-4 space-y-3 border-l-2 border-primary/20 pl-4">
          {post.replies.map((reply) => {
            const hasVotedReply = userVotes.has(reply.id);
            return (
              <div key={reply.id} className="rounded-lg bg-secondary/50 p-4">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm font-medium text-charcoal">
                    {reply.author_name}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(reply.created_at), { addSuffix: true })}
                  </span>
                </div>
                <p className="mb-2 text-sm text-foreground">{reply.content}</p>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onUpvote(undefined, reply.id)}
                  disabled={hasVotedReply}
                  className={cn(
                    'h-7 gap-1 px-2 text-xs',
                    hasVotedReply && 'text-primary'
                  )}
                >
                  <ThumbsUp className={cn('h-3 w-3', hasVotedReply && 'fill-current')} />
                  {reply.upvotes}
                </Button>
              </div>
            );
          })}
        </div>
      )}

      {/* Reply Form */}
      {showReplyForm && (
        <div className="mt-4 space-y-3 rounded-lg border border-border bg-secondary/30 p-4">
          <div>
            <Textarea
              placeholder="Write your reply..."
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              maxLength={5000}
              className="min-h-[80px] resize-none"
            />
            <p className="mt-1 text-xs text-muted-foreground text-right">
              {replyContent.length}/5000 characters
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <Input
              placeholder="Your name (optional)"
              value={replyAuthor}
              onChange={(e) => setReplyAuthor(e.target.value)}
              disabled={replyAnonymous}
              maxLength={100}
              className="max-w-[200px]"
            />
            <div className="flex items-center gap-2">
              <Switch
                id={`reply-anon-${post.id}`}
                checked={replyAnonymous}
                onCheckedChange={setReplyAnonymous}
              />
              <Label htmlFor={`reply-anon-${post.id}`} className="text-sm">
                Post anonymously
              </Label>
            </div>
            <Button
              size="sm"
              onClick={handleSubmitReply}
              disabled={!replyContent.trim() || submitting}
            >
              {submitting ? 'Posting...' : 'Post Reply'}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
