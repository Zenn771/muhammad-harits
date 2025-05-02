
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
  const animationRef = useRef<number>(0);
  const frequencyRef = useRef<number>(frequency);
  const lastActivationRef = useRef<number>(Date.now());

  useEffect(() => {
    // Update frequency ref when prop changes
    frequencyRef.current = frequency;
  }, [frequency]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Initialize canvas size with proper cleanup
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

    // Activate a random star with safety limit
    const activateRandomStar = () => {
      // Count active stars to ensure we don't have too many
      const activeStars = starsRef.current.filter(star => star.active).length;
      
      // Only activate a new star if we're below the limit
      if (activeStars < Math.min(starCount, 3)) {
        const inactiveStars = starsRef.current.filter(star => !star.active);
        if (inactiveStars.length > 0) {
          const randomStar = inactiveStars[Math.floor(Math.random() * inactiveStars.length)];
          randomStar.active = true;
          randomStar.progress = 0;
          randomStar.x = Math.random() * canvas.width * 1.5;
          randomStar.y = Math.random() * canvas.height * 0.3;
        }
      }
    };

    // Draw shooting stars with proper cleanup
    const drawStars = () => {
      // Clear the entire canvas on each frame
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

    // Animation loop with proper timing
    const animate = (timestamp: number) => {
      // Activate stars at controlled intervals using the ref for frequency
      const now = timestamp;
      if (now - lastActivationRef.current > frequencyRef.current) {
        activateRandomStar();
        lastActivationRef.current = now;
        // Randomize next activation time within reasonable bounds
        frequencyRef.current = Math.random() * 4000 + 3000;
      }
      
      drawStars();
      animationRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    initStars();
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      // Proper cleanup to prevent stacking
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [starCount, starColor]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none z-[3] ${className}`}
    />
  );
};

export default ShootingStars;
