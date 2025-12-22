import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { 
  Brain, 
  Lightbulb, 
  MessageSquareText, 
  GraduationCap
} from "lucide-react";

const peekCards = [
  { title: "What Is AI?", icon: Brain },
  { title: "Why AI Matters", icon: Lightbulb },
  { title: "Prompt Engineering", icon: MessageSquareText },
  { title: "Micro-courses", icon: GraduationCap, featured: true },
];

export function ScrollPeek() {
  const [isVisible, setIsVisible] = useState(true);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const fadeStart = 50;
      const fadeEnd = 200;
      
      if (scrollY < fadeStart) {
        setOpacity(1);
        setIsVisible(true);
      } else if (scrollY >= fadeEnd) {
        setOpacity(0);
        setIsVisible(false);
      } else {
        const progress = (scrollY - fadeStart) / (fadeEnd - fadeStart);
        setOpacity(1 - progress);
        setIsVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible && opacity === 0) return null;

  return (
    <div 
      className="fixed bottom-0 left-0 right-0 z-10 pointer-events-none"
      style={{ opacity }}
    >
      {/* Soft gradient mask from transparent to slightly visible */}
      <div 
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to bottom, transparent 0%, hsl(var(--background) / 0.3) 40%, hsl(var(--background) / 0.6) 100%)"
        }}
      />
      
      {/* Scroll prompt */}
      <div className="relative flex flex-col items-center pb-4">
        <p 
          className={cn(
            "text-xs font-sans text-charcoal/50 mb-4",
            "animate-fade-in"
          )}
          style={{ 
            animationDelay: "1.2s",
            animationFillMode: "backwards"
          }}
        >
          scroll to explore the library
        </p>
        
        {/* Peeking cards - showing only top 10% */}
        <div className="w-full max-w-4xl mx-auto px-4">
          <div 
            className="grid grid-cols-4 gap-3"
            style={{
              transform: "translateY(85%)",
              maskImage: "linear-gradient(to bottom, black 0%, black 20%, transparent 60%)",
              WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 20%, transparent 60%)"
            }}
          >
            {peekCards.map((card, index) => (
              <div
                key={card.title}
                className={cn(
                  "rounded-2xl p-4 transition-all",
                  "bg-gradient-to-br from-primary/10 to-primary/5",
                  "border border-border/50",
                  card.featured && "from-accent/10 to-accent/5"
                )}
                style={{
                  animationDelay: `${1.4 + index * 0.1}s`,
                  animationFillMode: "backwards"
                }}
              >
                <div className={cn(
                  "inline-flex h-10 w-10 items-center justify-center rounded-xl bg-background shadow-soft"
                )}>
                  <card.icon className={cn(
                    "h-5 w-5",
                    card.featured ? "text-accent" : "text-primary"
                  )} />
                </div>
                <h3 className="mt-3 font-serif text-sm font-semibold text-charcoal">
                  {card.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}