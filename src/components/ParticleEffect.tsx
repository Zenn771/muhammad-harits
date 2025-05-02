
import React, { useEffect, useRef, useState } from 'react';

interface ParticleEffectProps {
  count?: number;
  className?: string;
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
  className = ''
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const animationRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);
  
  // Initialize and handle window resize
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      setDimensions({ width: canvas.width, height: canvas.height });
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
  
  // Animation loop - removed cursor interaction
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw connections between close particles (constellation effect)
      ctx.beginPath();
      for (let i = 0; i < particlesRef.current.length; i++) {
        const p1 = particlesRef.current[i];
        
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const p2 = particlesRef.current[j];
          const distance = Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
          
          // Only connect particles that are close enough
          if (distance < 150) {
            const opacity = (1 - distance / 150) * 0.1 * p1.depth * p2.depth;
            ctx.strokeStyle = `rgba(250, 204, 21, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
          }
        }
      }
      ctx.stroke();
      
      // Draw individual particles
      particlesRef.current.forEach((particle, index) => {
        // Update pulse value for opacity variation
        particle.pulse += particle.pulseSpeed;
        if (particle.pulse > Math.PI * 2) particle.pulse = 0;
        
        // Calculate pulsing opacity
        const pulsingOpacity = particle.opacity * (0.9 + Math.sin(particle.pulse) * 0.1);
        
        // Add some randomness to particle movement for ambient motion
        const randomFactor = 0.001;
        particle.speedX += (Math.random() - 0.5) * randomFactor;
        particle.speedY += (Math.random() - 0.5) * randomFactor;
        
        // Add some drag to prevent excessive speed
        particle.speedX *= 0.99;
        particle.speedY *= 0.99;
        
        // Draw enhanced glow effect
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
        
        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
        
        // Update the reference array
        particlesRef.current[index] = particle;
      });
      
      animationRef.current = requestAnimationFrame(drawParticles);
    };
    
    drawParticles();
    
    return () => {
      cancelAnimationFrame(animationRef.current);
    };
  }, [dimensions]);
  
  return (
    <canvas 
      ref={canvasRef} 
      className={`absolute inset-0 z-0 pointer-events-none ${className}`} 
    />
  );
};

export default ParticleEffect;
