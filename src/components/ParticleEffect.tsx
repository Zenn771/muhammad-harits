
import React, { useEffect, useRef, useState } from 'react';

interface ParticleEffectProps {
  count?: number;
  className?: string;
  interactive?: boolean;
}

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  pulse: number;
  pulseSpeed: number;
  color: string;
  depth: number;
}

const ParticleEffect: React.FC<ParticleEffectProps> = ({ 
  count = 25, 
  className = '',
  interactive = true 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>(0);
  const lastUpdateTimeRef = useRef<number>(0);
  const updateIntervalRef = useRef<number>(30); // ms between particle updates for smoother performance
  
  // Initialize and handle window resize
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d', { alpha: true }); // Alpha optimization
    if (!ctx) return;
    
    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const displayWidth = window.innerWidth;
      const displayHeight = window.innerHeight;
      
      canvas.width = displayWidth * dpr;
      canvas.height = displayHeight * dpr;
      canvas.style.width = `${displayWidth}px`;
      canvas.style.height = `${displayHeight}px`;
      ctx.scale(dpr, dpr);
    };
    
    const initializeParticles = () => {
      const colors = [
        'rgba(250, 204, 21, 1)', // Standard amber
        'rgba(255, 214, 31, 1)', // Warmer amber
        'rgba(240, 194, 21, 1)', // Slightly blue-tinted amber
      ];
      
      const newParticles: Particle[] = [];
      for (let i = 0; i < count; i++) {
        const depth = Math.random() * 0.5 + 0.5; // Depth between 0.5 and 1
        newParticles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: (Math.random() * 3 + 1.5) * depth, // Size adjusted by depth
          speedX: (Math.random() * 0.08 - 0.04) * depth, // Speed adjusted by depth
          speedY: (Math.random() * 0.08 - 0.04) * depth, // Speed adjusted by depth
          opacity: Math.random() * 0.3 + 0.1,
          pulse: Math.random() * Math.PI * 2,
          pulseSpeed: Math.random() * 0.02 + 0.005,
          color: colors[Math.floor(Math.random() * colors.length)],
          depth: depth
        });
      }
      particlesRef.current = newParticles;
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    initializeParticles();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationRef.current);
    };
  }, [count]);
  
  // Handle mouse movement for interactive effects
  useEffect(() => {
    if (!interactive) return;
    
    // Throttled mouse move handler for better performance
    let throttleTimeout: number | null = null;
    
    const handleMouseMove = (e: MouseEvent) => {
      if (throttleTimeout !== null) return;
      
      throttleTimeout = window.setTimeout(() => {
        setMousePosition({ x: e.clientX, y: e.clientY });
        throttleTimeout = null;
      }, 50); // Throttle to 20 updates per second
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (throttleTimeout !== null) clearTimeout(throttleTimeout);
    };
  }, [interactive]);
  
  // Animation loop with performance optimizations
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;
    
    const particles = particlesRef.current;
    const connectionDistance = 150;
    const updateInterval = updateIntervalRef.current;
    
    const drawParticles = (timestamp: number) => {
      // Throttle updates based on time for consistent motion regardless of framerate
      const shouldUpdate = timestamp - lastUpdateTimeRef.current >= updateInterval;
      
      if (shouldUpdate) {
        lastUpdateTimeRef.current = timestamp;
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Pre-compute connections to avoid redundant calculations
        const connections: {p1: number, p2: number, opacity: number}[] = [];
        
        // Update particles first
        particles.forEach((particle, index) => {
          // Update pulse value for opacity variation
          particle.pulse += particle.pulseSpeed;
          if (particle.pulse > Math.PI * 2) particle.pulse = 0;
          
          // Update position with smooth motion
          particle.x += particle.speedX;
          particle.y += particle.speedY;
          
          // Wrap around edges
          if (particle.x < 0) particle.x = canvas.width;
          if (particle.x > canvas.width) particle.x = 0;
          if (particle.y < 0) particle.y = canvas.height;
          if (particle.y > canvas.height) particle.y = 0;
          
          // Precompute connections
          for (let j = index + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const distance = Math.sqrt(Math.pow(particle.x - p2.x, 2) + Math.pow(particle.y - p2.y, 2));
            
            if (distance < connectionDistance) {
              const opacity = (1 - distance / connectionDistance) * 0.1 * particle.depth * p2.depth;
              connections.push({p1: index, p2: j, opacity});
            }
          }
        });
        
        // Draw connections
        if (connections.length > 0) {
          ctx.beginPath();
          connections.forEach(({p1, p2, opacity}) => {
            ctx.strokeStyle = `rgba(250, 204, 21, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[p1].x, particles[p1].y);
            ctx.lineTo(particles[p2].x, particles[p2].y);
          });
          ctx.stroke();
        }
        
        // Draw individual particles
        particles.forEach(particle => {
          const pulsingOpacity = particle.opacity * (0.9 + Math.sin(particle.pulse) * 0.1);
          
          // Draw enhanced glow effect - optimization: only draw if visible
          if (pulsingOpacity > 0.01) {
            // Use cached gradient for better performance (skipping this for now as it's complex to implement)
            const gradient = ctx.createRadialGradient(
              particle.x, 
              particle.y, 
              0, 
              particle.x, 
              particle.y, 
              particle.size * 8
            );
            const baseColor = particle.color.replace('1)', `${pulsingOpacity * 0.6})`);
            gradient.addColorStop(0, baseColor);
            gradient.addColorStop(1, particle.color.replace('1)', '0)'));
            
            ctx.beginPath();
            ctx.fillStyle = gradient;
            ctx.arc(particle.x, particle.y, particle.size * 8, 0, Math.PI * 2);
            ctx.fill();
            
            // Draw core of particle
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fillStyle = particle.color.replace('1)', `${pulsingOpacity})`);
            ctx.fill();
          }
        });
      }
      
      animationRef.current = requestAnimationFrame(drawParticles);
    };
    
    animationRef.current = requestAnimationFrame(drawParticles);
    
    return () => {
      cancelAnimationFrame(animationRef.current);
    };
  }, []);
  
  return (
    <canvas 
      ref={canvasRef} 
      className={`absolute inset-0 z-0 pointer-events-none will-change-transform ${className}`}
    />
  );
};

export default ParticleEffect;
