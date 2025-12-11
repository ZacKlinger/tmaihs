import { BookOpen } from "lucide-react";

interface ResearchNoteProps {
  children: React.ReactNode;
}

export function ResearchNote({ children }: ResearchNoteProps) {
  return (
    <div className="mt-8 flex items-start gap-3 rounded-xl bg-primary/5 p-4 border border-primary/10">
      <BookOpen className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
      <div className="text-sm text-muted-foreground leading-relaxed">
        {children}
      </div>
    </div>
  );
}
