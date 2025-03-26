
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
    // Hero entrance animations
    const tl = gsap.timeline();
    
    tl.from(".hero-title", {
      opacity: 0,
      y: 50,
      duration: 1.2,
      ease: "power3.out"
    })
    .from(".hero-subtitle", {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: "power3.out"
    }, "-=0.8")
    .from(".hero-cta", {
      opacity: 0,
      y: 20,
      stagger: 0.2,
      duration: 0.8,
      ease: "power3.out"
    }, "-=0.6");

    // Animated grid entrance
    if (gridRef.current) {
      const gridItems = gridRef.current.querySelectorAll('.grid-item');
      
      gsap.from(gridItems, {
        opacity: 0,
        scale: 0.5,
        rotate: -15,
        duration: 0.8,
        stagger: {
          amount: 1,
          grid: [3, 3],
          from: "center"
        },
        ease: "elastic.out(1, 0.5)",
      });
      
      // Add hover animations
      gridItems.forEach(item => {
        const content = item.querySelector('.grid-content');
        
        item.addEventListener('mouseenter', () => {
          gsap.to(item, {
            backgroundColor: 'rgba(139, 92, 246, 0.2)',
            borderColor: 'rgba(139, 92, 246, 0.8)',
            scale: 1.1,
            duration: 0.4,
            ease: "power2.out"
          });
          
          gsap.to(content, {
            scale: 1.2,
            rotate: gsap.utils.random(-5, 5),
            duration: 0.4,
            ease: "power2.out"
          });
        });
        
        item.addEventListener('mouseleave', () => {
          gsap.to(item, {
            backgroundColor: 'transparent',
            borderColor: 'hsl(var(--border))',
            scale: 1,
            duration: 0.4,
            ease: "power2.out"
          });
          
          gsap.to(content, {
            scale: 1,
            rotate: 0,
            duration: 0.4,
            ease: "power2.out"
          });
        });
      });
    }

    // Add parallax effect to title
    if (sectionRef.current) {
      gsap.to(".hero-title", {
        y: -50,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="min-h-screen pt-28 pb-16 md:pb-20 px-4 md:px-6 flex flex-col justify-center parallax-section"
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
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight hero-title stagger-text">
              The Art of <span className="text-primary font-calligraphy">Beautiful</span> Writing
            </h1>
            
            <p className="text-base md:text-lg text-muted-foreground max-w-lg hero-subtitle">
              Transform your ideas into elegant calligraphy. We blend traditional techniques with modern aesthetics to create timeless pieces.
            </p>
            
            <div className="flex flex-wrap gap-3 md:gap-4">
              <Button size="lg" className="hero-cta rounded-full animate-pulse-slow">
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
                  className="grid-item aspect-square relative overflow-hidden rounded-md border border-border/50 transition-all duration-300"
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  <div className="grid-content absolute inset-0 flex items-center justify-center">
                    <span className="text-primary font-calligraphy text-2xl md:text-3xl font-medium">
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
