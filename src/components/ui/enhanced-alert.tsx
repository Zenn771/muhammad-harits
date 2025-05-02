
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { cva, type VariantProps } from "class-variance-authority";

const alertVariants = cva(
  "relative overflow-hidden border backdrop-blur-sm shadow-lg",
  {
    variants: {
      variant: {
        default: "bg-secondary/30 text-foreground border-secondary/50",
        success: "bg-green-950/30 text-green-50 border-green-800/50",
        warning: "bg-amber-950/30 text-amber-50 border-amber-800/50",
        destructive: "bg-red-950/30 text-red-50 border-red-800/50",
        info: "bg-blue-950/30 text-blue-50 border-blue-800/50",
      },
      animation: {
        none: "",
        slideIn: "animate-in slide-in-from-top",
        fadeIn: "animate-in fade-in",
      },
    },
    defaultVariants: {
      variant: "default",
      animation: "fadeIn",
    },
  }
);

interface EnhancedAlertProps 
  extends React.ComponentPropsWithoutRef<typeof Alert>,
    VariantProps<typeof alertVariants> {
  title?: string;
  icon?: React.ReactNode;
  dismissible?: boolean;
  onDismiss?: () => void;
  className?: string;
  glowEffect?: boolean;
  grainEffect?: boolean;
}

const EnhancedAlert = React.forwardRef<
  HTMLDivElement,
  EnhancedAlertProps
>(({
  title,
  icon,
  children,
  variant = "default",
  animation = "fadeIn",
  dismissible = false,
  onDismiss,
  className,
  glowEffect = true,
  grainEffect = false,
  ...props
}, ref) => {
  const [isVisible, setIsVisible] = React.useState(true);
  
  const handleDismiss = () => {
    setIsVisible(false);
    if (onDismiss) onDismiss();
  };
  
  const glowColors = {
    default: "rgba(255, 255, 255, 0.1)",
    success: "rgba(74, 222, 128, 0.1)",
    warning: "rgba(250, 204, 21, 0.1)",
    destructive: "rgba(239, 68, 68, 0.1)",
    info: "rgba(59, 130, 246, 0.1)",
  };
  
  const glowColor = variant && variant in glowColors 
    ? glowColors[variant as keyof typeof glowColors] 
    : glowColors.default;
  
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Alert
            ref={ref}
            className={cn(
              alertVariants({ variant, animation }),
              glowEffect && "after:content-[''] after:absolute after:inset-0 after:rounded-lg after:shadow-[0_0_15px_rgba(255,255,255,0.15)] after:opacity-50 after:pointer-events-none",
              grainEffect && "before:content-[''] before:absolute before:inset-0 before:bg-grain-effect-subtle before:opacity-30 before:mix-blend-overlay before:pointer-events-none",
              className
            )}
            style={{
              boxShadow: glowEffect ? `0 0 20px ${glowColor}` : undefined,
            }}
            {...props}
          >
            <div className="relative z-10">
              <div className="flex items-start gap-4">
                {icon && (
                  <div className="flex-shrink-0 mt-0.5">
                    {icon}
                  </div>
                )}
                <div className="flex-grow">
                  {title && (
                    <AlertTitle className="mb-1 font-semibold tracking-tight">
                      {title}
                    </AlertTitle>
                  )}
                  <AlertDescription>
                    {children}
                  </AlertDescription>
                </div>
                {dismissible && (
                  <button
                    onClick={handleDismiss}
                    className="flex-shrink-0 text-foreground/70 hover:text-foreground transition-colors"
                    aria-label="Dismiss"
                  >
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="18" 
                      height="18" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    >
                      <path d="M18 6 6 18"></path><path d="m6 6 12 12"></path>
                    </svg>
                  </button>
                )}
              </div>
            </div>
            
            {/* Decorative accent line based on variant */}
            <div 
              className={cn(
                "absolute left-0 top-0 bottom-0 w-1",
                variant === "success" && "bg-green-500",
                variant === "warning" && "bg-amber-500",
                variant === "destructive" && "bg-red-500",
                variant === "info" && "bg-blue-500",
                variant === "default" && "bg-white/20"
              )}
            />
          </Alert>
        </motion.div>
      )}
    </AnimatePresence>
  );
});

EnhancedAlert.displayName = 'EnhancedAlert';

export default EnhancedAlert;
export { EnhancedAlert };
