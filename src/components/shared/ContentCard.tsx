import { ReactNode } from "react";
import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { findResearchLink } from "@/lib/researchLinks";

interface ContentCardProps {
  title: string;
  children: ReactNode;
  citation?: string;
  className?: string;
}

// Parse citation string and create clickable links for recognized references
function parseCitation(citation: string): ReactNode {
  // Split by common separators but keep them
  const parts = citation.split(/([.;])/);
  
  return parts.map((part, index) => {
    const trimmed = part.trim();
    if (!trimmed || trimmed === '.' || trimmed === ';') {
      return part;
    }
    
    // Try to find a matching research link
    const url = findResearchLink(trimmed);
    
    if (url) {
      return (
        <a
          key={index}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-0.5 hover:text-foreground hover:underline underline-offset-2"
        >
          {part}
          <ExternalLink className="h-3 w-3 opacity-60 ml-0.5" />
        </a>
      );
    }
    
    return part;
  });
}

export function ContentCard({ title, children, citation, className }: ContentCardProps) {
  return (
    <div className={cn(
      "rounded-2xl border border-border/50 bg-card p-6 shadow-soft lg:p-8",
      className
    )}>
      <h3 className="mb-4 font-serif text-xl font-semibold text-charcoal">
        {title}
      </h3>
      <div className="text-muted-foreground leading-relaxed">
        {children}
      </div>
      {citation && (
        <p className="citation mt-4">
          {parseCitation(citation)}
        </p>
      )}
    </div>
  );
}
