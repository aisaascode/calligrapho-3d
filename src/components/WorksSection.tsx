
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const works = [
  {
    id: 1,
    title: "Royal Wedding Invitations",
    category: "Wedding",
    image: "https://images.unsplash.com/photo-1576105396332-557d036a15be?q=80&w=700&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Luxury Brand Logo Design",
    category: "Branding",
    image: "https://images.unsplash.com/photo-1598368195835-91e67f80c9d9?q=80&w=700&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Poetry Collection Artwork",
    category: "Art",
    image: "https://images.unsplash.com/photo-1519682577862-22b62b24e493?q=80&w=700&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "Corporate Event Signage",
    category: "Event",
    image: "https://images.unsplash.com/photo-1599255068390-206e0d068539?q=80&w=700&auto=format&fit=crop",
  },
  {
    id: 5,
    title: "Digital Magazine Typography",
    category: "Digital",
    image: "https://images.unsplash.com/photo-1599255068290-5782cdaf8dd7?q=80&w=700&auto=format&fit=crop",
  },
  {
    id: 6,
    title: "Custom Quote Wall Art",
    category: "Art",
    image: "https://images.unsplash.com/photo-1596447594109-2f0b133fee0c?q=80&w=700&auto=format&fit=crop",
  },
  {
    id: 7,
    title: "Elegant Script Lettering",
    category: "Typography",
    image: "https://images.unsplash.com/photo-1518558997980-ef1696049d21?q=80&w=700&auto=format&fit=crop",
  },
  {
    id: 8,
    title: "Hand-drawn Letter Set",
    category: "Stationery",
    image: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=700&auto=format&fit=crop",
  },
  {
    id: 9,
    title: "Arabic Calligraphy Art",
    category: "Cultural",
    image: "https://images.unsplash.com/photo-1596363525341-5ac7ae381b02?q=80&w=700&auto=format&fit=crop",
  },
];

const WorksSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Section title animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
      }
    });
    
    tl.from(".works-tag", {
      opacity: 0,
      y: 20,
      duration: 0.6,
      ease: "power3.out"
    })
    .from(".works-title", {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: "power3.out"
    }, "-=0.4")
    .from(".works-description", {
      opacity: 0,
      y: 20,
      duration: 0.8,
      ease: "power3.out"
    }, "-=0.6");

    // Gallery animations
    if (galleryRef.current) {
      const items = galleryRef.current.querySelectorAll('.gallery-item');
      
      gsap.from(items, {
        opacity: 0,
        y: 50,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: galleryRef.current,
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
      className="py-16 md:py-24 px-4 md:px-6 bg-secondary/30"
      id="works"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <span className="px-3 py-1 text-sm rounded-full border border-primary/30 bg-primary/5 text-primary works-tag">
            Recent Works
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-6 works-title">
            Showcasing Our Artistic Journey
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mt-4 works-description">
            Explore our portfolio of meticulously crafted projects. Each piece represents our dedication to precision and artistic excellence.
          </p>
        </div>
        
        <div ref={galleryRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          {works.map((work) => (
            <div key={work.id} className="gallery-item group overflow-hidden rounded-2xl relative">
              <div className="aspect-square overflow-hidden">
                <img 
                  src={work.image} 
                  alt={work.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 md:p-6">
                <span className="text-sm text-primary font-medium">{work.category}</span>
                <h3 className="text-white text-lg md:text-xl font-bold mt-2">{work.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorksSection;
