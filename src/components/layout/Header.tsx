import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import phoenixLogo from "@/assets/phoenix-logo.png";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "What Is AI?", href: "/what-is-ai" },
  { label: "Why AI Matters", href: "/why-ai-matters" },
  { label: "Prompt Engineering", href: "/prompt-engineering" },
  { label: "Classroom Resources", href: "/classroom-resources" },
  { label: "Ethics & Safety", href: "/ethics-safety" },
  { label: "Community", href: "/community" },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="section-container">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-3 transition-opacity hover:opacity-80"
          >
            <img 
              src={phoenixLogo} 
              alt="TMAHS Phoenix" 
              className="h-10 w-auto"
            />
            <div className="hidden sm:block">
              <span className="font-serif text-lg font-semibold text-charcoal">
                AI Resource Library
              </span>
              <span className="block text-xs text-muted-foreground">
                For TMAHS Educators
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex lg:items-center lg:gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "nav-link px-3 py-2 text-sm font-medium transition-colors",
                  location.pathname === item.href
                    ? "text-primary"
                    : "text-muted-foreground hover:text-charcoal"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="border-t border-border/50 py-4 lg:hidden">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={cn(
                    "px-3 py-2 text-sm font-medium transition-colors rounded-lg",
                    location.pathname === item.href
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-charcoal"
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
