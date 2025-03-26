
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ScrollAnimations = () => {
  useEffect(() => {
    // Initialize ScrollTrigger
    gsap.config({
      nullTargetWarn: false,
    });

    // Staggered text reveal animation for headings
    gsap.utils.toArray<HTMLElement>('.stagger-text').forEach((text) => {
      const splitText = new SplitText(text, { type: "chars,words" });
      
      gsap.from(splitText.chars, {
        opacity: 0,
        y: 50,
        stagger: 0.02,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: text,
          start: "top 85%",
          once: true,
        }
      });
    });

    // Parallax effect for section backgrounds
    gsap.utils.toArray<HTMLElement>('.parallax-section').forEach((section) => {
      const bgElement = section.querySelector('.parallax-bg');
      if (bgElement) {
        gsap.fromTo(
          bgElement,
          { y: 0 },
          {
            y: 100,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            }
          }
        );
      }
    });

    // Fade in scale up for cards and gallery items
    gsap.utils.toArray<HTMLElement>('.fade-in-scale').forEach((element) => {
      gsap.from(element, {
        opacity: 0,
        scale: 0.8,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: element,
          start: "top 85%",
          once: true,
        }
      });
    });

    // Staggered animation for lists and grid items
    const staggers = gsap.utils.toArray<HTMLElement>('.stagger-container');
    staggers.forEach((container) => {
      const items = container.querySelectorAll('.stagger-item');
      
      gsap.from(items, {
        opacity: 0,
        y: 30,
        stagger: 0.1,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: container,
          start: "top 80%",
          once: true,
        }
      });
    });

    // Smooth scroll to section when clicking navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          gsap.to(window, {
            duration: 1,
            scrollTo: {
              y: targetElement,
              offsetY: 80,
            },
            ease: "power3.inOut"
          });
        }
      });
    });

    // Clean up ScrollTriggers
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return null;
};

// Helper class for text animation - simplified version
class SplitText {
  chars: HTMLElement[] = [];
  words: HTMLElement[] = [];
  
  constructor(element: HTMLElement, options: { type: string }) {
    if (options.type.includes("chars")) {
      const text = element.innerText;
      element.innerHTML = "";
      
      // Split into characters
      text.split("").forEach((char) => {
        if (char === " ") {
          element.appendChild(document.createTextNode(" "));
        } else {
          const charSpan = document.createElement("span");
          charSpan.style.display = "inline-block";
          charSpan.innerHTML = char;
          element.appendChild(charSpan);
          this.chars.push(charSpan);
        }
      });
    } else if (options.type.includes("words")) {
      const text = element.innerText;
      element.innerHTML = "";
      
      // Split into words
      text.split(" ").forEach((word, i) => {
        const wordSpan = document.createElement("span");
        wordSpan.style.display = "inline-block";
        wordSpan.innerHTML = word;
        element.appendChild(wordSpan);
        this.words.push(wordSpan);
        
        if (i !== text.split(" ").length - 1) {
          element.appendChild(document.createTextNode(" "));
        }
      });
    }
  }
}

export default ScrollAnimations;
