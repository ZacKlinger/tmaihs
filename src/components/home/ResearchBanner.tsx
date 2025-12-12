import { BookOpen } from "lucide-react";
import { ResearchBadge } from "@/components/shared/ResearchBadge";

export function ResearchBanner() {
  const frameworks = [
    "ICAP Framework",
    "Cognitive Load Theory", 
    "Culturally Sustaining Pedagogy",
    "NIST AI RMF",
    "Stanford HAI Guidelines",
  ];

  return (
    <section className="bg-secondary/50 py-16">
      <div className="section-container">
        <div className="flex flex-col items-center gap-6 text-center">
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
            <BookOpen className="h-7 w-7 text-primary" />
          </div>
          
          <h2 className="font-serif text-2xl font-semibold text-charcoal sm:text-3xl">
            Research-Grounded Design
          </h2>
          
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Every resource in this library is informed by established frameworks from learning sciences, 
            human-computer interaction, and responsible AI practice.
          </p>

          <div className="mt-4 flex flex-wrap justify-center gap-3">
            {frameworks.map((framework) => (
              <ResearchBadge key={framework} label={framework} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
