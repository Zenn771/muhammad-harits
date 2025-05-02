
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GlowButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  glowColor?: string;
  className?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  full?: boolean;
}

const GlowButton = React.forwardRef<HTMLButtonElement, GlowButtonProps>(
  ({
    children,
    variant = 'primary',
    size = 'md',
    glowColor = 'rgba(250, 204, 21, 0.5)',
    className,
    icon,
    iconPosition = 'left',
    full = false,
    ...props
  }, ref) => {
    // Define variants
    const variants = {
      primary: "bg-gradient-to-r from-amber-500 to-amber-600 text-black hover:from-amber-400 hover:to-amber-500",
      secondary: "bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm border border-white/20",
      outline: "bg-transparent border border-white/20 hover:border-white/40 text-white",
      ghost: "bg-transparent hover:bg-white/5 text-white",
    };

    // Define sizes
    const sizes = {
      sm: "py-1.5 px-3 text-sm",
      md: "py-2 px-4",
      lg: "py-3 px-6 text-lg",
    };

    return (
      <motion.button
        ref={ref}
        className={cn(
          "relative rounded-lg font-medium transition-all duration-300 overflow-hidden",
          variants[variant],
          sizes[size],
          full && "w-full",
          "focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:ring-offset-2 focus:ring-offset-black",
          className
        )}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        {...props}
      >
        {/* Glow effect */}
        <span 
          className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at center, ${glowColor} 0%, transparent 70%)`,
            filter: 'blur(15px)',
          }}
        />
        
        {/* Shine effect */}
        <motion.span 
          className="absolute inset-0 z-0"
          initial={{ x: '-100%', opacity: 0 }}
          animate={{ x: '200%', opacity: [0, 0.5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 3 }}
          style={{
            background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.2), transparent)',
            pointerEvents: 'none',
          }}
        />
        
        {/* Button content */}
        <span className="relative z-10 flex items-center justify-center gap-2">
          {icon && iconPosition === 'left' && icon}
          {children}
          {icon && iconPosition === 'right' && icon}
        </span>
      </motion.button>
    );
  }
);

GlowButton.displayName = 'GlowButton';

export default GlowButton;
