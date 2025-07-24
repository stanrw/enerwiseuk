import { useEffect } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import HeroSection from "@/components/hero-section";

export default function Home() {
  useEffect(() => {
    // Always reset scroll to top
    window.scrollTo(0, 0);
    
    // Clear any URL hash to prevent browser auto-scrolling
    if (window.location.hash) {
      window.history.replaceState(null, "", window.location.pathname);
    }
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroSection />
      


      <Footer />
    </div>
  );
}