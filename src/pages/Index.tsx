
import React, { useEffect } from "react";
import { ThemeProvider } from "@/components/ThemeProvider";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import WorksSection from "@/components/WorksSection";
import ClientsSection from "@/components/ClientsSection";
import PricingSection from "@/components/PricingSection";
import Footer from "@/components/Footer";
import ThreeBackground from "@/components/ThreeBackground";
import ScrollAnimations from "@/components/ScrollAnimations";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useIsMobile } from "@/hooks/use-mobile";

gsap.registerPlugin(ScrollTrigger);

const Index = () => {
  const isMobile = useIsMobile();
  
  useEffect(() => {
    // Initialize GSAP animations
    gsap.config({
      nullTargetWarn: false,
    });

    // Page entrance animation
    const content = document.querySelector("main");
    if (content) {
      gsap.fromTo(content.children, 
        { opacity: 0, y: 20 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1,
          stagger: 0.2,
          ease: "power2.out" 
        }
      );
    }

    return () => {
      // Clean up ScrollTriggers
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <ThemeProvider defaultTheme={isMobile ? "dark" : "light"}>
      <div className="relative min-h-screen">
        <ThreeBackground />
        <Navigation />
        <main>
          <HeroSection />
          <ServicesSection />
          <WorksSection />
          <ClientsSection />
          <PricingSection />
        </main>
        <Footer />
        <ScrollAnimations />
      </div>
    </ThemeProvider>
  );
};

export default Index;
