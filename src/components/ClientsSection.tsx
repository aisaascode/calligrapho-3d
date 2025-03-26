
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    id: 1,
    name: "Emily Johnson",
    role: "Bride",
    quote: "The wedding invitations exceeded our expectations. The delicate calligraphy perfectly captured the elegance we wanted for our special day.",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=100&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Creative Director",
    quote: "Working with Calligrapho on our brand identity was a game-changer. Their attention to detail and artistic vision elevated our entire brand presence.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Sophia Rodriguez",
    role: "Art Collector",
    quote: "The commissioned piece for my home office is simply stunning. It's not just calligraphy, it's a true work of art that inspires me daily.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop",
  },
];

const clients = [
  "Vogue Magazine",
  "Harper's Bazaar",
  "The Ritz-Carlton",
  "Tiffany & Co.",
  "Sotheby's",
  "Estée Lauder",
  "Gucci",
  "Wedluxe",
  "Christie's",
  "Cartier",
];

const ClientsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const clientsRef = useRef<HTMLDivElement>(null);
  const scrollTimeline = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    // Section title animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
      }
    });
    
    tl.from(".clients-tag", {
      opacity: 0,
      y: 20,
      duration: 0.6,
      ease: "power3.out"
    })
    .from(".clients-title", {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: "power3.out"
    }, "-=0.4")
    .from(".clients-description", {
      opacity: 0,
      y: 20,
      duration: 0.8,
      ease: "power3.out"
    }, "-=0.6");

    // Testimonials animations with 3D effect
    if (testimonialsRef.current) {
      const cards = testimonialsRef.current.querySelectorAll('.testimonial-card');
      
      // Create staggered 3D rotation effect
      gsap.from(cards, {
        opacity: 0,
        y: 80,
        rotationX: 45,
        transformPerspective: 800,
        stagger: 0.2,
        duration: 1,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: testimonialsRef.current,
          start: "top 80%",
        }
      });
      
      // Add hover effects
      cards.forEach(card => {
        const quote = card.querySelector('p');
        const avatar = card.querySelector('img');
        
        card.addEventListener('mouseenter', () => {
          gsap.to(card, {
            y: -10,
            rotationY: 5,
            rotationX: 5,
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
            duration: 0.5
          });
          
          gsap.to(quote, {
            fontWeight: "bold",
            scale: 1.02,
            duration: 0.3
          });
          
          gsap.to(avatar, {
            scale: 1.1,
            borderColor: 'hsl(var(--primary))',
            duration: 0.5
          });
        });
        
        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            y: 0,
            rotationY: 0,
            rotationX: 0,
            boxShadow: "none",
            duration: 0.5
          });
          
          gsap.to(quote, {
            fontWeight: "normal",
            scale: 1,
            duration: 0.3
          });
          
          gsap.to(avatar, {
            scale: 1,
            borderColor: 'currentColor',
            duration: 0.5
          });
        });
      });
    }

    // Floating animation for client logos
    if (clientsRef.current) {
      const logos = clientsRef.current.querySelectorAll('.client-logo');
      
      // Initial animation
      gsap.from(logos, {
        opacity: 0,
        scale: 0.5,
        stagger: 0.1,
        duration: 0.8,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: clientsRef.current,
          start: "top 80%",
        }
      });
      
      // Continuous floating animation
      logos.forEach((logo, i) => {
        const delay = i * 0.2;
        const duration = gsap.utils.random(2, 3);
        
        gsap.to(logo, {
          y: -10,
          duration: duration,
          delay: delay,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });
        
        logo.addEventListener('mouseenter', () => {
          gsap.to(logo, {
            scale: 1.1,
            backgroundColor: 'hsl(var(--primary) / 0.1)',
            borderColor: 'hsl(var(--primary))',
            boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
            duration: 0.3
          });
        });
        
        logo.addEventListener('mouseleave', () => {
          gsap.to(logo, {
            scale: 1,
            backgroundColor: 'hsl(var(--secondary))',
            borderColor: 'hsl(var(--primary) / 0.2)',
            boxShadow: "none",
            duration: 0.3
          });
        });
      });
    }

    // Create horizontal parallax scroll effect
    scrollTimeline.current = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });
    
    // Apply different directional movements to create parallax
    if (clientsRef.current && scrollTimeline.current) {
      scrollTimeline.current.to(clientsRef.current, { x: -30 }, 0);
    }
    
    if (testimonialsRef.current && scrollTimeline.current) {
      scrollTimeline.current.to(testimonialsRef.current, { x: 30 }, 0);
    }

    return () => {
      if (scrollTimeline.current) {
        scrollTimeline.current.kill();
      }
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="py-20 md:py-24 px-4 md:px-6 overflow-hidden"
      id="clients"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="px-3 py-1 text-sm rounded-full border border-primary/30 bg-primary/5 text-primary clients-tag inline-block">
            Our Clients
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-6 clients-title stagger-text">
            Trusted by Discerning Clients
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mt-4 clients-description">
            We've had the privilege of working with incredible clients, from luxury brands to individual art enthusiasts. Our work speaks for itself.
          </p>
        </div>
        
        {/* Testimonials */}
        <div ref={testimonialsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-20 stagger-container">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="testimonial-card stagger-item p-6 rounded-xl border border-border/50 transition-all duration-300 hover:cursor-pointer">
              <div className="mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary/50" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11.94 3.21a1 1 0 0 1 .53 1.2L10.85 10h5.82a2 2 0 0 1 2 2.5l-1.09 4.4a2 2 0 0 1-1.92 1.5H6.3a1 1 0 0 1-1-1v-10a1 1 0 0 1 .35-.76l6-5a1 1 0 0 1 1.3.07ZM21 10h-2.5a1 1 0 0 1 0-2H21a1 1 0 0 1 0 2Z" />
                </svg>
              </div>
              <p className="text-foreground mb-6 min-h-[100px]">{testimonial.quote}</p>
              <div className="flex items-center">
                <div className="mr-3 border-2 border-transparent rounded-full overflow-hidden">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold">{testimonial.name}</h4>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Client Logos */}
        <div>
          <div className="mb-10">
            <h3 className="text-2xl font-bold text-center">Clients We've Worked With</h3>
          </div>
          
          <div ref={clientsRef} className="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-8 items-center justify-items-center stagger-container">
            {clients.map((client, index) => (
              <div key={index} className="client-logo stagger-item text-center">
                <div className="w-20 h-20 mx-auto rounded-full border border-primary/20 bg-secondary flex items-center justify-center transition-all duration-300">
                  <span className="font-calligraphy text-xl text-foreground">{client.charAt(0)}</span>
                </div>
                <p className="mt-3 text-sm font-medium text-muted-foreground">{client}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientsSection;
