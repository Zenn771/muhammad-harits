
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import AnimatedWords from '@/components/animations/AnimatedWords';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
  withAccent?: boolean;
  withAnimation?: boolean;
  children?: React.ReactNode;
}

const SectionTitle: React.FC<SectionTitleProps> = ({
  title,
  subtitle,
  align = 'center',
  className = '',
  titleClassName = '',
  subtitleClassName = '',
  withAccent = true,
  withAnimation = true,
  children,
}) => {
  const alignmentClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  const textVariants = {
    hidden: { 
      opacity: 0,
      y: 20 
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const Wrapper = withAnimation ? motion.div : 'div';
  const wrapperProps = withAnimation ? {
    initial: "hidden",
    whileInView: "visible",
    viewport: { once: true, margin: "-50px" },
  } : {};

  return (
    <Wrapper 
      className={cn(
        'relative mb-12 md:mb-16',
        alignmentClasses[align],
        className
      )}
      {...wrapperProps}
    >
      {withAnimation ? (
        <>
          <motion.h2 
            className={cn(
              'text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 relative z-10',
              titleClassName
            )}
            variants={textVariants}
          >
            <span className="relative">
              {title}
              {withAccent && (
                <span className="absolute -bottom-1 left-0 h-1 bg-gradient-to-r from-amber-400 to-amber-600 w-full max-w-[80px] md:max-w-[120px] rounded-full opacity-80" />
              )}
            </span>
          </motion.h2>
          
          {subtitle && (
            <motion.p 
              className={cn(
                'max-w-2xl mx-auto text-lg text-gray-400',
                align === 'center' ? 'mx-auto' : align === 'right' ? 'ml-auto' : '',
                subtitleClassName
              )}
              variants={textVariants}
              custom={1}
            >
              <AnimatedWords text={subtitle} delay={0.3} />
            </motion.p>
          )}
        </>
      ) : (
        <>
          <h2 
            className={cn(
              'text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 relative z-10',
              titleClassName
            )}
          >
            <span className="relative">
              {title}
              {withAccent && (
                <span className="absolute -bottom-1 left-0 h-1 bg-gradient-to-r from-amber-400 to-amber-600 w-full max-w-[80px] md:max-w-[120px] rounded-full opacity-80" />
              )}
            </span>
          </h2>
          
          {subtitle && (
            <p 
              className={cn(
                'max-w-2xl text-lg text-gray-400',
                align === 'center' ? 'mx-auto' : align === 'right' ? 'ml-auto' : '',
                subtitleClassName
              )}
            >
              {subtitle}
            </p>
          )}
        </>
      )}
      
      {children}

      {/* Decorative elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg h-40 blur-[100px] bg-gradient-to-r from-blue-900/10 via-amber-900/5 to-amber-900/10 rounded-full -z-10 opacity-60" />
    </Wrapper>
  );
};

export default SectionTitle;
