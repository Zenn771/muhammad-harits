
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from '@/lib/utils';

interface EnhancedCardProps extends React.ComponentPropsWithoutRef<typeof Card> {
  hoverEffect?: boolean;
  glowEffect?: boolean;
  grainEffect?: boolean;
  animate?: boolean;
  children: React.ReactNode;
}

const EnhancedCard = React.forwardRef<
  React.ElementRef<typeof Card>,
  EnhancedCardProps
>(({ 
  className, 
  hoverEffect = true,
  glowEffect = true,
  grainEffect = false,
  animate = true,
  children, 
  ...props 
}, ref) => {
  // Define variants for animation
  const cardVariants = {
    initial: { 
      opacity: 0,
      y: 20
    },
    animate: { 
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
        duration: 0.6
      }
    },
    hover: hoverEffect ? { 
      y: -5,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)",
      transition: { type: "spring", stiffness: 400, damping: 10 }
    } : {}
  };

  const Wrapper = animate ? motion.div : React.Fragment;
  const wrapperProps = animate ? {
    variants: cardVariants,
    initial: "initial",
    whileInView: "animate",
    whileHover: "hover",
    viewport: { once: true, margin: "-50px" }
  } : {};

  return (
    <Wrapper {...wrapperProps}>
      <Card 
        ref={ref}
        className={cn(
          "overflow-hidden border border-white/10",
          glowEffect && "shadow-lg hover:shadow-xl transition-shadow duration-300",
          glowEffect && "after:absolute after:inset-0 after:rounded-lg after:shadow-[0_0_15px_rgba(255,255,255,0.15)] after:opacity-0 hover:after:opacity-100 after:transition-opacity after:duration-300",
          grainEffect && "before:absolute before:inset-0 before:bg-grain-effect-subtle before:opacity-20 before:mix-blend-overlay before:pointer-events-none before:z-10",
          className
        )}
        {...props}
      >
        {children}
      </Card>
    </Wrapper>
  );
});

EnhancedCard.displayName = 'EnhancedCard';

const EnhancedCardHeader = React.forwardRef<
  React.ElementRef<typeof CardHeader>,
  React.ComponentPropsWithoutRef<typeof CardHeader>
>(({ className, ...props }, ref) => (
  <CardHeader 
    ref={ref} 
    className={cn("bg-gradient-to-r from-gray-800/95 to-gray-700/85 border-b border-white/10", className)}
    {...props} 
  />
));

EnhancedCardHeader.displayName = 'EnhancedCardHeader';

const EnhancedCardTitle = React.forwardRef<
  React.ElementRef<typeof CardTitle>,
  React.ComponentPropsWithoutRef<typeof CardTitle>
>(({ className, ...props }, ref) => (
  <CardTitle 
    ref={ref} 
    className={cn("text-xl font-bold tracking-tight text-white", className)} 
    {...props} 
  />
));

EnhancedCardTitle.displayName = 'EnhancedCardTitle';

const EnhancedCardDescription = React.forwardRef<
  React.ElementRef<typeof CardDescription>,
  React.ComponentPropsWithoutRef<typeof CardDescription>
>(({ className, ...props }, ref) => (
  <CardDescription 
    ref={ref} 
    className={cn("text-white/70", className)} 
    {...props} 
  />
));

EnhancedCardDescription.displayName = 'EnhancedCardDescription';

const EnhancedCardContent = React.forwardRef<
  React.ElementRef<typeof CardContent>,
  React.ComponentPropsWithoutRef<typeof CardContent>
>(({ className, ...props }, ref) => (
  <CardContent 
    ref={ref} 
    className={cn("p-6", className)} 
    {...props} 
  />
));

EnhancedCardContent.displayName = 'EnhancedCardContent';

const EnhancedCardFooter = React.forwardRef<
  React.ElementRef<typeof CardFooter>,
  React.ComponentPropsWithoutRef<typeof CardFooter>
>(({ className, ...props }, ref) => (
  <CardFooter 
    ref={ref} 
    className={cn("flex items-center justify-between border-t border-white/10 p-4 bg-gradient-to-b from-gray-800/50 to-gray-900/70", className)} 
    {...props} 
  />
));

EnhancedCardFooter.displayName = 'EnhancedCardFooter';

export {
  EnhancedCard,
  EnhancedCardHeader,
  EnhancedCardTitle,
  EnhancedCardDescription,
  EnhancedCardContent,
  EnhancedCardFooter,
};
