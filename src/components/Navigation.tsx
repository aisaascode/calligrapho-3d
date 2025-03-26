
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./ThemeToggle";
import { gsap } from "gsap";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    
    // GSAP animation for navbar items
    gsap.from(".nav-item", {
      opacity: 0,
      y: -20,
      stagger: 0.1,
      delay: 0.5,
      duration: 0.8,
      ease: "power3.out"
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    
    if (!mobileMenuOpen) {
      // Animate mobile menu opening
      gsap.fromTo(".mobile-menu", 
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
      );
    }
  };

  return (
    <nav 
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300 px-4 md:px-6 lg:px-12",
        isScrolled 
          ? "py-3 glass shadow-sm" 
          : "py-6 bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link 
          to="/" 
          className="text-2xl md:text-3xl font-calligraphy font-bold text-foreground nav-item"
        >
          Calligrapho
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
          <Link to="/" className="font-medium text-foreground hover:text-primary transition-colors nav-item">Home</Link>
          <a href="#services" className="font-medium text-foreground hover:text-primary transition-colors nav-item">Services</a>
          <a href="#works" className="font-medium text-foreground hover:text-primary transition-colors nav-item">Works</a>
          <a href="#clients" className="font-medium text-foreground hover:text-primary transition-colors nav-item">Clients</a>
          <a href="#pricing" className="font-medium text-foreground hover:text-primary transition-colors nav-item">Pricing</a>
          <Link to="/auth" className="nav-item">
            <Button variant="outline" className="rounded-full hover:bg-primary hover:text-primary-foreground">
              Sign In
            </Button>
          </Link>
          <ThemeToggle className="nav-item" />
        </div>
        
        {/* Mobile Navigation Toggle */}
        <div className="flex items-center gap-4 md:hidden">
          <Link to="/auth">
            <Button size="sm" variant="outline" className="rounded-full">
              Sign In
            </Button>
          </Link>
          <ThemeToggle />
          <button 
            onClick={toggleMobileMenu}
            className="text-foreground focus:outline-none"
            aria-label="Toggle mobile menu"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="mobile-menu md:hidden glass mt-3 p-4 rounded-lg">
          <div className="flex flex-col space-y-4">
            <Link 
              to="/" 
              className="font-medium text-foreground hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <a 
              href="#services" 
              className="font-medium text-foreground hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Services
            </a>
            <a 
              href="#works" 
              className="font-medium text-foreground hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Works
            </a>
            <a 
              href="#clients" 
              className="font-medium text-foreground hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Clients
            </a>
            <a 
              href="#pricing" 
              className="font-medium text-foreground hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Pricing
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
