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
      {/* Base: Warm Ivory */}
      <div 
        className="absolute inset-0"
        style={{
          background: `hsl(35 33% 94%)`
        }}
      />

      {/* Subtle atmospheric layer - extremely soft gradient */}
      <div 
        className={cn(
          "absolute inset-0 transition-opacity duration-1000",
          mounted ? "opacity-100" : "opacity-0"
        )}
        style={{
          background: `
            linear-gradient(180deg, 
              transparent 0%,
              hsl(140 18% 88% / 0.3) 50%,
              hsl(345 32% 85% / 0.2) 100%
            )
          `
        }}
      />

      {/* Soft blush accent - top right */}
      <div 
        className={cn(
          "absolute inset-0 transition-opacity duration-1000",
          mounted ? "opacity-100" : "opacity-0"
        )}
        style={{
          background: `
            radial-gradient(ellipse 60% 50% at 85% 15%, hsl(345 32% 85% / 0.4) 0%, transparent 60%)
          `
        }}
      />

      {/* Pale sage accent - bottom left */}
      <div 
        className={cn(
          "absolute inset-0 transition-opacity duration-1000",
          mounted ? "opacity-100" : "opacity-0"
        )}
        style={{
          background: `
            radial-gradient(ellipse 70% 60% at 10% 90%, hsl(140 18% 88% / 0.5) 0%, transparent 55%)
          `
        }}
      />

      {/* Powder blue accent - subtle center-right */}
      <div 
        className={cn(
          "absolute inset-0 transition-opacity duration-1000",
          mounted ? "opacity-100" : "opacity-0"
        )}
        style={{
          background: `
            radial-gradient(ellipse 50% 40% at 75% 60%, hsl(208 38% 93% / 0.4) 0%, transparent 50%)
          `
        }}
      />

      {/* Very subtle grain texture for matte finish */}
      <div 
        className="absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat"
        }}
      />
    </div>
  );
}