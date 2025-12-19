import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { GhostInput } from "./GhostInput";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { ArrowRight } from "lucide-react";

interface EntryPointProps {
  label: string;
  microcopy: string;
  href: string;
  onNavigate: (href: string) => void;
  isTransitioning: boolean;
  isSelected: boolean;
}

function EntryPoint({ 
  label, 
  microcopy, 
  href, 
  onNavigate, 
  isTransitioning,
  isSelected 
}: EntryPointProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onClick={() => onNavigate(href)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      disabled={isTransitioning}
      className={cn(
        "group relative py-4 px-6 transition-all duration-500 ease-out rounded-2xl",
        "hover:bg-primary/[0.04]",
        isTransitioning && isSelected && "scale-105 bg-primary/[0.06]",
        isTransitioning && !isSelected && "opacity-0 scale-95"
      )}
    >
      <div className="flex items-center gap-3">
        <span 
          className={cn(
            "font-serif text-2xl sm:text-3xl text-charcoal transition-all duration-300"
          )}
        >
          {label}
        </span>
        
        {/* Animated arrow on hover */}
        <ArrowRight 
          className={cn(
            "w-5 h-5 text-primary/60 transition-all duration-300",
            isHovered ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"
          )}
        />
      </div>
      
      {/* Microcopy - appears on hover */}
      <span 
        className={cn(
          "block text-sm text-muted-foreground mt-1.5 transition-all duration-300 font-sans",
          isHovered ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1"
        )}
      >
        {microcopy}
      </span>
    </button>
  );
}

export function LandingHero() {
  const navigate = useNavigate();
  const [showContent, setShowContent] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [selectedPath, setSelectedPath] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 400);
    return () => clearTimeout(timer);
  }, []);

  const handleNavigate = useCallback((href: string) => {
    setSelectedPath(href);
    setIsTransitioning(true);
    
    setTimeout(() => {
      navigate(href);
    }, 600);
  }, [navigate]);

  const handleSearch = useCallback(async (query: string) => {
    setIsSearching(true);
    
    try {
      const { data, error } = await supabase.functions.invoke("search-assistant", {
        body: { query }
      });

      if (error) throw error;

      if (data.type === "route" && data.destination) {
        handleNavigate(data.destination);
      } else if (data.type === "suggestions" && data.suggestions?.length > 0) {
        handleNavigate(data.suggestions[0].path);
      } else if (data.type === "answer") {
        toast.info(data.answer || "I'm not sure how to help with that. Try exploring the studio or getting certified!");
      } else {
        toast.info("Try exploring the studio or browse classroom resources!");
      }
    } catch (error) {
      console.error("Search error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSearching(false);
    }
  }, [handleNavigate]);

  return (
    <section 
      className={cn(
        "relative min-h-screen flex flex-col items-center justify-center px-4",
        "transition-all duration-600",
        isTransitioning && "scale-[1.02] opacity-0"
      )}
    >
      {/* Main content */}
      <div className="flex flex-col items-center gap-12 max-w-2xl mx-auto text-center">
        
        {/* Floating portal container for entry points */}
        <div 
          className={cn(
            "relative p-2 rounded-3xl transition-all duration-700",
            "bg-background/60 backdrop-blur-sm",
            "border border-border/30",
            "shadow-[0_8px_40px_-12px_hsl(345_30%_20%/0.1)]",
            showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          )}
        >
          {/* Decorative arc above */}
          <div 
            className="absolute -top-6 left-1/2 -translate-x-1/2 w-24 h-12 border-t-2 border-l-2 border-r-2 border-primary/10 rounded-t-full"
            aria-hidden="true"
          />
          
          {/* Entry points inside the portal */}
          <div className="flex flex-col sm:flex-row items-stretch">
            <EntryPoint
              label="Explore the Studio"
              microcopy="Browse ideas, tools, and examples"
              href="/classroom-resources"
              onNavigate={handleNavigate}
              isTransitioning={isTransitioning}
              isSelected={selectedPath === "/classroom-resources"}
            />

            {/* Vertical divider */}
            <div className="hidden sm:flex items-center px-1">
              <div className="w-px h-16 bg-border/40" />
            </div>
            
            {/* Horizontal divider for mobile */}
            <div className="sm:hidden w-3/4 mx-auto h-px bg-border/40" />
            
            <EntryPoint
              label="Get Certified"
              microcopy="Earn a shareable certificate"
              href="/learning-studio"
              onNavigate={handleNavigate}
              isTransitioning={isTransitioning}
              isSelected={selectedPath === "/learning-studio"}
            />
          </div>
        </div>

        {/* Ghost input */}
        <div 
          className={cn(
            "w-full pt-4 transition-all duration-700 delay-200",
            showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}
        >
          <GhostInput onSubmit={handleSearch} isLoading={isSearching} />
        </div>
      </div>

      {/* Scroll indicator */}
      <div 
        className={cn(
          "absolute bottom-8 left-1/2 -translate-x-1/2",
          "transition-opacity duration-1000 delay-700",
          showContent ? "opacity-30" : "opacity-0"
        )}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs text-muted-foreground font-sans">scroll to explore</span>
          <div className="w-px h-8 bg-gradient-to-b from-border to-transparent" />
        </div>
      </div>
    </section>
  );
}
