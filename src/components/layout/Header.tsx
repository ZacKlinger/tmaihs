import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import phoenixLogo from "@/assets/phoenix-logo.png";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { UserMenu } from "@/components/layout/UserMenu";

const ethicsSubItems = [
  { label: "Environmental Considerations", href: "/ethics/environmental" },
  { label: "Social Implications", href: "/ethics/social-implications" },
  { label: "Plagiarism & Academic Integrity", href: "/ethics/plagiarism" },
  { label: "Data & Privacy", href: "/ethics/data-privacy" },
];

const studioSubItems = [
  { label: "What Is AI?", href: "/what-is-ai" },
  { label: "Why AI Matters", href: "/why-ai-matters" },
  { label: "Prompt Engineering", href: "/prompt-engineering" },
  { label: "Micro-courses", href: "/learning-studio" },
];

const navItems = [
  { label: "Classroom Resources", href: "/classroom-resources" },
  { label: "Community", href: "/community" },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEthicsOpen, setIsEthicsOpen] = useState(false);
  const [isStudioOpen, setIsStudioOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated, loading } = useAuth();

  const isEthicsActive = location.pathname.startsWith("/ethics");
  const isStudioActive = ["/what-is-ai", "/why-ai-matters", "/prompt-engineering", "/learning-studio"].includes(location.pathname);

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
            {/* Learning Studio Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className={cn(
                    "nav-link flex items-center gap-1 px-3 py-2 text-sm font-medium transition-colors",
                    isStudioActive
                      ? "text-primary"
                      : "text-muted-foreground hover:text-charcoal"
                  )}
                >
                  Learning Studio
                  <ChevronDown className="h-4 w-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56 bg-background border border-border shadow-lg z-50">
                {studioSubItems.map((item) => (
                  <DropdownMenuItem key={item.href} asChild>
                    <Link
                      to={item.href}
                      className={cn(
                        "w-full cursor-pointer",
                        location.pathname === item.href && "bg-primary/10 text-primary"
                      )}
                    >
                      {item.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

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

            {/* Ethics Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className={cn(
                    "nav-link flex items-center gap-1 px-3 py-2 text-sm font-medium transition-colors",
                    isEthicsActive
                      ? "text-primary"
                      : "text-muted-foreground hover:text-charcoal"
                  )}
                >
                  Ethics & Safety
                  <ChevronDown className="h-4 w-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64 bg-background border border-border shadow-lg z-50">
                {ethicsSubItems.map((item) => (
                  <DropdownMenuItem key={item.href} asChild>
                    <Link
                      to={item.href}
                      className={cn(
                        "w-full cursor-pointer",
                        location.pathname === item.href && "bg-primary/10 text-primary"
                      )}
                    >
                      {item.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Auth Section */}
            {!loading && (
              isAuthenticated ? (
                <UserMenu />
              ) : (
                <Button asChild variant="outline" size="sm">
                  <Link to="/auth">Sign In</Link>
                </Button>
              )
            )}
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
              {/* Learning Studio Mobile Accordion */}
              <button
                onClick={() => setIsStudioOpen(!isStudioOpen)}
                className={cn(
                  "flex items-center justify-between px-3 py-2 text-sm font-medium transition-colors rounded-lg",
                  isStudioActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-charcoal"
                )}
              >
                Learning Studio
                <ChevronDown className={cn("h-4 w-4 transition-transform", isStudioOpen && "rotate-180")} />
              </button>
              {isStudioOpen && (
                <div className="ml-4 flex flex-col gap-1">
                  {studioSubItems.map((item) => (
                    <Link
                      key={item.href}
                      to={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className={cn(
                        "px-3 py-2 text-sm transition-colors rounded-lg",
                        location.pathname === item.href
                          ? "bg-primary/10 text-primary"
                          : "text-muted-foreground hover:bg-muted hover:text-charcoal"
                      )}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}

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

              {/* Ethics Mobile Accordion */}
              <button
                onClick={() => setIsEthicsOpen(!isEthicsOpen)}
                className={cn(
                  "flex items-center justify-between px-3 py-2 text-sm font-medium transition-colors rounded-lg",
                  isEthicsActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-charcoal"
                )}
              >
                Ethics & Safety
                <ChevronDown className={cn("h-4 w-4 transition-transform", isEthicsOpen && "rotate-180")} />
              </button>
              {isEthicsOpen && (
                <div className="ml-4 flex flex-col gap-1">
                  {ethicsSubItems.map((item) => (
                    <Link
                      key={item.href}
                      to={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className={cn(
                        "px-3 py-2 text-sm transition-colors rounded-lg",
                        location.pathname === item.href
                          ? "bg-primary/10 text-primary"
                          : "text-muted-foreground hover:bg-muted hover:text-charcoal"
                      )}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
