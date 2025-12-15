import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PhoenixArcs } from "./PhoenixArcs";
export function HeroSection() {
  return <section className="relative overflow-hidden bg-gradient-to-b from-background via-background to-secondary/30 py-20 lg:py-32">
      <PhoenixArcs />
      
      <div className="section-container relative">
        <div className="mx-auto max-w-3xl text-center">
          {/* Eyebrow */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary opacity-0 animate-fade-in">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            A Resource for TMAHS Educators
          </div>

          {/* Main heading */}
          <h1 className="mb-6 font-serif text-4xl font-bold tracking-tight text-charcoal opacity-0 animate-fade-in sm:text-5xl lg:text-6xl" style={{
          animationDelay: "0.1s"
        }}>
            AI Tools for{" "}
            <span className="phoenix-gradient-text">Teaching Excellence</span>
          </h1>

          {/* Subheading */}
          <p className="mb-10 text-lg text-muted-foreground opacity-0 animate-fade-in sm:text-xl" style={{
          animationDelay: "0.2s"
        }}>
            A curated collection of AI resources for your classroom. Discover new tech, 
            explore on-campus use-cases, and engage in community dialogue.
          </p>

          {/* CTAs */}
          <div className="flex flex-col items-center justify-center gap-4 opacity-0 animate-fade-in sm:flex-row" style={{
          animationDelay: "0.3s"
        }}>
            <Button asChild variant="phoenix" size="lg">
              <Link to="/learning-studio">
                Start Learning
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/classroom-resources">
                Classroom Resources
              </Link>
            </Button>
          </div>

          {/* Research note */}
          <p className="mt-12 text-sm text-muted-foreground opacity-0 animate-fade-in" style={{
          animationDelay: "0.5s"
        }}>
            Grounded in learning sciences research from Chi & Wylie, Barron & Darling-Hammond, 
            and responsible AI frameworks from NIST and Stanford HAI.
          </p>
        </div>
      </div>
    </section>;
}