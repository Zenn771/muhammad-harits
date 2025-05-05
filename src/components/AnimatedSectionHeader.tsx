
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface AnimatedSectionHeaderProps {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  className?: string;
  alignment?: 'left' | 'center' | 'right';
  titleSize?: 'sm' | 'md' | 'lg' | 'xl';
  accentColor?: string;
}

const AnimatedSectionHeader: React.FC<AnimatedSectionHeaderProps> = ({
  title,
  subtitle,
  eyebrow,
  className,
  alignment = 'center',
  titleSize = 'lg',
  accentColor = 'amber',
}) => {
  // Mapping for alignment classes
  const alignmentClasses = {
    'left': 'text-left',
    'center': 'text-center mx-auto',
    'right': 'text-right ml-auto',
  };

  // Mapping for title size classes
  const titleSizeClasses = {
    'sm': 'text-2xl md:text-3xl',
    'md': 'text-3xl md:text-4xl',
    'lg': 'text-4xl md:text-5xl',
    'xl': 'text-5xl md:text-6xl',
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const childVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <motion.div
      className={cn(
        'max-w-3xl mb-12',
        alignmentClasses[alignment],
        className
      )}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={containerVariants}
    >
      {eyebrow && (
        <motion.p 
          className={`text-${accentColor}-400 text-sm uppercase tracking-widest font-medium mb-2`}
          variants={childVariants}
        >
          {eyebrow}
        </motion.p>
      )}
      
      <motion.h2 
        className={cn(
          `font-bold text-white mb-4 tracking-tight`,
          titleSizeClasses[titleSize]
        )}
        variants={childVariants}
      >
        {title}
      </motion.h2>
      
      {subtitle && (
        <motion.p 
          className="text-lg text-white/70"
          variants={childVariants}
        >
          {subtitle}
        </motion.p>
      )}
      
      {/* Decorative underline */}
      <motion.div
        className={`h-1 w-20 bg-gradient-to-r from-${accentColor}-400 to-${accentColor}-600 rounded-full mt-6 mb-2`}
        style={{ marginLeft: alignment === 'center' ? 'auto' : '', marginRight: alignment === 'center' ? 'auto' : '' }}
        variants={childVariants}
        transition={{ delay: 0.2 }}
      />
    </motion.div>
  );
};

export default AnimatedSectionHeader;
