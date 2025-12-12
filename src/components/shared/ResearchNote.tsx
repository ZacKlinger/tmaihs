import { BookOpen, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { findResearchLink } from "@/lib/researchLinks";

export interface ResearchNoteProps {
  children: React.ReactNode;
  className?: string;
}

// Component to render inline research links within text content
function InlineResearchLinks({ children }: { children: React.ReactNode }) {
  if (typeof children !== 'string') {
    return <>{children}</>;
  }
  
  // Known research terms to look for and link
  const terms = [
    "Russell & Norvig",
    "NeurIPS",
    "ACL",
    "National Academies",
    "RAND",
    "UNESCO",
    "World Economic Forum",
    "LinkedIn",
    "Chi & Wylie",
    "Sweller",
    "ICAP",
    "Cognitive Load Theory",
    "NIST",
    "Stanford HAI",
  ];
  
  let result = children;
  const elements: React.ReactNode[] = [];
  let lastIndex = 0;
  
  terms.forEach(term => {
    const regex = new RegExp(`(${term})`, 'gi');
    const match = regex.exec(children);
    if (match) {
      const url = findResearchLink(term);
      if (url) {
        elements.push(children.slice(lastIndex, match.index));
        elements.push(
          <a
            key={match.index}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-0.5 text-muted-foreground hover:text-foreground hover:underline underline-offset-2"
          >
            {match[1]}
            <ExternalLink className="h-3 w-3 opacity-60" />
          </a>
        );
        lastIndex = match.index + match[0].length;
      }
    }
  });
  
  // If no matches found, return original
  if (elements.length === 0) {
    return <>{children}</>;
  }
  
  elements.push(children.slice(lastIndex));
  return <>{elements}</>;
}

export function ResearchNote({ children, className }: ResearchNoteProps) {
  return (
    <div className={cn("mt-8 flex items-start gap-3 rounded-xl bg-primary/5 p-4 border border-primary/10", className)}>
      <BookOpen className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
      <div className="text-sm text-muted-foreground leading-relaxed">
        {children}
      </div>
    </div>
  );
}
