import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import WhatIsAI from "./pages/WhatIsAI";
import WhyAIMatters from "./pages/WhyAIMatters";
import PromptEngineering from "./pages/PromptEngineering";
import ClassroomResources from "./pages/ClassroomResources";
import EthicsSafety from "./pages/EthicsSafety";
import Community from "./pages/Community";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/what-is-ai" element={<WhatIsAI />} />
          <Route path="/why-ai-matters" element={<WhyAIMatters />} />
          <Route path="/prompt-engineering" element={<PromptEngineering />} />
          <Route path="/classroom-resources" element={<ClassroomResources />} />
          <Route path="/ethics-safety" element={<EthicsSafety />} />
          <Route path="/community" element={<Community />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
