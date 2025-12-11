import { Link } from "react-router-dom";
import phoenixLogo from "@/assets/phoenix-logo.png";

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-card/50">
      <div className="section-container py-12">
        <div className="flex flex-col items-center gap-6 text-center">
          <img 
            src={phoenixLogo} 
            alt="TMAHS Phoenix" 
            className="h-12 w-auto opacity-60"
          />
          <div>
            <p className="font-serif text-lg font-medium text-charcoal">
              Thurgood Marshall Academic High School
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              AI Resource Library for Educators
            </p>
          </div>
          <nav className="flex flex-wrap justify-center gap-4 text-sm">
            <Link to="/what-is-ai" className="text-muted-foreground hover:text-primary transition-colors">
              What Is AI?
            </Link>
            <Link to="/why-ai-matters" className="text-muted-foreground hover:text-primary transition-colors">
              Why AI Matters
            </Link>
            <Link to="/prompt-engineering" className="text-muted-foreground hover:text-primary transition-colors">
              Prompt Engineering
            </Link>
            <Link to="/classroom-resources" className="text-muted-foreground hover:text-primary transition-colors">
              Classroom Resources
            </Link>
            <Link to="/ethics-safety" className="text-muted-foreground hover:text-primary transition-colors">
              Ethics & Safety
            </Link>
          </nav>
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} TMAHS. Resources for educational use.
          </p>
        </div>
      </div>
    </footer>
  );
}
