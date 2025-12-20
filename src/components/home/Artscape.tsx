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
      {/* Mesh gradient base - deep captivating pinks and magentas */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 100% 80% at 50% 0%, hsl(330 85% 55% / 0.85) 0%, transparent 60%),
            radial-gradient(ellipse 80% 60% at 20% 30%, hsl(345 90% 50% / 0.80) 0%, transparent 50%),
            radial-gradient(ellipse 70% 70% at 80% 25%, hsl(320 88% 58% / 0.75) 0%, transparent 50%),
            radial-gradient(ellipse 90% 80% at 70% 80%, hsl(280 75% 60% / 0.55) 0%, transparent 55%),
            radial-gradient(ellipse 100% 70% at 30% 75%, hsl(340 85% 52% / 0.65) 0%, transparent 55%),
            linear-gradient(180deg, hsl(330 70% 92%) 0%, hsl(0 0% 100%) 40%, hsl(280 40% 95%) 100%)
          `,
          backgroundBlendMode: "normal",
          animation: "gradient-breathe 12s ease-in-out infinite"
        }}
      />

      {/* Primary morphing gradient layer - deep rose and magenta */}
      <div 
        className={cn(
          "absolute inset-0 transition-opacity duration-1000",
          mounted ? "opacity-100" : "opacity-0"
        )}
        style={{
          background: `
            radial-gradient(ellipse 60% 50% at 55% 35%, hsl(340 92% 52% / 0.65) 0%, transparent 60%),
            radial-gradient(ellipse 50% 60% at 25% 55%, hsl(325 88% 55% / 0.55) 0%, transparent 55%)
          `,
          animation: "mesh-morph 25s ease-in-out infinite"
        }}
      />

      {/* Secondary morphing layer - fuchsia and deep pink */}
      <div 
        className={cn(
          "absolute inset-0 transition-opacity duration-1000",
          mounted ? "opacity-100" : "opacity-0"
        )}
        style={{
          background: `
            radial-gradient(ellipse 55% 45% at 75% 50%, hsl(315 85% 55% / 0.50) 0%, transparent 55%),
            radial-gradient(ellipse 45% 55% at 35% 40%, hsl(350 90% 48% / 0.45) 0%, transparent 50%)
          `,
          animation: "mesh-morph-2 30s ease-in-out infinite"
        }}
      />

      {/* Cursor-following dispersion effect - pure white parting */}
      <div 
        className={cn(
          "absolute inset-0 pointer-events-none transition-opacity duration-500",
          isHovering ? "opacity-100" : "opacity-0"
        )}
        style={{
          background: `radial-gradient(
            circle 280px at ${mousePos.x}% ${mousePos.y}%, 
            hsl(0 0% 100% / 0.95) 0%, 
            hsl(0 0% 98% / 0.55) 40%,
            transparent 70%
          )`
        }}
      />

      {/* Warm glow trailing cursor - pink radiance */}
      <div 
        className={cn(
          "absolute inset-0 pointer-events-none transition-opacity duration-700",
          isHovering ? "opacity-100" : "opacity-0"
        )}
        style={{
          background: `radial-gradient(
            circle 200px at ${mousePos.x}% ${mousePos.y}%, 
            hsl(340 90% 60% / 0.40) 0%, 
            hsl(320 85% 58% / 0.25) 50%,
            transparent 70%
          )`
        }}
      />

      {/* Flowing SVG lines - organic movement */}
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
            <stop offset="0%" stopColor="hsl(340 80% 55%)" stopOpacity="0" />
            <stop offset="50%" stopColor="hsl(340 80% 55%)" stopOpacity="0.15" />
            <stop offset="100%" stopColor="hsl(340 80% 55%)" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="line-gradient-2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="hsl(320 75% 58%)" stopOpacity="0" />
            <stop offset="50%" stopColor="hsl(320 75% 58%)" stopOpacity="0.12" />
            <stop offset="100%" stopColor="hsl(320 75% 58%)" stopOpacity="0" />
          </linearGradient>
        </defs>
        
        {/* Flowing curve 1 */}
        <path
          d="M-100,600 Q200,400 400,500 T700,400 T1100,500"
          fill="none"
          stroke="url(#line-gradient-1)"
          strokeWidth="2"
          style={{ animation: "flow-line-1 30s ease-in-out infinite" }}
        />
        
        {/* Flowing curve 2 */}
        <path
          d="M-100,300 Q300,500 500,350 T800,450 T1100,300"
          fill="none"
          stroke="url(#line-gradient-2)"
          strokeWidth="1.5"
          style={{ animation: "flow-line-2 35s ease-in-out infinite" }}
        />

        {/* Subtle arc - architectural element */}
        <path
          d="M350,520 Q500,380 650,520"
          fill="none"
          stroke="hsl(330 70% 55%)"
          strokeWidth="1"
          strokeOpacity="0.18"
          style={{ animation: "arc-breathe 20s ease-in-out infinite" }}
        />
      </svg>

      {/* Subtle grain texture overlay */}
      <div 
        className="absolute inset-0 opacity-[0.025] pointer-events-none mix-blend-multiply"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat"
        }}
      />
    </div>
  );
}
