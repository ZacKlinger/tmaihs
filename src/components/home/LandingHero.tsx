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
        "group relative flex flex-col items-center justify-center overflow-hidden",
        "py-5 px-8 rounded-2xl transition-all duration-400 ease-out",
        "bg-white/90 backdrop-blur-md",
        "border border-border/30",
        "shadow-[0_8px_40px_-12px_hsl(345_30%_20%/0.1)]",
        "hover:shadow-[0_12px_50px_-12px_hsl(345_30%_20%/0.15)]",
        "hover:bg-white/95",
        isTransitioning && isSelected && "scale-105 bg-white",
        isTransitioning && !isSelected && "opacity-0 scale-95"
      )}
    >
      {/* Main label - symmetric centering with spacers */}
      <div className="flex items-center justify-center">
        {/* Left spacer - matches arrow width for symmetry */}
        <span 
          className={cn(
            "w-5 h-5 shrink-0 transition-all duration-300",
            isHovered ? "opacity-0" : "opacity-0"
          )} 
          aria-hidden="true" 
        />
        
        <span 
          className={cn(
            "font-serif text-2xl sm:text-3xl text-charcoal transition-all duration-300 mx-3"
          )}
        >
          {label}
        </span>
        
        {/* Animated arrow on hover */}
        <ArrowRight 
          className={cn(
            "w-5 h-5 shrink-0 text-primary/60 transition-all duration-300",
            isHovered ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"
          )}
        />
      </div>
      
      {/* Microcopy - expands into view */}
      <div 
        className={cn(
          "overflow-hidden transition-all duration-400 ease-out",
          isHovered ? "max-h-8 opacity-100 mt-2" : "max-h-0 opacity-0 mt-0"
        )}
      >
        <span className="block text-sm text-muted-foreground font-sans whitespace-nowrap">
          {microcopy}
        </span>
      </div>
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
    }, 450);
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
    <>
      {/* Smooth transition overlay - pure white */}
      {isTransitioning && (
        <div 
          className="fixed inset-0 z-50 pointer-events-none animate-fade-in"
          style={{ 
            background: "linear-gradient(135deg, hsl(0 0% 100% / 0.97), hsl(345 10% 98% / 0.97))",
            animationDuration: "350ms"
          }}
        />
      )}
      
      <section 
        className={cn(
          "relative min-h-screen flex flex-col items-center justify-center px-4",
          "transition-all duration-500 ease-out",
          isTransitioning && "scale-[1.01] opacity-0"
        )}
      >
      {/* Main content */}
      <div className="flex flex-col items-center gap-12 max-w-2xl mx-auto text-center">
        
        {/* Two separate entry point cards */}
        <div 
          className={cn(
            "flex flex-col sm:flex-row items-center gap-4 sm:gap-6 transition-all duration-700",
            showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
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
    </>
  );
}
