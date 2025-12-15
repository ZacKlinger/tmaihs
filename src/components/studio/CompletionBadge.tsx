import { Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface CompletionBadgeProps {
  className?: string;
  showCertificateLink?: boolean;
}

export const CompletionBadge = ({ className, showCertificateLink = true }: CompletionBadgeProps) => {
  return (
    <div className={cn(
      "inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/30 rounded-full",
      className
    )}>
      <Award className="h-5 w-5 text-primary" />
      <span className="font-medium text-sm text-foreground">AI Fluent</span>
      {showCertificateLink && (
        <Link 
          to="/certificate" 
          className="text-xs text-primary hover:underline ml-1"
        >
          View Certificate
        </Link>
      )}
    </div>
  );
};
