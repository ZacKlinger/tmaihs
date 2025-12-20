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
      {/* Mesh gradient base - maximum vibrant watercolor-like layers */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 80% 50% at 20% 30%, hsl(345 90% 52% / 0.80) 0%, transparent 50%),
            radial-gradient(ellipse 60% 80% at 80% 20%, hsl(18 95% 50% / 0.75) 0%, transparent 45%),
            radial-gradient(ellipse 70% 60% at 70% 80%, hsl(165 80% 48% / 0.65) 0%, transparent 50%),
            radial-gradient(ellipse 90% 70% at 30% 70%, hsl(345 85% 52% / 0.65) 0%, transparent 55%),
            linear-gradient(135deg, hsl(0 0% 100%) 0%, hsl(0 0% 99%) 50%, hsl(345 10% 98%) 100%)
          `,
          backgroundBlendMode: "soft-light, soft-light, soft-light, soft-light, normal",
          animation: "gradient-breathe 12s ease-in-out infinite"
        }}
      />

      {/* Primary morphing gradient layer - maximum vibrant depth and movement */}
      <div 
        className={cn(
          "absolute inset-0 transition-opacity duration-1000",
          mounted ? "opacity-100" : "opacity-0"
        )}
        style={{
          background: `
            radial-gradient(ellipse 50% 40% at 60% 40%, hsl(345 92% 48% / 0.60) 0%, transparent 60%),
            radial-gradient(ellipse 40% 50% at 25% 60%, hsl(18 92% 48% / 0.50) 0%, transparent 55%)
          `,
          animation: "mesh-morph 25s ease-in-out infinite"
        }}
      />

      {/* Secondary morphing layer - offset timing for depth/parallax */}
      <div 
        className={cn(
          "absolute inset-0 transition-opacity duration-1000",
          mounted ? "opacity-100" : "opacity-0"
        )}
        style={{
          background: `
            radial-gradient(ellipse 45% 35% at 75% 55%, hsl(18 90% 46% / 0.45) 0%, transparent 55%),
            radial-gradient(ellipse 35% 45% at 35% 35%, hsl(345 88% 50% / 0.40) 0%, transparent 50%)
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

      {/* Warm glow trailing cursor - boosted vibrancy */}
      <div 
        className={cn(
          "absolute inset-0 pointer-events-none transition-opacity duration-700",
          isHovering ? "opacity-100" : "opacity-0"
        )}
        style={{
          background: `radial-gradient(
            circle 200px at ${mousePos.x}% ${mousePos.y}%, 
            hsl(18 90% 55% / 0.35) 0%, 
            hsl(345 85% 55% / 0.22) 50%,
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
            <stop offset="0%" stopColor="hsl(345 60% 55%)" stopOpacity="0" />
            <stop offset="50%" stopColor="hsl(345 60% 55%)" stopOpacity="0.12" />
            <stop offset="100%" stopColor="hsl(345 60% 55%)" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="line-gradient-2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="hsl(18 70% 58%)" stopOpacity="0" />
            <stop offset="50%" stopColor="hsl(18 70% 58%)" stopOpacity="0.10" />
            <stop offset="100%" stopColor="hsl(18 70% 58%)" stopOpacity="0" />
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
          stroke="hsl(345 50% 60%)"
          strokeWidth="1"
          strokeOpacity="0.15"
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
