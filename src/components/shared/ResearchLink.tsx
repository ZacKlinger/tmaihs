import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { researchLinks, findResearchLink } from "@/lib/researchLinks";

interface ResearchLinkProps {
  text: string;
  href?: string;
  className?: string;
  showIcon?: boolean;
}

export function ResearchLink({ text, href, className, showIcon = true }: ResearchLinkProps) {
  const url = href || researchLinks[text] || findResearchLink(text);
  
  if (!url) {
    // Fallback to plain text
    return <span className={className}>{text}</span>;
  }
  
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center gap-1 text-muted-foreground underline-offset-2 hover:text-foreground hover:underline",
        className
      )}
    >
      {text}
      {showIcon && <ExternalLink className="h-3 w-3 opacity-60" />}
    </a>
  );
}
