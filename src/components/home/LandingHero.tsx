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
        "py-5 px-10 rounded-xl transition-all duration-400 ease-out",
        "bg-white border border-border",
        // Subtle, grounded shadows
        "shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.06)]",
        // Hover state - gentle lift
        isHovered && !isPressed && "shadow-[0_2px_6px_rgba(0,0,0,0.06),0_8px_20px_rgba(0,0,0,0.08)] -translate-y-0.5",
        // Press state
        isPressed && "shadow-[0_1px_2px_rgba(0,0,0,0.08)] translate-y-0",
        // Transition out states
        isTransitioning && isSelected && "scale-[1.02] opacity-0",
        isTransitioning && !isSelected && "opacity-0 scale-95"
      )}
      style={{
        transition: "all 0.35s cubic-bezier(0.22, 1, 0.36, 1)"
      }}>

      {/* Main label */}
      <span
        className={cn(
          "font-serif text-xl sm:text-2xl text-charcoal font-normal transition-all duration-300"
        )}>

        {label}
      </span>
      
      {/* Microcopy - expands into view */}
      <div
        className={cn(
          "overflow-hidden transition-all duration-400 ease-out",
          isHovered ? "max-h-6 opacity-100 mt-2" : "max-h-0 opacity-0 mt-0"
        )}>

        <span className="block text-xs text-muted-foreground font-sans whitespace-nowrap">
          {microcopy}
        </span>
      </div>
    </button>);

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
      {/* Smooth transition overlay */}
      {isTransitioning &&
      <div
        className="fixed inset-0 z-50 pointer-events-none animate-fade-in bg-background"
        style={{
          animationDuration: "400ms"
        }} />

      }
      
      <section
        className={cn(
          "relative min-h-screen flex flex-col items-center justify-center px-4",
          "transition-all duration-600 ease-out",
          isTransitioning && "scale-[1.01] opacity-0"
        )}>

        {/* Main content */}
        <div className="flex flex-col items-center gap-8 max-w-3xl mx-auto text-center">
          
          {/* CTA Statement - charcoal text for editorial feel */}
          <h1
            className={cn(
              "font-serif text-2xl sm:text-3xl md:text-4xl font-semibold text-charcoal leading-tight",
              "transition-all duration-700",
              showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}>
              AI is changing what's possible in your classroom
              <br className="block mt-3" />
              <span className="block mt-3">This library helps you decide what's worth your time</span>
          </h1>
          
          {/* Two entry point cards */}
          <div className={cn(
            "flex flex-col sm:flex-row items-center gap-4 transition-all duration-700 delay-100",
            showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          )}>

            <EntryPoint
              label="Explore Use-Cases"
              microcopy="Browse ideas, tools, and examples"
              href="/classroom-resources"
              onNavigate={handleNavigate}
              isTransitioning={isTransitioning}
              isSelected={selectedPath === "/classroom-resources"} />

            
            <EntryPoint
              label="Get Certified"
              microcopy="Earn a shareable credential"
              href="/learning-studio"
              onNavigate={handleNavigate}
              isTransitioning={isTransitioning}
              isSelected={selectedPath === "/learning-studio"} />

          </div>

          {/* Ghost input */}
          <div
            className={cn(
              "w-full pt-6 transition-all duration-700 delay-200",
              showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}>

            <GhostInput onSubmit={handleSearch} isLoading={isSearching} />
          </div>
        </div>

        {/* Scroll indicator removed - using ScrollPeek component instead */}
      </section>
    </>);

}