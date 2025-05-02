
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface GridBackgroundProps {
  color?: string;
  animated?: boolean;
  className?: string;
  spacing?: number;
  opacity?: number;
}

const GridBackground: React.FC<GridBackgroundProps> = ({ 
  color = 'rgba(250, 204, 21, 0.07)',
  animated = true, 
  className = '',
  spacing = 30,
  opacity = 0.1
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>(0);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let animationPhase = 0;
    
    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
    };
    
    const drawGrid = (phase = 0) => {
      if (!ctx) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Calculate dynamic opacity if animated
      const dynamicOpacity = animated 
        ? opacity * (0.8 + 0.2 * Math.sin(phase * 0.5))
        : opacity;
        
      const parsedColor = color.replace(/[\d.]+\)$/, `${dynamicOpacity})`);
      
      ctx.strokeStyle = parsedColor;
      ctx.lineWidth = 0.5;
      
      // Vertical lines
      for (let x = 0; x <= canvas.width; x += spacing) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      
      // Horizontal lines
      for (let y = 0; y <= canvas.height; y += spacing) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
      
      if (animated) {
        animationPhase += 0.005;
        animationFrameRef.current = requestAnimationFrame(() => drawGrid(animationPhase));
      }
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    drawGrid();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, [color, animated, spacing, opacity]);
  
  return (
    <canvas 
      ref={canvasRef} 
      className={`absolute inset-0 z-0 pointer-events-none ${className}`}
    />
  );
};

export default GridBackground;
