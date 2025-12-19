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
      {/* Base gradient - warm cream to soft secondary */}
      <div 
        className="absolute inset-0"
        style={{
          background: `linear-gradient(
            135deg, 
            hsl(var(--phoenix-cream)) 0%, 
            hsl(var(--background)) 40%,
            hsl(var(--secondary) / 0.5) 100%
          )`
        }}
      />

      {/* Drifting orb 1 - large, slow */}
      <div 
        className={cn(
          "absolute w-[600px] h-[600px] rounded-full blur-3xl transition-opacity duration-1000",
          mounted ? "opacity-20" : "opacity-0"
        )}
        style={{
          background: `radial-gradient(circle, hsl(var(--primary) / 0.4) 0%, transparent 70%)`,
          top: "10%",
          left: "20%",
          animation: "drift-1 25s ease-in-out infinite"
        }}
      />

      {/* Drifting orb 2 - medium, different rhythm */}
      <div 
        className={cn(
          "absolute w-[400px] h-[400px] rounded-full blur-3xl transition-opacity duration-1000 delay-300",
          mounted ? "opacity-15" : "opacity-0"
        )}
        style={{
          background: `radial-gradient(circle, hsl(var(--accent) / 0.3) 0%, transparent 70%)`,
          bottom: "20%",
          right: "15%",
          animation: "drift-2 30s ease-in-out infinite"
        }}
      />

      {/* Drifting orb 3 - small accent */}
      <div 
        className={cn(
          "absolute w-[300px] h-[300px] rounded-full blur-3xl transition-opacity duration-1000 delay-500",
          mounted ? "opacity-10" : "opacity-0"
        )}
        style={{
          background: `radial-gradient(circle, hsl(var(--phoenix-ember) / 0.25) 0%, transparent 70%)`,
          top: "50%",
          left: "60%",
          animation: "drift-3 20s ease-in-out infinite"
        }}
      />

      {/* Subtle grain texture overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat"
        }}
      />
    </div>
  );
}
