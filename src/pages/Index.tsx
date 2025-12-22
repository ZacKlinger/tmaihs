import { useState, useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Artscape } from "@/components/home/Artscape";
import { LandingHero } from "@/components/home/LandingHero";
import { NavigationCards } from "@/components/home/NavigationCards";
import { ResearchBanner } from "@/components/home/ResearchBanner";

const Index = () => {
  const [showHeader, setShowHeader] = useState(false);
  const [artscapeReceding, setArtscapeReceding] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      
      // Show header immediately on any scroll
      setShowHeader(scrollY > 10);
      
      // Start fading artscape at 30% scroll
      setArtscapeReceding(scrollY > viewportHeight * 0.3);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen">
      {/* Ambient background */}
      <Artscape receding={artscapeReceding} />
      
      {/* Header - hidden initially, revealed on scroll */}
      <Header hidden={!showHeader} />
      
      {/* Hero - full viewport */}
      <LandingHero />
      
      {/* Scrollable content - pulled up to peek into hero */}
      <div className="relative bg-background -mt-[100px]">
        {/* Soft transition from artscape */}
        <div 
          className="absolute -top-32 left-0 right-0 h-32 pointer-events-none"
          style={{
            background: "linear-gradient(to bottom, transparent, hsl(var(--background)))"
          }}
        />
        
        <NavigationCards />
        <ResearchBanner />
      </div>
      
      <Footer />
    </div>
  );
};

export default Index;
