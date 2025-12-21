import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface ArtscapeProps {
  className?: string;
  receding?: boolean;
}

export function Artscape({ className, receding = false }: ArtscapeProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div 
      className={cn(
        "fixed inset-0 -z-10 overflow-hidden transition-opacity duration-1000",
        receding ? "opacity-30" : "opacity-100",
        className
      )}
    >
      {/* Base: Warm Ivory foundation */}
      <div 
        className="absolute inset-0"
        style={{
          background: `hsl(40 30% 96%)`
        }}
      />

      {/* Layer 1: Blush atmospheric wash - primary presence, asymmetric */}
      <div 
        className={cn(
          "absolute inset-0 transition-opacity duration-1000",
          mounted ? "opacity-100" : "opacity-0"
        )}
        style={{
          background: `
            radial-gradient(ellipse 120% 80% at 120% 20%, hsl(345 35% 88% / 0.7) 0%, transparent 50%),
            radial-gradient(ellipse 100% 90% at -20% 80%, hsl(345 30% 85% / 0.6) 0%, transparent 45%),
            radial-gradient(ellipse 80% 70% at 70% 110%, hsl(350 32% 86% / 0.5) 0%, transparent 40%)
          `
        }}
      />

      {/* Layer 2: Deeper blush fields - dimensional depth */}
      <div 
        className={cn(
          "absolute inset-0 transition-opacity duration-1000",
          mounted ? "opacity-100" : "opacity-0"
        )}
        style={{
          background: `
            radial-gradient(ellipse 60% 50% at 95% 40%, hsl(345 38% 82% / 0.45) 0%, transparent 55%),
            radial-gradient(ellipse 70% 60% at 5% 60%, hsl(348 34% 83% / 0.4) 0%, transparent 50%)
          `
        }}
      />

      {/* Layer 3: Burgundy peripheral presence - distant, diffused */}
      <div 
        className={cn(
          "absolute inset-0 transition-opacity duration-1000",
          mounted ? "opacity-100" : "opacity-0"
        )}
        style={{
          background: `
            radial-gradient(ellipse 50% 40% at 110% 0%, hsl(345 70% 28% / 0.12) 0%, transparent 60%),
            radial-gradient(ellipse 60% 50% at -15% 100%, hsl(345 65% 25% / 0.1) 0%, transparent 55%),
            radial-gradient(ellipse 40% 35% at 100% 95%, hsl(348 60% 30% / 0.08) 0%, transparent 50%)
          `
        }}
      />

      {/* Layer 4: Ivory negative core - protects content area */}
      <div 
        className={cn(
          "absolute inset-0 transition-opacity duration-1000",
          mounted ? "opacity-100" : "opacity-0"
        )}
        style={{
          background: `
            radial-gradient(ellipse 70% 60% at 50% 45%, hsl(40 30% 96% / 0.9) 0%, hsl(40 30% 96% / 0.5) 40%, transparent 70%)
          `
        }}
      />

      {/* Layer 5: Subtle warmth variation - prevents flatness */}
      <div 
        className={cn(
          "absolute inset-0 transition-opacity duration-1000",
          mounted ? "opacity-100" : "opacity-0"
        )}
        style={{
          background: `
            radial-gradient(ellipse 90% 70% at 30% 20%, hsl(35 25% 94% / 0.6) 0%, transparent 50%),
            radial-gradient(ellipse 80% 60% at 80% 70%, hsl(38 28% 93% / 0.5) 0%, transparent 45%)
          `
        }}
      />

      {/* Layer 6: Powder blue micro-field - barely perceptible edge influence */}
      <div 
        className={cn(
          "absolute inset-0 transition-opacity duration-1000",
          mounted ? "opacity-100" : "opacity-0"
        )}
        style={{
          background: `
            radial-gradient(ellipse 30% 25% at 105% 50%, hsl(210 30% 88% / 0.15) 0%, transparent 70%)
          `
        }}
      />

      {/* Grain texture - tactile, slightly imperfect finish */}
      <div 
        className="absolute inset-0 opacity-[0.025] pointer-events-none mix-blend-multiply"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat"
        }}
      />
    </div>
  );
}