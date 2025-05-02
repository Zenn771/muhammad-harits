
import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { cn } from "@/lib/utils";

interface BentoCardProps {
  title: string;
  description: string;
  className?: string;
  icon?: React.ReactNode;
  gradient?: string;
  delay?: number;
  sizeClasses?: string;
  children?: React.ReactNode;
  disableEffects?: boolean; // New prop to disable animations and 3D effects
  quote?: {
    text: string;
    author: string;
    source: string;
  };
}

const BentoCard = ({
  title,
  description,
  className,
  icon,
  gradient = "from-blue-800/25 to-purple-800/10",
  delay = 0,
  sizeClasses = "col-span-1 row-span-1",
  children,
  disableEffects = false, // Default to having effects enabled
  quote
}: BentoCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  // Animation for the icon
  const iconControls = useAnimation();
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  // Animation sequence for icon on hover
  useEffect(() => {
    if (isHovered && !disableEffects) {
      iconControls.start({
        scale: [1, 1.2, 1],
        rotate: [0, 10, -10, 0],
        transition: { duration: 0.5 }
      });
    }
  }, [isHovered, iconControls, disableEffects]);

  // If effects are disabled, use a div instead of motion.div for the card
  if (disableEffects) {
    return (
      <div
        ref={cardRef}
        className={cn(
          "group relative overflow-hidden rounded-xl bg-gradient-to-br border border-white/10 p-5 md:p-6",
          gradient,
          sizeClasses,
          className
        )}
        style={{
          position: 'relative'
        }}
      >
        {/* Card-specific grain texture overlay */}
        <div 
          className="absolute inset-0 pointer-events-none z-0 grain-effect"
          style={{
            opacity: 0.1,
            mixBlendMode: 'overlay',
          }}
        />
        
        <div className="flex flex-col h-full relative z-10">
          <div className="flex items-center mb-4">
            <div 
              className="p-2 rounded-full bg-white/10 backdrop-blur-sm mr-3"
            >
              {icon}
            </div>
            <h3 className="text-xl font-semibold text-white/90">
              {title}
            </h3>
          </div>
          
          <p className="text-white/70 text-sm leading-relaxed">
            {description}
          </p>
          
          {/* Display quote if available */}
          {quote && (
            <div className="mt-4 border-l-2 border-white/20 pl-3 italic">
              <p className="text-white/80 text-sm">"{quote.text}"</p>
              <p className="text-white/60 text-xs mt-1">— {quote.author}, <span className="font-light">{quote.source}</span></p>
            </div>
          )}
          
          {/* Add the children content if provided */}
          {children && (
            <div className="mt-4">
              {children}
            </div>
          )}
          
          <div className="mt-auto pt-4">
            <div className="h-1 w-12 bg-white/20 rounded-full" />
          </div>
        </div>
      </div>
    );
  }

  // Original animated version with 3D effects when disableEffects is false
  return (
    <motion.div
      ref={cardRef}
      className={cn(
        "group relative overflow-hidden rounded-xl bg-gradient-to-br border border-white/10 p-5 md:p-6",
        gradient,
        sizeClasses,
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay: delay * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: 'relative',
        boxShadow: isHovered ? "0 10px 30px rgba(250, 204, 21, 0.1)" : "none"
      }}
      whileHover={{ 
        scale: 1.02,
        transition: { duration: 0.3 }
      }}
    >
      {/* Card-specific grain texture overlay - now always active */}
      <div 
        className="absolute inset-0 pointer-events-none z-0 grain-effect"
        style={{
          opacity: isHovered ? 0.15 : 0.1,
          mixBlendMode: 'overlay',
          transition: 'opacity 0.3s ease',
        }}
      />
      
      {/* Enhanced hover glow effect */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-20 transition-opacity duration-500 -z-10" 
        animate={{ 
          opacity: isHovered ? 0.25 : 0, 
          boxShadow: isHovered ? "inset 0 0 30px rgba(250, 204, 21, 0.3)" : "none" 
        }}
      />
      
      <div className="flex flex-col h-full relative z-10">
        <div className="flex items-center mb-4">
          <motion.div 
            className="p-2 rounded-full bg-white/10 backdrop-blur-sm mr-3"
            animate={iconControls}
            style={{ transformStyle: "preserve-3d", transformOrigin: "center center" }}
          >
            {icon}
          </motion.div>
          <motion.h3 
            className="text-xl font-semibold text-white/90"
            initial={{ opacity: 0.9 }}
            animate={{ opacity: isHovered ? 1 : 0.9 }}
            transition={{ duration: 0.3 }}
          >
            {title}
          </motion.h3>
        </div>
        
        <motion.p 
          className="text-white/70 text-sm leading-relaxed"
          style={{ transformStyle: "preserve-3d", transform: "translateZ(20px)" }}
          animate={{ opacity: isHovered ? 0.9 : 0.7 }}
          transition={{ duration: 0.3 }}
        >
          {description}
        </motion.p>
        
        {/* Display quote if available */}
        {quote && (
          <motion.div 
            className="mt-4 border-l-2 border-white/20 pl-3 italic"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -10 }}
            transition={{ duration: 0.5, delay: delay * 0.1 + 0.2 }}
          >
            <p className="text-white/80 text-sm">"{quote.text}"</p>
            <p className="text-white/60 text-xs mt-1">— {quote.author}, <span className="font-light">{quote.source}</span></p>
          </motion.div>
        )}
        
        {/* Add the children content if provided */}
        {children && (
          <motion.div
            className="mt-4"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.95 }}
            transition={{ duration: 0.5, delay: delay * 0.1 + 0.3 }}
          >
            {children}
          </motion.div>
        )}
        
        <motion.div 
          className="mt-auto pt-4"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <motion.div 
            className="h-1 w-1 w-12 bg-white/20 rounded-full"
            animate={{ 
              width: isHovered ? 40 : 12, 
              backgroundColor: isHovered ? "rgba(250, 204, 21, 0.4)" : "rgba(255, 255, 255, 0.2)" 
            }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>

        {/* Floating particles that appear on hover */}
        {isHovered && (
          <>
            <motion.div
              className="absolute w-2 h-2 rounded-full bg-amber-400/30"
              initial={{ x: '50%', y: '100%', scale: 0, opacity: 0 }}
              animate={{ 
                x: ['50%', '20%', '70%', '30%'],
                y: ['100%', '20%', '40%', '-20%'],
                scale: [0, 1, 1.5, 0],
                opacity: [0, 0.8, 0.8, 0]
              }}
              transition={{ duration: 3, repeat: Infinity, repeatType: "loop" }}
            />
            <motion.div
              className="absolute w-1.5 h-1.5 rounded-full bg-white/30"
              initial={{ x: '20%', y: '80%', scale: 0, opacity: 0 }}
              animate={{ 
                x: ['20%', '70%', '40%', '60%'],
                y: ['80%', '40%', '60%', '10%'],
                scale: [0, 0.6, 1, 0],
                opacity: [0, 0.6, 0.6, 0]
              }}
              transition={{ duration: 2.5, delay: 0.3, repeat: Infinity, repeatType: "loop" }}
            />
          </>
        )}
      </div>
    </motion.div>
  );
};

export default BentoCard;
