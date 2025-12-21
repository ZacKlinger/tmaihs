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
          background: `hsl(38 35% 95%)`
        }}
      />

      {/* Layer 1: Bold blush atmospheric field - dominant presence, asymmetric */}
      <div 
        className={cn(
          "absolute inset-0 transition-opacity duration-1000",
          mounted ? "opacity-100" : "opacity-0"
        )}
        style={{
          background: `
            radial-gradient(ellipse 130% 100% at 115% 10%, hsl(348 45% 78% / 0.85) 0%, hsl(350 40% 82% / 0.5) 35%, transparent 60%),
            radial-gradient(ellipse 110% 100% at -25% 85%, hsl(345 42% 80% / 0.8) 0%, hsl(348 38% 83% / 0.4) 40%, transparent 55%)
          `
        }}
      />

      {/* Layer 2: Deep burgundy anchors - grounding force at corners */}
      <div 
        className={cn(
          "absolute inset-0 transition-opacity duration-1000",
          mounted ? "opacity-100" : "opacity-0"
        )}
        style={{
          background: `
            radial-gradient(ellipse 70% 60% at 105% -5%, hsl(345 75% 22% / 0.35) 0%, hsl(345 70% 28% / 0.15) 40%, transparent 65%),
            radial-gradient(ellipse 80% 70% at -10% 105%, hsl(348 72% 20% / 0.3) 0%, hsl(345 65% 25% / 0.12) 45%, transparent 60%),
            radial-gradient(ellipse 50% 45% at 100% 100%, hsl(345 68% 24% / 0.25) 0%, transparent 55%)
          `
        }}
      />

      {/* Layer 3: Secondary blush depth - adds dimensionality */}
      <div 
        className={cn(
          "absolute inset-0 transition-opacity duration-1000",
          mounted ? "opacity-100" : "opacity-0"
        )}
        style={{
          background: `
            radial-gradient(ellipse 80% 65% at 90% 35%, hsl(350 48% 75% / 0.55) 0%, transparent 50%),
            radial-gradient(ellipse 70% 55% at 10% 50%, hsl(345 44% 77% / 0.45) 0%, transparent 45%)
          `
        }}
      />

      {/* Layer 4: Ivory content pocket - protected reading zone */}
      <div 
        className={cn(
          "absolute inset-0 transition-opacity duration-1000",
          mounted ? "opacity-100" : "opacity-0"
        )}
        style={{
          background: `
            radial-gradient(ellipse 65% 55% at 50% 42%, hsl(38 35% 95% / 0.95) 0%, hsl(38 32% 94% / 0.7) 45%, transparent 75%)
          `
        }}
      />

      {/* Layer 5: Powder blue whisper - barely there edge influence */}
      <div 
        className={cn(
          "absolute inset-0 transition-opacity duration-1000",
          mounted ? "opacity-100" : "opacity-0"
        )}
        style={{
          background: `
            radial-gradient(ellipse 25% 30% at 102% 55%, hsl(210 35% 82% / 0.2) 0%, transparent 70%)
          `
        }}
      />

      {/* Layer 6: Warmth breathing - prevents clinical flatness */}
      <div 
        className={cn(
          "absolute inset-0 transition-opacity duration-1000",
          mounted ? "opacity-100" : "opacity-0"
        )}
        style={{
          background: `
            radial-gradient(ellipse 100% 80% at 40% 15%, hsl(35 30% 92% / 0.5) 0%, transparent 45%)
          `
        }}
      />

      {/* Grain texture - tactile, dimensional finish */}
      <div 
        className="absolute inset-0 opacity-[0.035] pointer-events-none mix-blend-multiply"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat"
        }}
      />
    </div>
  );
}