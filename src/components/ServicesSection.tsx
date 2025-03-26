
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    id: 1,
    title: "Wedding Invitations",
    description: "Elegant and personalized calligraphy for your special day. We create custom invitations that set the tone for your wedding.",
    icon: "pen",
  },
  {
    id: 2,
    title: "Corporate Branding",
    description: "Elevate your brand with bespoke calligraphy. We design logos, business cards, and marketing materials that convey sophistication.",
    icon: "briefcase",
  },
  {
    id: 3,
    title: "Art Commissions",
    description: "Custom calligraphy artwork for your space. From quotes to poems, we transform words into visual masterpieces.",
    icon: "frame",
  },
  {
    id: 4,
    title: "Event Lettering",
    description: "On-site calligraphy for events. Add a touch of elegance to your gathering with live demonstrations and personalized keepsakes.",
    icon: "event",
  },
  {
    id: 5,
    title: "Digital Calligraphy",
    description: "Modern calligraphy solutions for digital platforms. We create assets for websites, social media, and digital marketing.",
    icon: "monitor",
  },
  {
    id: 6,
    title: "Calligraphy Workshops",
    description: "Learn the art of calligraphy from experts. We offer workshops for beginners and advanced practitioners alike.",
    icon: "book",
  },
];

const ServicesSection = () => {
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
    
    tl.from(".services-tag", {
      opacity: 0,
      y: 20,
      duration: 0.6,
      ease: "power3.out"
    })
    .from(".services-title", {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: "power3.out"
    }, "-=0.4")
    .from(".services-description", {
      opacity: 0,
      y: 20,
      duration: 0.8,
      ease: "power3.out"
    }, "-=0.6");

    // Service cards animations
    if (cardsRef.current) {
      const cards = cardsRef.current.querySelectorAll('.service-card');
      
      gsap.from(cards, {
        opacity: 0,
        y: 50,
        stagger: {
          each: 0.1,
          grid: [2, 3],
          from: "center",
        },
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top 80%",
        }
      });
      
      // Add hover animations for service cards
      cards.forEach(card => {
        const icon = card.querySelector('svg');
        const title = card.querySelector('h3');
        
        card.addEventListener('mouseenter', () => {
          gsap.to(card, {
            y: -10,
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
            backgroundColor: 'hsl(var(--primary) / 0.05)',
            borderColor: 'hsl(var(--primary) / 0.2)',
            duration: 0.3
          });
          
          gsap.to(icon, {
            rotate: 360,
            scale: 1.2,
            fill: 'hsl(var(--primary))',
            duration: 0.6,
            ease: "elastic.out(1, 0.5)"
          });
          
          gsap.to(title, {
            color: 'hsl(var(--primary))',
            duration: 0.3
          });
        });
        
        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            y: 0,
            boxShadow: "none",
            backgroundColor: 'transparent',
            borderColor: 'transparent',
            duration: 0.3
          });
          
          gsap.to(icon, {
            rotate: 0,
            scale: 1,
            fill: 'currentColor',
            duration: 0.6
          });
          
          gsap.to(title, {
            color: 'hsl(var(--foreground))',
            duration: 0.3
          });
        });
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case "pen":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
            <path d="m15 5 4 4" />
          </svg>
        );
      case "briefcase":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
            <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
          </svg>
        );
      case "frame":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
            <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <path d="m21 15-5-5L5 21" />
          </svg>
        );
      case "event":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
            <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
            <line x1="16" x2="16" y1="2" y2="6" />
            <line x1="8" x2="8" y1="2" y2="6" />
            <line x1="3" x2="21" y1="10" y2="10" />
          </svg>
        );
      case "monitor":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
            <rect width="20" height="14" x="2" y="3" rx="2" ry="2" />
            <line x1="8" x2="16" y1="21" y2="21" />
            <line x1="12" x2="12" y1="17" y2="21" />
          </svg>
        );
      case "book":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <section 
      ref={sectionRef}
      className="py-16 md:py-24 px-4 md:px-6 overflow-hidden"
      id="services"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <span className="px-3 py-1 text-sm rounded-full border border-primary/30 bg-primary/5 text-primary services-tag inline-block">
            Our Services
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-6 services-title stagger-text">
            Crafting Excellence in Every Letter
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mt-4 services-description">
            We offer a comprehensive range of calligraphy services tailored to your unique needs. From traditional scripts to modern styles, our expertise brings your vision to life.
          </p>
        </div>
        
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 stagger-container">
          {services.map((service) => (
            <div 
              key={service.id} 
              className="service-card stagger-item p-6 rounded-xl border border-transparent transition-all duration-300 hover:cursor-pointer"
            >
              <div className="mb-6">
                {renderIcon(service.icon)}
              </div>
              <h3 className="text-xl font-bold mb-3">{service.title}</h3>
              <p className="text-muted-foreground">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
