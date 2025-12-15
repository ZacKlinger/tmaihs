import { useState } from 'react';
import { Link } from 'react-router-dom';
import { X, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const SaveProgressBanner = () => {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 mb-6 flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-primary/20 rounded-full">
          <User className="h-4 w-4 text-primary" />
        </div>
        <div>
          <p className="text-sm font-medium text-foreground">
            Sign in to save your progress
          </p>
          <p className="text-xs text-muted-foreground">
            Your progress will be lost when you close this page
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button asChild size="sm" variant="default">
          <Link to="/auth">Sign In</Link>
        </Button>
        <button
          onClick={() => setDismissed(true)}
          className="p-1 hover:bg-muted rounded transition-colors"
          aria-label="Dismiss"
        >
          <X className="h-4 w-4 text-muted-foreground" />
        </button>
      </div>
    </div>
  );
};
