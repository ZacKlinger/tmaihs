import { ReactNode } from "react";
import { PhoenixArcs } from "@/components/home/PhoenixArcs";

interface PageHeaderProps {
  title: string;
  description: string;
  icon?: ReactNode;
}

export function PageHeader({ title, description, icon }: PageHeaderProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background to-secondary/30 py-16 lg:py-20">
      <PhoenixArcs />
      
      <div className="section-container relative">
        <div className="mx-auto max-w-3xl text-center">
          {icon && (
            <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 opacity-0 animate-fade-in">
              {icon}
            </div>
          )}
          <h1 className="mb-4 font-serif text-3xl font-bold tracking-tight text-charcoal opacity-0 animate-fade-in sm:text-4xl lg:text-5xl" style={{ animationDelay: "0.1s" }}>
            {title}
          </h1>
          <p className="text-lg text-muted-foreground opacity-0 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            {description}
          </p>
        </div>
      </div>
    </section>
  );
}
