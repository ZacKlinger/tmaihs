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
  const [isPressed, setIsPressed] = useState(false);

  const handleClick = () => {
    setIsPressed(true);
    // Slight delay to show the press animation before navigating
    setTimeout(() => {
      onNavigate(href);
    }, 150);
  };

  return (
    <button
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsPressed(false);
      }}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      disabled={isTransitioning}
      className={cn(
        "group relative flex flex-col items-center justify-center overflow-hidden",
        "py-3 px-6 rounded-lg transition-all duration-500 ease-out",
        "bg-stone-50/95 backdrop-blur-sm",
        "border border-stone-200/60",
        "shadow-sm",
        // Hover state - subtle lift
        isHovered && !isPressed && "shadow-md bg-stone-50",
        // Press/click state - depth transition, moving through the button
        isPressed && "scale-[1.02] shadow-lg bg-white",
        // Transition out states
        isTransitioning && isSelected && "scale-[1.08] opacity-0 shadow-xl",
        isTransitioning && !isSelected && "opacity-0 scale-95"
      )}
      style={{
        // Smooth depth transition on click
        transform: isPressed 
          ? "scale(1.02) translateZ(10px)" 
          : isTransitioning && isSelected 
            ? "scale(1.08)" 
            : undefined,
        transition: "all 0.5s cubic-bezier(0.22, 1, 0.36, 1)"
      }}
    >
      {/* Main label */}
      <span 
        className={cn(
          "font-serif text-xl sm:text-2xl text-charcoal font-bold transition-all duration-300"
        )}
      >
        {label}
      </span>
      
      {/* Microcopy - expands into view */}
      <div 
        className={cn(
          "overflow-hidden transition-all duration-400 ease-out",
          isHovered ? "max-h-6 opacity-100 mt-1.5" : "max-h-0 opacity-0 mt-0"
        )}
      >
        <span className="block text-xs text-stone-600 font-sans whitespace-nowrap">
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
    }, 500);
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
      {/* Smooth transition overlay - soft fade to content */}
      {isTransitioning && (
        <div 
          className="fixed inset-0 z-50 pointer-events-none animate-fade-in"
          style={{ 
            background: "linear-gradient(135deg, hsl(0 0% 98% / 0.98), hsl(345 8% 96% / 0.98))",
            animationDuration: "400ms"
          }}
        />
      )}
      
      <section 
        className={cn(
          "relative min-h-screen flex flex-col items-center justify-center px-4",
          "transition-all duration-600 ease-out",
          isTransitioning && "scale-[1.01] opacity-0"
        )}
      >
        {/* Main content */}
        <div className="flex flex-col items-center gap-8 max-w-2xl mx-auto text-center">
          
          {/* CTA Statement - anchors the page */}
          <h1 
            className={cn(
              "font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-charcoal leading-tight",
              "transition-all duration-700",
              showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
          >
            Let's add AI to your pedagogical toolbox
          </h1>
          
          {/* Two equal entry point cards */}
          <div 
            className={cn(
              "flex flex-col sm:flex-row items-center gap-4 transition-all duration-700 delay-100",
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
              microcopy="Earn a shareable credential"
              href="/learning-studio"
              onNavigate={handleNavigate}
              isTransitioning={isTransitioning}
              isSelected={selectedPath === "/learning-studio"}
            />
          </div>

          {/* Ghost input */}
          <div 
            className={cn(
              "w-full pt-6 transition-all duration-700 delay-200",
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
            showContent ? "opacity-40" : "opacity-0"
          )}
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs text-stone-300 font-sans">scroll to explore</span>
            <div className="w-px h-8 bg-gradient-to-b from-stone-400/40 to-transparent" />
          </div>
        </div>
      </section>
    </>
  );
}
