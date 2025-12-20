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

  // Track mouse at window level so cursor effects work regardless of z-index
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
      {/* Deep atmospheric base - wine, burgundy, oxblood, muted crimson */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 120% 100% at 50% 0%, hsl(345 45% 18% / 0.95) 0%, transparent 70%),
            radial-gradient(ellipse 90% 70% at 20% 40%, hsl(350 40% 22% / 0.85) 0%, transparent 55%),
            radial-gradient(ellipse 80% 80% at 85% 30%, hsl(340 38% 20% / 0.80) 0%, transparent 55%),
            radial-gradient(ellipse 100% 90% at 60% 90%, hsl(355 42% 16% / 0.90) 0%, transparent 60%),
            radial-gradient(ellipse 110% 80% at 30% 80%, hsl(348 40% 19% / 0.85) 0%, transparent 55%),
            linear-gradient(180deg, hsl(345 35% 14%) 0%, hsl(350 38% 18%) 50%, hsl(355 32% 12%) 100%)
          `,
          backgroundBlendMode: "normal",
          animation: "gradient-breathe 20s ease-in-out infinite"
        }}
      />

      {/* Slow morphing burgundy layer - wine depth */}
      <div 
        className={cn(
          "absolute inset-0 transition-opacity duration-1000",
          mounted ? "opacity-100" : "opacity-0"
        )}
        style={{
          background: `
            radial-gradient(ellipse 65% 55% at 50% 40%, hsl(348 42% 24% / 0.70) 0%, transparent 60%),
            radial-gradient(ellipse 55% 65% at 25% 60%, hsl(352 38% 20% / 0.60) 0%, transparent 55%)
          `,
          animation: "mesh-morph 35s ease-in-out infinite"
        }}
      />

      {/* Secondary atmospheric layer - deep crimson undertones */}
      <div 
        className={cn(
          "absolute inset-0 transition-opacity duration-1000",
          mounted ? "opacity-100" : "opacity-0"
        )}
        style={{
          background: `
            radial-gradient(ellipse 60% 50% at 75% 45%, hsl(355 40% 22% / 0.55) 0%, transparent 55%),
            radial-gradient(ellipse 50% 60% at 30% 35%, hsl(342 36% 18% / 0.50) 0%, transparent 50%)
          `,
          animation: "mesh-morph-2 40s ease-in-out infinite"
        }}
      />

      {/* Soft white bloom at edges - light entering the frame */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 80% 50% at 0% 50%, hsl(0 0% 98% / 0.12) 0%, transparent 50%),
            radial-gradient(ellipse 80% 50% at 100% 50%, hsl(0 0% 98% / 0.10) 0%, transparent 50%),
            radial-gradient(ellipse 50% 60% at 50% 0%, hsl(0 0% 95% / 0.08) 0%, transparent 40%),
            radial-gradient(ellipse 50% 40% at 50% 100%, hsl(0 0% 96% / 0.06) 0%, transparent 35%),
            radial-gradient(circle at 0% 0%, hsl(0 0% 100% / 0.08) 0%, transparent 35%),
            radial-gradient(circle at 100% 0%, hsl(0 0% 100% / 0.06) 0%, transparent 30%),
            radial-gradient(circle at 0% 100%, hsl(0 0% 100% / 0.05) 0%, transparent 30%),
            radial-gradient(circle at 100% 100%, hsl(0 0% 100% / 0.04) 0%, transparent 25%)
          `
        }}
      />

      {/* Cursor-following soft glow - subtle warmth */}
      <div 
        className={cn(
          "absolute inset-0 pointer-events-none transition-opacity duration-700",
          isHovering ? "opacity-100" : "opacity-0"
        )}
        style={{
          background: `radial-gradient(
            circle 300px at ${mousePos.x}% ${mousePos.y}%, 
            hsl(350 35% 28% / 0.35) 0%, 
            hsl(345 30% 22% / 0.20) 50%,
            transparent 70%
          )`
        }}
      />

      {/* Flowing SVG lines - organic architectural curves */}
      <svg 
        className={cn(
          "absolute inset-0 w-full h-full transition-opacity duration-1000 pointer-events-none",
          mounted ? "opacity-100" : "opacity-0"
        )}
        preserveAspectRatio="none"
        viewBox="0 0 1000 1000"
      >
        <defs>
          <linearGradient id="line-gradient-1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(0 0% 95%)" stopOpacity="0" />
            <stop offset="50%" stopColor="hsl(0 0% 95%)" stopOpacity="0.08" />
            <stop offset="100%" stopColor="hsl(0 0% 95%)" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="line-gradient-2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="hsl(0 0% 90%)" stopOpacity="0" />
            <stop offset="50%" stopColor="hsl(0 0% 90%)" stopOpacity="0.06" />
            <stop offset="100%" stopColor="hsl(0 0% 90%)" stopOpacity="0" />
          </linearGradient>
        </defs>
        
        {/* Flowing curve 1 - subtle organic movement */}
        <path
          d="M-100,600 Q200,400 400,500 T700,400 T1100,500"
          fill="none"
          stroke="url(#line-gradient-1)"
          strokeWidth="1.5"
          style={{ animation: "flow-line-1 40s ease-in-out infinite" }}
        />
        
        {/* Flowing curve 2 */}
        <path
          d="M-100,300 Q300,500 500,350 T800,450 T1100,300"
          fill="none"
          stroke="url(#line-gradient-2)"
          strokeWidth="1"
          style={{ animation: "flow-line-2 50s ease-in-out infinite" }}
        />

        {/* Subtle architectural arc */}
        <path
          d="M350,520 Q500,380 650,520"
          fill="none"
          stroke="hsl(0 0% 85%)"
          strokeWidth="0.8"
          strokeOpacity="0.10"
          style={{ animation: "arc-breathe 25s ease-in-out infinite" }}
        />
      </svg>

      {/* Enhanced grain texture overlay for depth */}
      <div 
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat"
        }}
      />
    </div>
  );
}
