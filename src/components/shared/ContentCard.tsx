import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ContentCardProps {
  title: string;
  children: ReactNode;
  citation?: string;
  className?: string;
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
          {citation}
        </p>
      )}
    </div>
  );
}
