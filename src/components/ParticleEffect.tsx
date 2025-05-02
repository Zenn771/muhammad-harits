
import React, { useEffect, useRef } from 'react';

interface ParticleEffectProps {
  count?: number;
  className?: string;
}

const ParticleEffect: React.FC<ParticleEffectProps> = ({ count = 15, className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      pulse: number;
      pulseSpeed: number;
    }> = [];
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    const initializeParticles = () => {
      particles.length = 0;
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 5 + 2,  // Slightly larger particles
          speedX: Math.random() * 0.05 - 0.025,  // Much slower movement
          speedY: Math.random() * 0.05 - 0.025,  // Much slower movement
          opacity: Math.random() * 0.4 + 0.1,
          pulse: 0,
          pulseSpeed: Math.random() * 0.01 + 0.005  // Very slow pulse
        });
      }
    };
    
    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        // Update pulse value for opacity variation - much subtler
        particle.pulse += particle.pulseSpeed;
        if (particle.pulse > Math.PI * 2) particle.pulse = 0;
        
        // Calculate pulsing opacity - more subtle
        const pulsingOpacity = particle.opacity * (0.9 + Math.sin(particle.pulse) * 0.1);
        
        // Draw glow effect with larger radius
        const gradient = ctx.createRadialGradient(
          particle.x, 
          particle.y, 
          0, 
          particle.x, 
          particle.y, 
          particle.size * 6  // Enhanced glow radius
        );
        gradient.addColorStop(0, `rgba(250, 204, 21, ${pulsingOpacity * 0.6})`);
        gradient.addColorStop(1, `rgba(250, 204, 21, 0)`);
        
        ctx.beginPath();
        ctx.fillStyle = gradient;
        ctx.arc(particle.x, particle.y, particle.size * 6, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw core of particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(250, 204, 21, ${pulsingOpacity})`;
        ctx.fill();
        
        // Update position - very slow movement
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
      });
      
      requestAnimationFrame(drawParticles);
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    initializeParticles();
    drawParticles();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [count]);
  
  return (
    <canvas 
      ref={canvasRef} 
      className={`absolute inset-0 z-0 pointer-events-none ${className}`} 
    />
  );
};

export default ParticleEffect;
