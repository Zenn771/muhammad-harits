
import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ProjectCardProps {
  title: string;
  category: string;
  index: number;
  className?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ 
  title, 
  category, 
  index,
  className
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Handle mouse movement for parallax effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    
    // Calculate mouse position relative to card center
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    // Calculate rotation (limited range)
    const rotateX = -(y / rect.height) * 10; // -5 to 5 degrees
    const rotateY = (x / rect.width) * 10;   // -5 to 5 degrees
    
    setRotation({ x: rotateX, y: rotateY });
    setMousePosition({ x, y });
  };

  // Reset card position when not hovering
  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotation({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={cardRef}
      className={cn(
        "relative group aspect-[4/3] rounded-xl overflow-hidden",
        "transition-all duration-300",
        "transform-gpu perspective-1000",
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5,
        delay: index * 0.1
      }}
      viewport={{ once: true, margin: "-50px" }}
      style={{
        transformStyle: 'preserve-3d',
        transform: isHovered ? `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) translateZ(10px)` : 'perspective(1000px)',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Pin element at top */}
      <div 
        className={cn(
          "absolute top-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full z-10",
          "bg-gradient-to-br from-amber-300 to-amber-500 shadow-lg",
          "transform-gpu transition-all duration-300",
          isHovered ? "scale-125" : "scale-100"
        )}
        style={{
          transformStyle: 'preserve-3d',
          transform: isHovered ? 'translateZ(20px)' : 'translateZ(5px)',
        }}
      />
      
      {/* Particle effects that appear on hover */}
      {isHovered && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div 
              key={i}
              className="absolute w-1 h-1 rounded-full bg-amber-300/40"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                boxShadow: '0 0 8px 1px rgba(250, 204, 21, 0.6)',
                animation: `float ${2 + Math.random() * 3}s ease-in-out infinite alternate`,
              }}
            />
          ))}
        </div>
      )}
      
      {/* Main card content */}
      <div 
        className={cn(
          "vintage-card group relative w-full h-full overflow-hidden",
          "bg-gradient-to-br from-amber-900/20 to-black/60",
          "border border-amber-200/20 transition-all duration-500",
          isHovered ? "border-amber-200/40" : "border-amber-200/20"
        )}
        style={{
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Grain texture */}
        <div className="absolute inset-0 grain-texture opacity-20"></div>
        
        {/* Glow effect on hover */}
        <div 
          className={cn(
            "absolute inset-0 opacity-0 transition-opacity duration-700 pointer-events-none",
            isHovered ? "opacity-100" : "opacity-0"
          )}
          style={{
            background: `radial-gradient(circle at ${mousePosition.x + 50}% ${mousePosition.y + 50}%, rgba(250, 204, 21, 0.15) 0%, transparent 70%)`,
            boxShadow: isHovered ? 'inset 0 0 20px rgba(250, 204, 21, 0.1)' : 'none'
          }}
        />
        
        {/* Card content with 3D layer effect */}
        <div 
          className="flex flex-col justify-end p-5 h-full w-full"
          style={{
            transformStyle: 'preserve-3d',
            transform: isHovered ? 'translateZ(20px)' : 'translateZ(0)',
            transition: 'transform 0.3s ease-out',
          }}
        >
          <div className="mt-auto transform-gpu transition-all duration-300" style={{
            transform: isHovered ? 'translateZ(30px)' : 'translateZ(0)',
          }}>
            <h3 
              className={cn(
                "text-xl font-semibold text-amber-100/90 transition-all duration-300",
                isHovered ? "text-amber-100" : "text-amber-100/80"
              )}
            >
              {title}
            </h3>
            <p 
              className={cn(
                "mt-2 transition-all duration-300",
                isHovered ? "text-amber-200/80" : "text-amber-200/50",
                "text-sm"
              )}
            >
              {category}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
