
import React from 'react';
import { motion } from 'framer-motion';

interface SpotlightProps {
  className?: string;
  size?: number;
  intensity?: number;
  color?: string;
}

const EnhancedSpotlightEffect: React.FC<SpotlightProps> = ({
  className = "",
  size = 600,
  intensity = 0.1, // Reduced intensity
  color = "255, 255, 255" // Changed from amber to white for a more subtle effect
}) => {
  // Fixed positions for spotlights instead of following cursor
  const primaryPosition = { x: '50%', y: '40%' }; // Center-ish of the viewport
  const secondaryPosition = { x: '40%', y: '30%' }; // Slightly offset from primary
  
  return (
    <div className={`fixed inset-0 pointer-events-none overflow-hidden ${className}`}>
      {/* Primary spotlight with fixed position */}
      <motion.div
        className="absolute pointer-events-none"
        animate={{
          left: primaryPosition.x,
          top: primaryPosition.y,
          width: size,
          height: size,
          background: `radial-gradient(circle at center, rgba(${color}, ${intensity}) 0%, rgba(0,0,0,0) 70%)`,
          transform: "translate(-50%, -50%)",
          transition: { type: 'spring', stiffness: 100, damping: 30 }
        }}
        style={{ willChange: 'transform' }}
      />
      
      {/* Secondary spotlight (smaller and more intense) with fixed position */}
      <motion.div
        className="absolute pointer-events-none"
        animate={{
          left: secondaryPosition.x,
          top: secondaryPosition.y,
          width: size / 2,
          height: size / 2,
          background: `radial-gradient(circle at center, rgba(${color}, ${intensity * 1.2}) 0%, rgba(0,0,0,0) 70%)`, // Reduced intensity multiplier
          transform: "translate(-50%, -50%)",
          transition: { type: 'spring', stiffness: 120, damping: 25 }
        }}
        style={{ willChange: 'transform' }}
      />
    </div>
  );
};

export default EnhancedSpotlightEffect;
