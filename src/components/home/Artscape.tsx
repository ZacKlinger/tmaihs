import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface ArtscapeProps {
  className?: string;
  receding?: boolean;
}

export function Artscape({ className, receding = false }: ArtscapeProps) {
  const [mounted, setMounted] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      setMousePos({ x, y });
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div 
      className={cn(
        "fixed inset-0 -z-10 overflow-hidden transition-opacity duration-1000",
        receding ? "opacity-30" : "opacity-100",
        className
      )}
    >
      {/* Base gradient - white top → pink middle → deep red bottom */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(180deg, 
              hsl(0 0% 100%) 0%, 
              hsl(0 0% 99%) 15%,
              hsl(330 85% 92%) 30%,
              hsl(335 90% 75%) 50%,
              hsl(340 95% 65%) 65%,
              hsl(350 90% 58%) 80%,
              hsl(355 85% 50%) 100%
            )
          `
        }}
      />

      {/* Radiant pink glow from center - like Lovable's atmospheric bloom */}
      <div 
        className={cn(
          "absolute inset-0 transition-opacity duration-1000",
          mounted ? "opacity-100" : "opacity-0"
        )}
        style={{
          background: `
            radial-gradient(ellipse 120% 80% at 50% 45%, hsl(335 95% 70% / 0.8) 0%, transparent 55%),
            radial-gradient(ellipse 100% 70% at 30% 55%, hsl(345 90% 65% / 0.6) 0%, transparent 50%),
            radial-gradient(ellipse 90% 60% at 70% 50%, hsl(330 92% 72% / 0.5) 0%, transparent 45%)
          `,
          animation: "gradient-breathe 12s ease-in-out infinite"
        }}
      />

      {/* Deep red glow from bottom */}
      <div 
        className={cn(
          "absolute inset-0 transition-opacity duration-1000",
          mounted ? "opacity-100" : "opacity-0"
        )}
        style={{
          background: `
            radial-gradient(ellipse 140% 60% at 50% 100%, hsl(355 88% 52% / 0.9) 0%, transparent 50%),
            radial-gradient(ellipse 100% 50% at 20% 95%, hsl(360 85% 48% / 0.7) 0%, transparent 45%),
            radial-gradient(ellipse 100% 50% at 80% 95%, hsl(350 90% 50% / 0.6) 0%, transparent 45%)
          `
        }}
      />

      {/* White bloom from top - light entering */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 100% 50% at 50% 0%, hsl(0 0% 100% / 0.95) 0%, transparent 50%),
            radial-gradient(ellipse 80% 40% at 30% 5%, hsl(0 0% 100% / 0.7) 0%, transparent 40%),
            radial-gradient(ellipse 80% 40% at 70% 5%, hsl(0 0% 100% / 0.7) 0%, transparent 40%)
          `
        }}
      />

      {/* Morphing color layer - adds movement */}
      <div 
        className={cn(
          "absolute inset-0 transition-opacity duration-1000",
          mounted ? "opacity-100" : "opacity-0"
        )}
        style={{
          background: `
            radial-gradient(ellipse 70% 50% at 55% 40%, hsl(338 92% 68% / 0.5) 0%, transparent 55%),
            radial-gradient(ellipse 60% 60% at 35% 60%, hsl(348 88% 60% / 0.4) 0%, transparent 50%)
          `,
          animation: "mesh-morph 20s ease-in-out infinite"
        }}
      />

      {/* Secondary morphing layer */}
      <div 
        className={cn(
          "absolute inset-0 transition-opacity duration-1000",
          mounted ? "opacity-100" : "opacity-0"
        )}
        style={{
          background: `
            radial-gradient(ellipse 55% 45% at 65% 55%, hsl(342 90% 62% / 0.4) 0%, transparent 50%),
            radial-gradient(ellipse 50% 55% at 40% 45%, hsl(332 88% 70% / 0.35) 0%, transparent 45%)
          `,
          animation: "mesh-morph-2 25s ease-in-out infinite"
        }}
      />

      {/* Cursor-following warm glow */}
      <div 
        className={cn(
          "absolute inset-0 pointer-events-none transition-opacity duration-500",
          isHovering ? "opacity-100" : "opacity-0"
        )}
        style={{
          background: `radial-gradient(
            circle 350px at ${mousePos.x}% ${mousePos.y}%, 
            hsl(340 90% 75% / 0.4) 0%, 
            hsl(345 85% 65% / 0.2) 50%,
            transparent 70%
          )`
        }}
      />

      {/* Subtle grain texture */}
      <div 
        className="absolute inset-0 opacity-[0.02] pointer-events-none mix-blend-multiply"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat"
        }}
      />
    </div>
  );
}
