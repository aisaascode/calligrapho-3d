
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const pricing = [
  {
    id: 1,
    name: "Essentials",
    price: "$299",
    description: "Perfect for small projects with basic calligraphy needs.",
    features: [
      "Custom lettering design",
      "1 calligraphy style",
      "2 revision rounds",
      "Digital delivery",
      "14-day delivery",
    ],
    isPopular: false,
  },
  {
    id: 2,
    name: "Premium",
    price: "$599",
    description: "Our most popular package for medium-sized projects.",
    features: [
      "Custom lettering design",
      "2 calligraphy styles",
      "3 revision rounds",
      "Digital & physical delivery",
      "Priority 10-day delivery",
      "Color variations",
      "Basic animation (digital only)",
    ],
    isPopular: true,
  },
  {
    id: 3,
    name: "Bespoke",
    price: "$1,299",
    description: "Comprehensive solution for elaborate projects.",
    features: [
      "Custom lettering design",
      "3 calligraphy styles",
      "Unlimited revisions",
      "Digital & physical delivery",
      "Express 7-day delivery",
      "Color variations",
      "Advanced animation (digital only)",
      "Dedicated project manager",
      "Usage rights for commercial purposes",
    ],
    isPopular: false,
  },
];

const PricingSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Section title animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
      }
    });
    
    tl.from(".pricing-tag", {
      opacity: 0,
      y: 20,
      duration: 0.6,
      ease: "power3.out"
    })
    .from(".pricing-title", {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: "power3.out"
    }, "-=0.4")
    .from(".pricing-description", {
      opacity: 0,
      y: 20,
      duration: 0.8,
      ease: "power3.out"
    }, "-=0.6");

    // Pricing cards animations with 3D effect
    if (cardsRef.current) {
      const cards = cardsRef.current.querySelectorAll('.pricing-card');
      
      // Staggered appearance
      gsap.from(cards, {
        opacity: 0,
        y: 100,
        rotateX: 20,
        transformPerspective: 1000,
        stagger: 0.3,
        duration: 1,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top 80%",
        }
      });
      
      // Highlight animation for popular card
      gsap.timeline({
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top 70%",
          toggleActions: "play none none none"
        }
      })
      .to('.pricing-card[data-popular="true"]', {
        scale: 1.05, 
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
        duration: 0.5,
        ease: "back.out(1.7)",
        delay: 1.2
      })
      .to('.pricing-card[data-popular="true"]', {
        scale: 1,
        duration: 0.3,
        delay: 0.2
      })
      .to('.pricing-card[data-popular="true"]', {
        scale: 1.05,
        duration: 0.3
      });
      
      // Add hover animation to cards
      cards.forEach(card => {
        const isPopular = card.getAttribute('data-popular') === 'true';
        const featList = card.querySelector('ul');
        const features = featList ? featList.querySelectorAll('li') : [];
        const button = card.querySelector('button');
        
        card.addEventListener('mouseenter', () => {
          // Skip if it's the popular card that's already scaled
          if (!isPopular) {
            gsap.to(card, {
              y: -15,
              scale: 1.05,
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
              duration: 0.3
            });
          }
          
          // Stagger highlight the features
          gsap.to(features, {
            x: 5,
            color: 'hsl(var(--primary))',
            stagger: 0.05,
            duration: 0.2
          });
          
          // Animate the button
          if (button) {
            gsap.to(button, {
              scale: 1.1,
              backgroundColor: 'hsl(var(--primary))',
              color: 'hsl(var(--primary-foreground))',
              duration: 0.3
            });
          }
        });
        
        card.addEventListener('mouseleave', () => {
          if (!isPopular) {
            gsap.to(card, {
              y: 0,
              scale: 1,
              boxShadow: "none",
              duration: 0.3
            });
          }
          
          gsap.to(features, {
            x: 0,
            color: 'hsl(var(--foreground))',
            stagger: 0.05,
            duration: 0.2
          });
          
          if (button && !isPopular) {
            gsap.to(button, {
              scale: 1,
              backgroundColor: 'transparent',
              color: 'hsl(var(--foreground))',
              duration: 0.3
            });
          }
        });
      });
    }

    // Add floating animation to the CTA section
    const cta = document.querySelector('.pricing-cta');
    if (cta) {
      gsap.to(cta, {
        y: -10,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="py-20 md:py-24 px-4 md:px-6 bg-secondary/30 parallax-section"
      id="pricing"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="px-3 py-1 text-sm rounded-full border border-primary/30 bg-primary/5 text-primary pricing-tag inline-block">
            Pricing
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-6 pricing-title stagger-text">
            Transparent Pricing for Quality Work
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mt-4 pricing-description">
            Choose the package that suits your needs. All prices include consultation, design, and delivery. Custom quotes available for specific requirements.
          </p>
        </div>
        
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 stagger-container">
          {pricing.map((plan) => (
            <div 
              key={plan.id} 
              className={`pricing-card stagger-item p-6 md:p-8 rounded-xl border ${plan.isPopular ? 'border-primary shadow-lg shadow-primary/10 relative' : 'border-border/50'} transition-all duration-300 hover:cursor-pointer`}
              data-popular={plan.isPopular}
            >
              {plan.isPopular && (
                <div className="absolute -top-4 left-0 right-0 flex justify-center">
                  <span className="px-4 py-1 bg-primary text-white text-sm rounded-full">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className="mb-6">
                <h3 className="text-2xl font-bold font-calligraphy">{plan.name}</h3>
                <p className="text-muted-foreground mt-2">{plan.description}</p>
              </div>
              
              <div className="mb-6">
                <div className="flex items-baseline">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground ml-2">/ project</span>
                </div>
              </div>
              
              <div className="mb-8">
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <Button 
                className={`w-full ${plan.isPopular ? '' : 'border-primary border text-primary hover:bg-primary hover:text-primary-foreground'}`}
                variant={plan.isPopular ? "default" : "outline"}
              >
                Choose Plan
              </Button>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center pricing-cta">
          <p className="text-muted-foreground mb-4">Need a custom solution? Contact us for a personalized quote.</p>
          <Button variant="outline" className="rounded-full border-primary text-primary hover:bg-primary hover:text-primary-foreground">
            Get Custom Quote
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
