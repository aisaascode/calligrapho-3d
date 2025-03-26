
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';

const ThreeBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const objectsRef = useRef<THREE.Mesh[]>([]);
  const frameRef = useRef<number | null>(null);

  // Create and setup the scene
  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 20;
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true,
      antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    
    canvasRef.current = renderer.domElement;
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Create objects
    const objects: THREE.Mesh[] = [];
    
    // Create calligraphy-inspired shapes and 3D text
    const letters = ['A', 'B', 'C', 'Q', 'M', 'Z', 'E', 'F', 'R', 'S'];
    const calligraphyWords = ['Art', 'Script', 'Elegant', 'Style', 'Beauty'];
    
    // Load font for 3D text
    const fontLoader = new FontLoader();
    fontLoader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', function(font) {
      // Add 3D letters
      letters.forEach((letter, index) => {
        const textGeometry = new TextGeometry(letter, {
          font: font,
          size: 1.5,
          height: 0.2,
          curveSegments: 12,
          bevelEnabled: true,
          bevelThickness: 0.03,
          bevelSize: 0.02,
          bevelOffset: 0,
          bevelSegments: 5
        });
        
        textGeometry.center();
        
        const material = new THREE.MeshStandardMaterial({
          color: new THREE.Color().setHSL(0.75 + Math.random() * 0.1, 0.7, 0.6),
          roughness: 0.3,
          metalness: 0.7,
        });
        
        const textMesh = new THREE.Mesh(textGeometry, material);
        
        // Position randomly in 3D space
        textMesh.position.set(
          (Math.random() - 0.5) * 40,
          (Math.random() - 0.5) * 40,
          (Math.random() - 0.5) * 20
        );
        
        // Random rotation
        textMesh.rotation.x = Math.random() * Math.PI;
        textMesh.rotation.y = Math.random() * Math.PI;
        
        // Scale down a bit
        textMesh.scale.set(0.6, 0.6, 0.6);
        
        // Add animations with GSAP
        gsap.to(textMesh.rotation, {
          x: `+=${Math.PI * 2}`,
          y: `+=${Math.PI * 2}`,
          duration: 25 + Math.random() * 30,
          ease: "none",
          repeat: -1
        });
        
        gsap.to(textMesh.position, {
          x: `+=${Math.random() * 3 - 1.5}`,
          y: `+=${Math.random() * 3 - 1.5}`,
          z: `+=${Math.random() * 3 - 1.5}`,
          duration: 15 + Math.random() * 10,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true
        });
        
        scene.add(textMesh);
        objects.push(textMesh);
      });
      
      // Add calligraphy words
      calligraphyWords.forEach((word, index) => {
        const textGeometry = new TextGeometry(word, {
          font: font,
          size: 2,
          height: 0.2,
          curveSegments: 12,
          bevelEnabled: true,
          bevelThickness: 0.03,
          bevelSize: 0.02,
          bevelOffset: 0,
          bevelSegments: 5
        });
        
        textGeometry.center();
        
        const material = new THREE.MeshStandardMaterial({
          color: new THREE.Color().setHSL(0.75 + Math.random() * 0.1, 0.7, 0.6),
          roughness: 0.3,
          metalness: 0.7,
        });
        
        const textMesh = new THREE.Mesh(textGeometry, material);
        
        // Position deeper in the scene
        textMesh.position.set(
          (Math.random() - 0.5) * 40,
          (Math.random() - 0.5) * 40,
          (Math.random() - 0.5) * 15 - 10
        );
        
        // Random rotation
        textMesh.rotation.x = Math.random() * Math.PI;
        textMesh.rotation.y = Math.random() * Math.PI;
        
        // Add animations with GSAP
        gsap.to(textMesh.rotation, {
          x: `+=${Math.PI * 2}`,
          y: `+=${Math.PI * 2}`,
          duration: 30 + Math.random() * 30,
          ease: "none",
          repeat: -1
        });
        
        gsap.to(textMesh.position, {
          x: `+=${Math.random() * 3 - 1.5}`,
          y: `+=${Math.random() * 3 - 1.5}`,
          z: `+=${Math.random() * 3 - 1.5}`,
          duration: 20 + Math.random() * 10,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true
        });
        
        scene.add(textMesh);
        objects.push(textMesh);
      });
    });
    
    const createPenShape = (position: THREE.Vector3, color: THREE.Color) => {
      // Create a pen nib-like shape
      const shape = new THREE.Shape();
      shape.moveTo(0, 2);
      shape.lineTo(1, 0);
      shape.lineTo(0, -2);
      shape.lineTo(-1, 0);
      shape.lineTo(0, 2);
      
      const extrudeSettings = {
        steps: 1,
        depth: 0.2,
        bevelEnabled: true,
        bevelThickness: 0.1,
        bevelSize: 0.2,
        bevelOffset: 0,
        bevelSegments: 3
      };
      
      const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
      const material = new THREE.MeshStandardMaterial({
        color,
        roughness: 0.3,
        metalness: 0.7,
      });
      
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.copy(position);
      mesh.rotation.x = Math.random() * Math.PI;
      mesh.rotation.y = Math.random() * Math.PI;
      mesh.scale.set(0.8, 0.8, 0.8);
      
      // Add random animation
      gsap.to(mesh.rotation, {
        x: `+=${Math.PI * 2}`,
        y: `+=${Math.PI * 2}`,
        duration: 20 + Math.random() * 30,
        ease: "none",
        repeat: -1
      });
      
      gsap.to(mesh.position, {
        x: `+=${Math.random() * 2 - 1}`,
        y: `+=${Math.random() * 2 - 1}`,
        z: `+=${Math.random() * 2 - 1}`,
        duration: 10 + Math.random() * 10,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true
      });
      
      return mesh;
    };
    
    const createInkDrop = (position: THREE.Vector3, color: THREE.Color) => {
      // Create an ink drop (sphere with distortion)
      const geometry = new THREE.SphereGeometry(0.6, 24, 24);
      
      // Distort the geometry to make it look more like an ink drop
      const positionAttribute = geometry.getAttribute('position');
      const vertex = new THREE.Vector3();
      
      for (let i = 0; i < positionAttribute.count; i++) {
        vertex.fromBufferAttribute(positionAttribute, i);
        
        const distortion = 0.4 * Math.sin(4 * vertex.x) * Math.sin(4 * vertex.y) * Math.sin(4 * vertex.z);
        vertex.x += distortion;
        vertex.y += distortion;
        vertex.z += distortion;
        
        positionAttribute.setXYZ(i, vertex.x, vertex.y, vertex.z);
      }
      
      geometry.computeVertexNormals();
      
      const material = new THREE.MeshStandardMaterial({
        color,
        roughness: 0.2,
        metalness: 0.1,
        transparent: true,
        opacity: 0.8
      });
      
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.copy(position);
      
      // Add floating animation
      gsap.to(mesh.position, {
        y: `+=${Math.random() * 2 - 1}`,
        duration: 4 + Math.random() * 4,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true
      });
      
      gsap.to(mesh.rotation, {
        x: `+=${Math.PI * 2}`,
        y: `+=${Math.PI * 2}`,
        z: `+=${Math.PI * 2}`,
        duration: 15 + Math.random() * 15,
        ease: "none",
        repeat: -1
      });
      
      return mesh;
    };
    
    // Add multiple pen nibs and ink drops
    for (let i = 0; i < 10; i++) {
      const position = new THREE.Vector3(
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 15
      );
      
      const color = new THREE.Color();
      color.setHSL(0.75 + Math.random() * 0.1, 0.7, 0.6); // Purple hues
      
      if (i % 2 === 0) {
        const penShape = createPenShape(position, color);
        scene.add(penShape);
        objects.push(penShape);
      } else {
        const inkDrop = createInkDrop(position, color);
        scene.add(inkDrop);
        objects.push(inkDrop);
      }
    }
    
    objectsRef.current = objects;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(10, 10, 10);
    scene.add(directionalLight);

    const pointLight1 = new THREE.PointLight(0xff00ff, 0.5, 30);
    pointLight1.position.set(5, 5, 5);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x00ffff, 0.5, 30);
    pointLight2.position.set(-5, -5, 5);
    scene.add(pointLight2);

    // Animation for lights
    gsap.to(pointLight1.position, {
      x: 5,
      y: -5,
      z: 5,
      duration: 8,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    gsap.to(pointLight2.position, {
      x: -5,
      y: 5,
      z: 5,
      duration: 8,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    // Resize handler
    const handleResize = () => {
      if (!cameraRef.current || !rendererRef.current) return;
      
      cameraRef.current.aspect = window.innerWidth / window.innerHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Mouse movement effect
    const handleMouseMove = (event: MouseEvent) => {
      if (!cameraRef.current) return;
      
      const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
      
      gsap.to(cameraRef.current.position, {
        x: mouseX * 2,
        y: mouseY * 2,
        duration: 1,
        ease: "power2.out"
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    const animate = () => {
      if (!sceneRef.current || !cameraRef.current || !rendererRef.current) return;
      
      rendererRef.current.render(sceneRef.current, cameraRef.current);
      frameRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(frameRef.current as number);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      
      if (rendererRef.current && containerRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
      }
      
      // Dispose geometries and materials
      objectsRef.current.forEach(object => {
        object.geometry.dispose();
        (object.material as THREE.Material).dispose();
      });
    };
  }, []);

  return <div ref={containerRef} className="fixed inset-0 -z-10" />;
};

export default ThreeBackground;
