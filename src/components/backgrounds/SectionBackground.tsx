
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SectionBackgroundProps {
  children: React.ReactNode;
  className?: string;
  pattern: 'hexagon' | 'diagonal' | 'circuit' | 'dots' | 'flow' | 'topo' | 'none';
  baseColor?: string;
  accentColor?: string;
  withGrain?: boolean;
  withTransition?: boolean;
}

export const SectionBackground: React.FC<SectionBackgroundProps> = ({
  children,
  className,
  pattern,
  baseColor = 'from-black to-gray-900',
  accentColor = 'rgba(250, 204, 21, 0.05)', // amber with low opacity
  withGrain = true,
  withTransition = true,
}) => {
  // Generate unique pattern IDs to prevent conflicts
  const patternId = `pattern-${pattern}-${Math.random().toString(36).substring(2, 9)}`;

  // SVG patterns for different section backgrounds
  const getPatternBackground = () => {
    switch (pattern) {
      case 'hexagon':
        return (
          <div className="absolute inset-0 pointer-events-none opacity-[0.06]" aria-hidden="true">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
              <defs>
                <pattern id={patternId} width="50" height="43.4" patternUnits="userSpaceOnUse" patternTransform="scale(1.5) rotate(0)">
                  <path
                    d="M25,0 L50,14.5 L50,38.5 L25,50 L0,38.5 L0,14.5 Z"
                    fill="none"
                    stroke={accentColor}
                    strokeWidth="0.5"
                    strokeOpacity="0.5"
                  />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill={`url(#${patternId})`} />
            </svg>
          </div>
        );

      case 'diagonal':
        return (
          <div className="absolute inset-0 pointer-events-none opacity-[0.04]" aria-hidden="true">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
              <defs>
                <pattern id={patternId} width="40" height="40" patternUnits="userSpaceOnUse">
                  <path
                    d="M-10,10 L30,-30 M0,40 L40,0 M30,70 L70,30"
                    stroke={accentColor}
                    strokeWidth="0.5"
                  />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill={`url(#${patternId})`} />
            </svg>
          </div>
        );

      case 'circuit':
        return (
          <div className="absolute inset-0 pointer-events-none opacity-[0.05]" aria-hidden="true">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
              <defs>
                <pattern id={patternId} width="100" height="100" patternUnits="userSpaceOnUse">
                  <circle cx="10" cy="10" r="1.5" fill={accentColor} />
                  <circle cx="50" cy="90" r="1.5" fill={accentColor} />
                  <circle cx="90" cy="50" r="1.5" fill={accentColor} />
                  <circle cx="70" cy="30" r="1.5" fill={accentColor} />
                  <circle cx="30" cy="70" r="1.5" fill={accentColor} />
                  <line x1="10" y1="10" x2="50" y2="90" stroke={accentColor} strokeWidth="0.5" />
                  <line x1="50" y1="90" x2="90" y2="50" stroke={accentColor} strokeWidth="0.5" />
                  <line x1="90" y1="50" x2="70" y2="30" stroke={accentColor} strokeWidth="0.5" />
                  <line x1="70" y1="30" x2="30" y2="70" stroke={accentColor} strokeWidth="0.5" />
                  <line x1="30" y1="70" x2="10" y2="10" stroke={accentColor} strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill={`url(#${patternId})`} />
            </svg>
          </div>
        );

      case 'dots':
        return (
          <div className="absolute inset-0 pointer-events-none opacity-[0.04]" aria-hidden="true">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
              <defs>
                <pattern id={patternId} width="20" height="20" patternUnits="userSpaceOnUse">
                  <circle cx="2" cy="2" r="1" fill={accentColor} />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill={`url(#${patternId})`} />
            </svg>
          </div>
        );

      case 'flow':
        return (
          <div className="absolute inset-0 pointer-events-none opacity-[0.04]" aria-hidden="true">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
              <defs>
                <pattern id={patternId} width="200" height="200" patternUnits="userSpaceOnUse">
                  <path
                    d="M0,100 C50,50 100,150 200,100"
                    fill="none"
                    stroke={accentColor}
                    strokeWidth="0.5"
                  />
                  <path
                    d="M0,150 C50,200 150,0 200,50"
                    fill="none"
                    stroke={accentColor}
                    strokeWidth="0.5"
                  />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill={`url(#${patternId})`} />
            </svg>
          </div>
        );

      case 'topo':
        return (
          <div className="absolute inset-0 pointer-events-none opacity-[0.06]" aria-hidden="true">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
              <defs>
                <pattern id={patternId} width="200" height="200" patternUnits="userSpaceOnUse">
                  {/* Topographic contour lines */}
                  {[40, 80, 120, 160].map((radius, index) => (
                    <circle 
                      key={index}
                      cx="100" 
                      cy="100" 
                      r={radius} 
                      fill="none" 
                      stroke={accentColor} 
                      strokeWidth="0.5" 
                    />
                  ))}
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill={`url(#${patternId})`} />
            </svg>
          </div>
        );

      case 'none':
      default:
        return null;
    }
  };

  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <div className={cn(`relative bg-gradient-to-b ${baseColor}`, className)}>
      {withTransition && (
        <>
          <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-black to-transparent z-10 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black to-transparent z-10 pointer-events-none"></div>
        </>
      )}
      
      {/* Pattern background */}
      {pattern !== 'none' && getPatternBackground()}
      
      {/* Grain effect */}
      {withGrain && <div className="absolute inset-0 grain-effect pointer-events-none z-0"></div>}
      
      {/* Content with fade-in animation */}
      <motion.div 
        className="relative z-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInVariants}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default SectionBackground;
