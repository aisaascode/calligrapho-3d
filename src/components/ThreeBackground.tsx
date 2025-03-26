
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useIsMobile } from "@/hooks/use-mobile";

gsap.registerPlugin(ScrollTrigger);

const ThreeBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const calligraphyObjectsRef = useRef<THREE.Group | null>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const scrollPosRef = useRef(0);
  const isMobile = useIsMobile();

  // Initialize and handle Three.js scene
  useEffect(() => {
    if (!containerRef.current) return;

    // Create the scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Create the camera
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 10;
    cameraRef.current = camera;

    // Create renderer
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true,
      antialias: true 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    rendererRef.current = renderer;
    canvasRef.current = renderer.domElement;
    
    // Append to container
    containerRef.current.innerHTML = '';
    containerRef.current.appendChild(renderer.domElement);

    // Create calligraphy objects
    const calligraphyGroup = new THREE.Group();
    calligraphyObjectsRef.current = calligraphyGroup;
    scene.add(calligraphyGroup);
    
    // Create particles
    createParticles();
    
    // Create ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    // Create directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    // Create calligraphy 3D text objects
    createCalligraphyObjects();

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    // Handle mouse movement for parallax effect
    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1
      };
    };
    window.addEventListener("mousemove", handleMouseMove);
    
    // Handle scroll for parallax effect
    const handleScroll = () => {
      scrollPosRef.current = window.scrollY / (document.body.offsetHeight - window.innerHeight);
    };
    window.addEventListener("scroll", handleScroll);

    // Animation loop
    let frame = 0;
    const animate = () => {
      frame = requestAnimationFrame(animate);
      
      // Rotate calligraphy group based on mouse position
      if (calligraphyGroup) {
        const targetRotationX = mouseRef.current.y * 0.1;
        const targetRotationY = mouseRef.current.x * 0.1;
        
        calligraphyGroup.rotation.x += (targetRotationX - calligraphyGroup.rotation.x) * 0.05;
        calligraphyGroup.rotation.y += (targetRotationY - calligraphyGroup.rotation.y) * 0.05;
        
        // Move based on scroll position
        calligraphyGroup.position.y = -scrollPosRef.current * 5;
        
        // Slight constant rotation
        calligraphyGroup.rotation.z += 0.001;
      }
      
      // Render scene
      renderer.render(scene, camera);
    };
    
    animate();

    // Clean up
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      
      // Clean up Three.js resources
      cancelAnimationFrame(frame);
      scene.clear();
      renderer.dispose();
      
      if (containerRef.current && canvasRef.current) {
        containerRef.current.removeChild(canvasRef.current);
      }
    };
  }, [isMobile]);

  // Create calligraphy-related 3D objects
  const createCalligraphyObjects = () => {
    if (!calligraphyObjectsRef.current) return;
    
    const group = calligraphyObjectsRef.current;
    
    // Create materials with different colors
    const materials = [
      new THREE.MeshPhysicalMaterial({ 
        color: 0x8b5cf6,
        metalness: 0.8,
        roughness: 0.2,
        emissive: 0x8b5cf6,
        emissiveIntensity: 0.2,
      }),
      new THREE.MeshPhysicalMaterial({ 
        color: 0xd946ef,
        metalness: 0.6,
        roughness: 0.3,
        emissive: 0xd946ef,
        emissiveIntensity: 0.2,
      }),
      new THREE.MeshPhysicalMaterial({ 
        color: 0xffffff,
        metalness: 1,
        roughness: 0.1,
        emissive: 0xffffff,
        emissiveIntensity: 0.1,
      }),
    ];
    
    // Create stylish curved paths for calligraphy effect
    for (let i = 0; i < 15; i++) {
      // Create random stylized shapes like calligraphy strokes
      const curve = new THREE.CubicBezierCurve3(
        new THREE.Vector3(-5 + Math.random() * 10, -5 + Math.random() * 10, -5 + Math.random() * 10),
        new THREE.Vector3(-5 + Math.random() * 10, -5 + Math.random() * 10, -5 + Math.random() * 10),
        new THREE.Vector3(-5 + Math.random() * 10, -5 + Math.random() * 10, -5 + Math.random() * 10),
        new THREE.Vector3(-5 + Math.random() * 10, -5 + Math.random() * 10, -5 + Math.random() * 10)
      );
      
      const points = curve.getPoints(50);
      const geometry = new THREE.TubeGeometry(
        new THREE.CatmullRomCurve3(points),
        20,
        0.05 + Math.random() * 0.1,
        8,
        false
      );
      
      const material = materials[Math.floor(Math.random() * materials.length)];
      const mesh = new THREE.Mesh(geometry, material);
      
      // Position randomly but clustered
      mesh.position.set(
        -10 + Math.random() * 20,
        -10 + Math.random() * 20,
        -10 + Math.random() * 20
      );
      
      // Random rotation
      mesh.rotation.set(
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2
      );
      
      // Animate each stroke with GSAP
      gsap.to(mesh.rotation, {
        x: mesh.rotation.x + Math.PI * 2,
        y: mesh.rotation.y + Math.PI * 2,
        z: mesh.rotation.z + Math.PI * 2,
        duration: 20 + Math.random() * 100,
        repeat: -1,
        ease: "none"
      });
      
      group.add(mesh);
    }
    
    // Create some 3D letter forms
    const letterShapes = ['A', 'B', 'C'];
    const letterPositions = [
      { x: -6, y: 2, z: -3 },
      { x: 6, y: -2, z: -5 },
      { x: 0, y: 5, z: -8 },
    ];
    
    letterShapes.forEach((letter, i) => {
      if (isMobile && i > 0) return; // Fewer objects on mobile for performance
      
      // Add a stylized cube/letter
      const geometry = new THREE.BoxGeometry(1, 1, 0.2);
      const material = materials[i % materials.length];
      const mesh = new THREE.Mesh(geometry, material);
      
      mesh.position.set(
        letterPositions[i].x,
        letterPositions[i].y,
        letterPositions[i].z
      );
      
      // Scale to make it letter-sized
      mesh.scale.set(2, 3, 0.2);
      
      // Animate each letter with GSAP
      gsap.to(mesh.rotation, {
        x: Math.PI * 2,
        y: Math.PI * 2,
        duration: 20 + i * 5,
        repeat: -1,
        ease: "none"
      });
      
      // Floating animation
      gsap.to(mesh.position, {
        y: mesh.position.y + 1,
        duration: 2 + i,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
      
      group.add(mesh);
    });
  };

  // Create particle effect
  const createParticles = () => {
    if (!sceneRef.current) return;
    
    // Create particle geometry
    const particlesGeometry = new THREE.BufferGeometry();
    const count = isMobile ? 1000 : 3000;
    
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    
    const colorOptions = [
      [0.545, 0.361, 0.965], // purple
      [0.851, 0.275, 0.937], // pink
      [1, 1, 1], // white
    ];
    
    for (let i = 0; i < count * 3; i += 3) {
      // Positions - create a sphere distribution
      const radius = 15;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      
      positions[i] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i + 2] = radius * Math.cos(phi);
      
      // Random color from options
      const colorIndex = Math.floor(Math.random() * colorOptions.length);
      colors[i] = colorOptions[colorIndex][0];
      colors[i + 1] = colorOptions[colorIndex][1];
      colors[i + 2] = colorOptions[colorIndex][2];
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    
    // Material
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.05,
      sizeAttenuation: true,
      transparent: true,
      alphaMap: new THREE.TextureLoader().load('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAF8WlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDggNzkuMTY0MDM2LCAyMDE5LzA4LzEzLTAxOjA2OjU3ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgMjEuMCAoV2luZG93cykiIHhtcDpDcmVhdGVEYXRlPSIyMDIwLTAzLTI2VDIxOjQxOjE5WiIgeG1wOk1vZGlmeURhdGU9IjIwMjAtMDMtMjZUMjE6NDI6NTdaIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDIwLTAzLTI2VDIxOjQyOjU3WiIgZGM6Zm9ybWF0PSJpbWFnZS9wbmciIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiIHBob3Rvc2hvcDpJQ0NQcm9maWxlPSJzUkdCIElFQzYxOTY2LTIuMSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoxYTJmN2IzNC1iOTcwLTA5NGMtOGMwMi0zMjg5ZWVk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'),
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    
    // Create points
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    sceneRef.current.add(particles);
    
    // Animate particles
    gsap.to(particles.rotation, {
      y: Math.PI * 2,
      duration: 100,
      repeat: -1,
      ease: "none"
    });
  };

  return (
    <div 
      ref={containerRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-[-1]"
    />
  );
};

export default ThreeBackground;
