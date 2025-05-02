
import React, { useEffect, useRef } from 'react';

interface ShootingStarsProps {
  className?: string;
  starCount?: number;
  starColor?: string;
  frequency?: number;
}

const ShootingStars: React.FC<ShootingStarsProps> = ({
  className = "",
  starCount = 3,
  starColor = "rgba(250, 204, 21, 0.8)",
  frequency = 6000 // milliseconds between shooting star appearances
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<{
    x: number;
    y: number;
    length: number;
    speed: number;
    active: boolean;
    progress: number;
  }[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Initialize canvas size
    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
    };

    // Initialize stars
    const initStars = () => {
      starsRef.current = Array(starCount).fill(null).map(() => ({
        x: Math.random() * canvas.width * 1.5,
        y: Math.random() * canvas.height * 0.3, // Only in top third of screen
        length: Math.random() * 200 + 100,
        speed: Math.random() * 10 + 5,
        active: false,
        progress: 0
      }));
    };

    // Activate a random star
    const activateRandomStar = () => {
      const inactiveStars = starsRef.current.filter(star => !star.active);
      if (inactiveStars.length > 0) {
        const randomStar = inactiveStars[Math.floor(Math.random() * inactiveStars.length)];
        randomStar.active = true;
        randomStar.progress = 0;
        randomStar.x = Math.random() * canvas.width * 1.5;
        randomStar.y = Math.random() * canvas.height * 0.3;
      }
    };

    // Draw shooting stars
    const drawStars = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      starsRef.current.forEach(star => {
        if (!star.active) return;
        
        // Calculate current position based on progress
        const angle = Math.PI / 6; // 30 degrees
        const progress = Math.min(star.progress, 1);
        const currentX = star.x - Math.cos(angle) * star.length * progress;
        const currentY = star.y + Math.sin(angle) * star.length * progress;
        
        // Draw shooting star
        ctx.beginPath();
        ctx.moveTo(star.x, star.y);
        ctx.lineTo(currentX, currentY);
        
        // Create gradient for tail
        const gradient = ctx.createLinearGradient(star.x, star.y, currentX, currentY);
        gradient.addColorStop(0, "rgba(255, 255, 255, 0)");
        gradient.addColorStop(0.3, starColor);
        gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
        
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Draw brighter point at the head
        ctx.beginPath();
        ctx.arc(currentX, currentY, 2, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
        ctx.fill();
        
        // Update progress
        star.progress += 0.02;
        
        // Deactivate if complete
        if (star.progress >= 1.2) {
          star.active = false;
        }
      });
    };

    // Animation loop
    let lastActivationTime = Date.now();
    const animate = () => {
      // Activate stars at random intervals
      const now = Date.now();
      if (now - lastActivationTime > frequency) {
        activateRandomStar();
        lastActivationTime = now;
        // Randomize next activation time
        frequency = Math.random() * 4000 + 3000;
      }
      
      drawStars();
      requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    initStars();
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [starCount, starColor, frequency]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none z-[3] ${className}`}
    />
  );
};

export default ShootingStars;
