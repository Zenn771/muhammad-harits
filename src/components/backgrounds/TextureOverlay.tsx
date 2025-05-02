
import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface TextureOverlayProps {
  grainOpacity?: number;
  noiseOpacity?: number;
  animated?: boolean;
  className?: string;
}

const TextureOverlay: React.FC<TextureOverlayProps> = ({
  grainOpacity = 0.02, // Reduced from 0.03
  noiseOpacity = 0.01, // Reduced from 0.02
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
    
    // Generate animated noise with better performance - reduced intensity
    const generateNoise = (timestamp: number) => {
      // Only update every 150ms (6.67fps) for better performance and smoother appearance
      if (timestamp - lastUpdateTimeRef.current >= 150) {
        lastUpdateTimeRef.current = timestamp;
        
        const imageData = ctx.createImageData(canvas.width, canvas.height);
        const data = imageData.data;
        
        // Optimize by updating fewer pixels (every 2nd pixel)
        for (let i = 0; i < data.length; i += 8) {
          // Random grayscale value with reduced intensity
          const value = Math.random() * 200; // Reduced intensity
          
          // Apply the value to RGB channels
          data[i] = value;     // R
          data[i + 1] = value; // G
          data[i + 2] = value; // B
          data[i + 3] = Math.random() * 10; // Very low alpha for more subtle effect (reduced from 20)
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
      {/* Static grain effect with will-change for GPU acceleration - reduced opacity */}
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
      
      {/* Subtle fog/atmospheric effect - reduced intensity */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent to-black/10 mix-blend-multiply" />
    </div>
  );
};

export default TextureOverlay;
