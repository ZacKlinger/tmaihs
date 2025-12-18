import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { EasterEggProvider } from "@/contexts/EasterEggContext";
import Index from "./pages/Index";
import WhatIsAI from "./pages/WhatIsAI";
import WhyAIMatters from "./pages/WhyAIMatters";
import PromptEngineering from "./pages/PromptEngineering";
import LearningStudio from "./pages/LearningStudio";
import ClassroomResources from "./pages/ClassroomResources";
import Community from "./pages/Community";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import Certificate from "./pages/Certificate";
import Verify from "./pages/Verify";
import AdminCertificates from "./pages/admin/Certificates";

// Ethics pages
import EnvironmentalConsiderations from "./pages/ethics/EnvironmentalConsiderations";
import SocialImplications from "./pages/ethics/SocialImplications";
import Plagiarism from "./pages/ethics/Plagiarism";
import DataPrivacy from "./pages/ethics/DataPrivacy";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <EasterEggProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/what-is-ai" element={<WhatIsAI />} />
            <Route path="/why-ai-matters" element={<WhyAIMatters />} />
            <Route path="/prompt-engineering" element={<PromptEngineering />} />
            <Route path="/learning-studio" element={<LearningStudio />} />
            <Route path="/classroom-resources" element={<ClassroomResources />} />
            <Route path="/community" element={<Community />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/certificate" element={<Certificate />} />
            <Route path="/verify/:certificateId" element={<Verify />} />
            
            {/* Ethics & Safety Routes */}
            <Route path="/ethics-safety" element={<Navigate to="/ethics/environmental" replace />} />
            <Route path="/ethics/environmental" element={<EnvironmentalConsiderations />} />
            <Route path="/ethics/social-implications" element={<SocialImplications />} />
            <Route path="/ethics/plagiarism" element={<Plagiarism />} />
            <Route path="/ethics/data-privacy" element={<DataPrivacy />} />
            
            {/* Admin Routes */}
            <Route path="/admin/certificates" element={<AdminCertificates />} />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </EasterEggProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
