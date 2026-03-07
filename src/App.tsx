import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import BackToTop from "./components/BackToTop";
import Index from "./pages/Index";
import Poems from "./pages/Poems";
import PoemDetail from "./pages/PoemDetail";
import DespreAutoare from "./pages/DespreAutoare";
import AdminPoems from "./pages/AdminPoems";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();
const helmetContext = {};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <HelmetProvider context={helmetContext}>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/poezii" element={<Poems />} />
            <Route path="/poezii/:id" element={<PoemDetail />} />
            <Route path="/despre-mine" element={<DespreAutoare />} />
            <Route path="/admin" element={<AdminPoems />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
          <BackToTop />
        </BrowserRouter>
      </HelmetProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
