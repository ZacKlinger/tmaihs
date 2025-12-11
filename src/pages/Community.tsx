import { useState } from 'react';
import { MessageSquare, HelpCircle, AlertTriangle, Sparkles, Filter } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { PageHeader } from '@/components/shared/PageHeader';
import { ResearchNote } from '@/components/shared/ResearchNote';
import { NewPostForm } from '@/components/community/NewPostForm';
import { PostCard } from '@/components/community/PostCard';
import { Button } from '@/components/ui/button';
import { useDiscussion, PostType } from '@/hooks/useDiscussion';
import { cn } from '@/lib/utils';

const filterOptions: { type: PostType | 'all'; label: string; icon: typeof HelpCircle }[] = [
  { type: 'all', label: 'All', icon: Filter },
  { type: 'question', label: 'Questions', icon: HelpCircle },
  { type: 'concern', label: 'Concerns', icon: AlertTriangle },
  { type: 'excitement', label: 'Excitement', icon: Sparkles }
];

const Community = () => {
  const { posts, loading, submitting, userVotes, createPost, createReply, upvote } = useDiscussion();
  const [activeFilter, setActiveFilter] = useState<PostType | 'all'>('all');

  const filteredPosts = activeFilter === 'all'
    ? posts
    : posts.filter(post => post.post_type === activeFilter);

  return (
    <Layout>
      <PageHeader
        title="Community Discussion"
        description="Share your thoughts, questions, and experiences with AI in education. This is a space for TMAHS educators to learn from each other and explore AI's role in our classrooms together."
        icon={<MessageSquare className="h-8 w-8 text-primary" />}
      />

      <section className="py-16 lg:py-20">
        <div className="section-container">
          <div className="mx-auto max-w-3xl">
            {/* New Post Form */}
            <div className="mb-10">
              <NewPostForm onSubmit={createPost} submitting={submitting} />
            </div>

            {/* Community Guidelines */}
            <ResearchNote className="mb-8">
              <strong>Community Guidelines:</strong> This discussion board is for constructive dialogue 
              about AI in education. Be respectful, share your authentic experiences, and remember that 
              we're all learning together. Posts are moderated to ensure a safe and supportive environment.
            </ResearchNote>

            {/* Filter */}
            <div className="mb-6 flex flex-wrap items-center gap-2">
              <span className="mr-2 text-sm font-medium text-muted-foreground">Filter:</span>
              {filterOptions.map(({ type, label, icon: Icon }) => (
                <Button
                  key={type}
                  variant="ghost"
                  size="sm"
                  onClick={() => setActiveFilter(type)}
                  className={cn(
                    'gap-1.5',
                    activeFilter === type && 'bg-primary/10 text-primary'
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </Button>
              ))}
            </div>

            {/* Posts List */}
            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-48 animate-pulse rounded-xl border border-border bg-muted/50"
                  />
                ))}
              </div>
            ) : filteredPosts.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-border bg-secondary/30 p-12 text-center">
                <MessageSquare className="mx-auto mb-4 h-12 w-12 text-muted-foreground/50" />
                <h3 className="mb-2 font-serif text-lg font-semibold text-charcoal">
                  {activeFilter === 'all' ? 'No discussions yet' : `No ${activeFilter}s yet`}
                </h3>
                <p className="text-muted-foreground">
                  Be the first to start a conversation about AI in education!
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {filteredPosts.map((post) => (
                  <PostCard
                    key={post.id}
                    post={post}
                    userVotes={userVotes}
                    onUpvote={upvote}
                    onReply={createReply}
                    submitting={submitting}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Community;
