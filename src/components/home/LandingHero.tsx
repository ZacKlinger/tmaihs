import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { GhostInput } from "./GhostInput";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

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
        "group relative text-center transition-all duration-700 ease-out",
        isTransitioning && isSelected && "scale-105",
        isTransitioning && !isSelected && "opacity-0 scale-95",
        !isTransitioning && "hover:scale-[1.02]"
      )}
    >
      <span 
        className={cn(
          "font-serif text-2xl sm:text-3xl text-charcoal transition-all duration-300",
          "relative inline-block"
        )}
      >
        {label}
        {/* Subtle underline on hover */}
        <span 
          className={cn(
            "absolute -bottom-1 left-0 h-[2px] bg-primary/40 transition-all duration-300",
            isHovered ? "w-full" : "w-0"
          )} 
        />
      </span>
      
      {/* Microcopy - appears on hover */}
      <span 
        className={cn(
          "block text-sm text-muted-foreground mt-2 transition-all duration-300 font-sans",
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
  const [showFraming, setShowFraming] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [selectedPath, setSelectedPath] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  // Fade in the framing text after mount
  useEffect(() => {
    const timer = setTimeout(() => setShowFraming(true), 600);
    return () => clearTimeout(timer);
  }, []);

  const handleNavigate = useCallback((href: string) => {
    setSelectedPath(href);
    setIsTransitioning(true);
    
    // Smooth transition before navigation
    setTimeout(() => {
      navigate(href);
    }, 700);
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
        // Navigate to first suggestion
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
        "transition-all duration-700",
        isTransitioning && "scale-105 opacity-0"
      )}
    >
      {/* Main content - centered */}
      <div className="flex flex-col items-center gap-16 max-w-2xl mx-auto text-center">
        
        {/* Framing line */}
        <h1 
          className={cn(
            "font-serif text-lg sm:text-xl text-muted-foreground font-normal tracking-wide",
            "transition-all duration-1000 ease-out",
            showFraming ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}
        >
          How would you like to begin?
        </h1>

        {/* Bimodal entry points */}
        <div 
          className={cn(
            "flex flex-col sm:flex-row items-center gap-8 sm:gap-16",
            "transition-all duration-700 delay-200",
            showFraming ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}
        >
          <EntryPoint
            label="Explore the Studio"
            microcopy="Browse ideas, tools, and examples"
            href="/classroom-resources"
            onNavigate={handleNavigate}
            isTransitioning={isTransitioning}
            isSelected={selectedPath === "/classroom-resources"}
          />

          {/* Visual separator - subtle */}
          <div className="hidden sm:block w-px h-12 bg-border/50" />
          
          <EntryPoint
            label="Get Certified"
            microcopy="Earn a shareable certificate"
            href="/learning-studio"
            onNavigate={handleNavigate}
            isTransitioning={isTransitioning}
            isSelected={selectedPath === "/learning-studio"}
          />
        </div>

        {/* Ghost input */}
        <div 
          className={cn(
            "w-full pt-8 transition-all duration-700 delay-400",
            showFraming ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}
        >
          <GhostInput onSubmit={handleSearch} isLoading={isSearching} />
        </div>
      </div>

      {/* Scroll indicator - subtle */}
      <div 
        className={cn(
          "absolute bottom-8 left-1/2 -translate-x-1/2",
          "transition-opacity duration-1000 delay-1000",
          showFraming ? "opacity-40" : "opacity-0"
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
