import { useState } from 'react';
import { HelpCircle, AlertTriangle, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import type { PostType } from '@/hooks/useDiscussion';

interface NewPostFormProps {
  onSubmit: (content: string, postType: PostType, authorName: string, isAnonymous: boolean) => Promise<boolean>;
  submitting: boolean;
}

const postTypes: { type: PostType; icon: typeof HelpCircle; label: string; description: string }[] = [
  { type: 'question', icon: HelpCircle, label: 'Question', description: 'Ask the community' },
  { type: 'concern', icon: AlertTriangle, label: 'Concern', description: 'Share a worry or issue' },
  { type: 'excitement', icon: Sparkles, label: 'Excitement', description: 'Share something positive' }
];

export function NewPostForm({ onSubmit, submitting }: NewPostFormProps) {
  const [content, setContent] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [selectedType, setSelectedType] = useState<PostType>('question');

  const handleSubmit = async () => {
    if (!content.trim()) return;

    const success = await onSubmit(
      content,
      selectedType,
      isAnonymous ? 'Anonymous' : authorName || 'Anonymous',
      isAnonymous || !authorName
    );

    if (success) {
      setContent('');
      setAuthorName('');
      setIsAnonymous(false);
    }
  };

  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <h3 className="mb-4 font-serif text-lg font-semibold text-charcoal">
        Start a Discussion
      </h3>

      {/* Post Type Selection */}
      <div className="mb-4">
        <Label className="mb-2 block text-sm font-medium">
          What type of post is this?
        </Label>
        <div className="flex flex-wrap gap-2">
          {postTypes.map(({ type, icon: Icon, label }) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={cn(
                'flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all',
                selectedType === type
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-border bg-background text-muted-foreground hover:border-primary/50 hover:text-foreground'
              )}
            >
              <Icon className="h-4 w-4" />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="mb-4">
        <Textarea
          placeholder="Share your thoughts, questions, or concerns about AI in education..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          maxLength={5000}
          className="min-h-[120px] resize-none"
        />
        <p className="mt-1 text-xs text-muted-foreground text-right">
          {content.length}/5000 characters
        </p>
      </div>

      {/* Author Info */}
      <div className="mb-4 flex flex-wrap items-center gap-4">
        <div className="flex-1">
          <Input
            placeholder="Your name (optional)"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            disabled={isAnonymous}
            maxLength={100}
            className="max-w-[250px]"
          />
        </div>
        <div className="flex items-center gap-2">
          <Switch
            id="post-anonymous"
            checked={isAnonymous}
            onCheckedChange={setIsAnonymous}
          />
          <Label htmlFor="post-anonymous" className="text-sm">
            Post anonymously
          </Label>
        </div>
      </div>

      {/* Submit */}
      <Button
        onClick={handleSubmit}
        disabled={!content.trim() || submitting}
        className="w-full sm:w-auto"
      >
        {submitting ? 'Posting...' : 'Share with Community'}
      </Button>

      <p className="mt-3 text-xs text-muted-foreground">
        Please be respectful and constructive. All posts are reviewed by moderators.
      </p>
    </div>
  );
}
