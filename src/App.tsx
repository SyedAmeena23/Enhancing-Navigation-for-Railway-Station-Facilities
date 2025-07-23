import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ARNavigation from "./pages/ARNavigation";
import CrowdManagement from "./pages/CrowdManagement";
import AIKiosk from "./pages/AIKiosk";
import FindFacility from "./pages/FindFacility";
import OfflineMode from "./pages/OfflineMode";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ar-navigation" element={<ARNavigation />} />
          <Route path="/crowd-management" element={<CrowdManagement />} />
          <Route path="/ai-kiosk" element={<AIKiosk />} />
          <Route path="/find-facility" element={<FindFacility />} />
          <Route path="/offline" element={<OfflineMode />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
