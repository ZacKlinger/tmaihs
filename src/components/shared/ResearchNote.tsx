import { BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ResearchNoteProps {
  children: React.ReactNode;
  className?: string;
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
