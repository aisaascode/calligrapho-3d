
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

    // Pricing cards animations
    if (cardsRef.current) {
      const cards = cardsRef.current.querySelectorAll('.pricing-card');
      
      gsap.from(cards, {
        opacity: 0,
        y: 50,
        stagger: 0.2,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top 80%",
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
      className="py-24 px-6 bg-secondary/30"
      id="pricing"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="px-3 py-1 text-sm rounded-full border border-primary/30 bg-primary/5 text-primary pricing-tag">
            Pricing
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-6 pricing-title">
            Transparent Pricing for Quality Work
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mt-4 pricing-description">
            Choose the package that suits your needs. All prices include consultation, design, and delivery. Custom quotes available for specific requirements.
          </p>
        </div>
        
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricing.map((plan) => (
            <div 
              key={plan.id} 
              className={`pricing-card ${plan.isPopular ? 'border-primary shadow-lg shadow-primary/10 relative' : ''}`}
            >
              {plan.isPopular && (
                <div className="absolute -top-4 left-0 right-0 flex justify-center">
                  <span className="px-4 py-1 bg-primary text-white text-sm rounded-full">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className="mb-6">
                <h3 className="text-2xl font-bold">{plan.name}</h3>
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
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <Button 
                className={`w-full ${plan.isPopular ? '' : 'variant-outline'}`}
                variant={plan.isPopular ? "default" : "outline"}
              >
                Choose Plan
              </Button>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-4">Need a custom solution? Contact us for a personalized quote.</p>
          <Button variant="outline">Get Custom Quote</Button>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
