import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { researchLinks, findResearchLink } from "@/lib/researchLinks";

interface ResearchBadgeProps {
  label: string;
  href?: string;
  className?: string;
}

export function ResearchBadge({ label, href, className }: ResearchBadgeProps) {
  const url = href || researchLinks[label] || findResearchLink(label);
  
  if (!url) {
    // Fallback to non-linked badge
    return (
      <span 
        className={cn(
          "rounded-full border border-primary/20 bg-background px-4 py-1.5 text-sm text-muted-foreground",
          className
        )}
      >
        {label}
      </span>
    );
  }
  
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-background px-4 py-1.5 text-sm text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground",
        className
      )}
    >
      {label}
      <ExternalLink className="h-3 w-3 opacity-60" />
    </a>
  );
}
