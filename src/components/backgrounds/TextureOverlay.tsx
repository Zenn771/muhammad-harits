
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
  const lastUpdateTimeRef = useRef<number>(0);
  
  useEffect(() => {
    if (!animated) return;
    
    const canvas = noiseCanvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;
    
    // Resize canvas to match window dimensions but at lower resolution for performance
    const resizeCanvas = () => {
      // Use smaller canvas size for better performance (1/2 resolution)
      const scale = 0.5;
      canvas.width = window.innerWidth * scale;
      canvas.height = window.innerHeight * scale;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
    };
    
    // Generate animated noise with better performance
    const generateNoise = (timestamp: number) => {
      // Only update every 100ms (10fps) for better performance
      if (timestamp - lastUpdateTimeRef.current >= 100) {
        lastUpdateTimeRef.current = timestamp;
        
        const imageData = ctx.createImageData(canvas.width, canvas.height);
        const data = imageData.data;
        
        // Optimize by updating fewer pixels (every 2nd pixel)
        for (let i = 0; i < data.length; i += 8) {
          // Random grayscale value
          const value = Math.random() * 255;
          
          // Apply the value to RGB channels
          data[i] = value;     // R
          data[i + 1] = value; // G
          data[i + 2] = value; // B
          data[i + 3] = Math.random() * 20; // Very low alpha for subtle effect
        }
        
        ctx.putImageData(imageData, 0, 0);
      }
      
      // Continue animation loop
      requestAnimationRef.current = requestAnimationFrame(generateNoise);
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    requestAnimationRef.current = requestAnimationFrame(generateNoise);
    
    return () => {
      cancelAnimationFrame(requestAnimationRef.current);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [animated]);

  return (
    <div className={`absolute inset-0 pointer-events-none z-10 ${className}`}>
      {/* Static grain effect with will-change for GPU acceleration */}
      <motion.div 
        className="absolute inset-0 grain-effect"
        style={{ 
          opacity: grainOpacity,
          willChange: 'transform'
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: grainOpacity }}
        transition={{ duration: 1 }}
      />
      
      {/* Animated noise texture */}
      <canvas 
        ref={noiseCanvasRef} 
        className="absolute inset-0 mix-blend-soft-light will-change-transform" 
        style={{ opacity: noiseOpacity }}
      />
      
      {/* Subtle fog/atmospheric effect */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent to-black/20 mix-blend-multiply" />
    </div>
  );
};

export default TextureOverlay;
