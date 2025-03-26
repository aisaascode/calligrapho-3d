
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hero animations
    const tl = gsap.timeline();
    
    tl.from(".hero-title", {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: "power3.out"
    })
    .from(".hero-subtitle", {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: "power3.out"
    }, "-=0.6")
    .from(".hero-cta", {
      opacity: 0,
      y: 20,
      stagger: 0.2,
      duration: 0.8,
      ease: "power3.out"
    }, "-=0.4");

    // Grid animations
    if (gridRef.current) {
      const gridItems = gridRef.current.querySelectorAll('.grid-item');
      
      gsap.from(gridItems, {
        opacity: 0,
        scale: 0.8,
        duration: 0.5,
        stagger: 0.05,
        ease: "power2.out",
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top bottom-=100",
        }
      });
      
      // Add hover effect
      gridItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
          gsap.to(item, {
            backgroundColor: 'rgba(139, 92, 246, 0.1)',
            borderColor: 'rgba(139, 92, 246, 0.5)',
            duration: 0.3
          });
        });
        
        item.addEventListener('mouseleave', () => {
          gsap.to(item, {
            backgroundColor: 'transparent',
            borderColor: 'hsl(var(--border))',
            duration: 0.3
          });
        });
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="min-h-screen pt-28 pb-16 md:pb-20 px-4 md:px-6 flex flex-col justify-center"
      id="hero"
    >
      <div className="max-w-7xl mx-auto w-full">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 md:gap-12">
          <div className="lg:w-1/2 space-y-4 md:space-y-6">
            <div className="inline-block">
              <span className="px-3 py-1 text-sm rounded-full border border-primary/30 bg-primary/5 text-primary">
                Premium Calligraphy
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight hero-title">
              The Art of <span className="text-primary font-calligraphy">Beautiful</span> Writing
            </h1>
            
            <p className="text-base md:text-lg text-muted-foreground max-w-lg hero-subtitle">
              Transform your ideas into elegant calligraphy. We blend traditional techniques with modern aesthetics to create timeless pieces.
            </p>
            
            <div className="flex flex-wrap gap-3 md:gap-4">
              <Button size="lg" className="hero-cta rounded-full">
                Explore Services
              </Button>
              <Button size="lg" variant="outline" className="hero-cta rounded-full">
                View Portfolio
              </Button>
              <Link to="/auth">
                <Button size="lg" variant="secondary" className="hero-cta rounded-full">
                  Sign Up
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="lg:w-1/2 mt-8 lg:mt-0" ref={gridRef}>
            <div className="grid grid-cols-3 gap-2 md:gap-4">
              {Array.from({ length: 9 }).map((_, index) => (
                <div 
                  key={index} 
                  className="grid-item aspect-square"
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  <div className="grid-content">
                    <span className="text-white font-calligraphy text-2xl md:text-3xl font-medium">
                      {String.fromCharCode(65 + index)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
