
import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface TextureOverlayProps {
  grainOpacity?: number;
  noiseOpacity?: number;
  animated?: boolean;
  className?: string;
}

const TextureOverlay: React.FC<TextureOverlayProps> = ({
  grainOpacity = 0.03,
  noiseOpacity = 0.02,
  animated = true,
  className = ''
}) => {
  const noiseCanvasRef = useRef<HTMLCanvasElement>(null);
  const requestAnimationRef = useRef<number>(0);
  
  useEffect(() => {
    if (!animated) return;
    
    const canvas = noiseCanvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Resize canvas to match window dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    // Generate animated noise
    const generateNoise = () => {
      const imageData = ctx.createImageData(canvas.width, canvas.height);
      const data = imageData.data;
      
      for (let i = 0; i < data.length; i += 4) {
        // Random grayscale value
        const value = Math.random() * 255;
        
        // Apply the value to RGB channels
        data[i] = value;     // R
        data[i + 1] = value; // G
        data[i + 2] = value; // B
        data[i + 3] = Math.random() * 20; // Very low alpha for subtle effect
      }
      
      ctx.putImageData(imageData, 0, 0);
      
      // Continue animation loop
      requestAnimationRef.current = requestAnimationFrame(generateNoise);
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    generateNoise();
    
    return () => {
      cancelAnimationFrame(requestAnimationRef.current);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [animated]);

  return (
    <div className={`absolute inset-0 pointer-events-none z-10 ${className}`}>
      {/* Static grain effect */}
      <motion.div 
        className="absolute inset-0 grain-effect"
        style={{ opacity: grainOpacity }}
        initial={{ opacity: 0 }}
        animate={{ opacity: grainOpacity }}
        transition={{ duration: 1 }}
      />
      
      {/* Animated noise texture */}
      <canvas 
        ref={noiseCanvasRef} 
        className="absolute inset-0 mix-blend-soft-light" 
        style={{ opacity: noiseOpacity }}
      />
      
      {/* Subtle fog/atmospheric effect */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent to-black/20 mix-blend-multiply" />
    </div>
  );
};

export default TextureOverlay;
