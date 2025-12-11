import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { NavigationCards } from "@/components/home/NavigationCards";
import { ResearchBanner } from "@/components/home/ResearchBanner";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <NavigationCards />
      <ResearchBanner />
    </Layout>
  );
};

export default Index;
