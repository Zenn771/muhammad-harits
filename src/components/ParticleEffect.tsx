
import React, { useEffect, useRef } from 'react';

interface ParticleEffectProps {
  count?: number;
  className?: string;
}

const ParticleEffect: React.FC<ParticleEffectProps> = ({ count = 30, className = '' }) => {
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
          size: Math.random() * 4 + 1.5,  // Slightly larger particles
          speedX: Math.random() * 0.4 - 0.2,  // Slower movement
          speedY: Math.random() * 0.4 - 0.2,  // Slower movement
          opacity: Math.random() * 0.5 + 0.1,
          pulse: 0,
          pulseSpeed: Math.random() * 0.03 + 0.01  // Slower pulse
        });
      }
    };
    
    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        // Update pulse value for opacity variation
        particle.pulse += particle.pulseSpeed;
        if (particle.pulse > Math.PI * 2) particle.pulse = 0;
        
        // Calculate pulsing opacity
        const pulsingOpacity = particle.opacity * (0.7 + Math.sin(particle.pulse) * 0.3);
        
        // Draw glow effect
        const gradient = ctx.createRadialGradient(
          particle.x, 
          particle.y, 
          0, 
          particle.x, 
          particle.y, 
          particle.size * 5  // Enhanced glow radius
        );
        gradient.addColorStop(0, `rgba(250, 204, 21, ${pulsingOpacity * 0.8})`);
        gradient.addColorStop(1, `rgba(250, 204, 21, 0)`);
        
        ctx.beginPath();
        ctx.fillStyle = gradient;
        ctx.arc(particle.x, particle.y, particle.size * 5, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw core of particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(250, 204, 21, ${pulsingOpacity})`;
        ctx.fill();
        
        // Update position
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
