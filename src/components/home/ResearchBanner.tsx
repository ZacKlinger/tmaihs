import { BookOpen } from "lucide-react";

export function ResearchBanner() {
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
            {[
              "ICAP Framework",
              "Cognitive Load Theory", 
              "Culturally Sustaining Pedagogy",
              "NIST AI RMF",
              "Stanford HAI Guidelines",
            ].map((tag) => (
              <span 
                key={tag}
                className="rounded-full border border-primary/20 bg-background px-4 py-1.5 text-sm text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
