
import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation, useMotionValue, useTransform } from 'framer-motion';
import { cn } from "@/lib/utils";
import { 
  Code2, 
  Cpu, 
  ChefHat, 
  Music, 
  Zap, 
  Lightbulb,
  Rocket
} from 'lucide-react';

interface BentoCardProps {
  title: string;
  description: string;
  className?: string;
  icon?: React.ReactNode;
  gradient?: string;
  delay?: number;
  sizeClasses?: string;
}

const BentoCard = ({
  title,
  description,
  className,
  icon,
  gradient = "from-blue-800/25 to-purple-800/10",
  delay = 0,
  sizeClasses = "col-span-1 row-span-1"
}: BentoCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  // Animation for the icon
  const iconControls = useAnimation();
  
  // Motion values for 3D tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);

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

  // Handle mouse move for 3D tilt effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };

  // Animation sequence for icon on hover
  useEffect(() => {
    if (isHovered) {
      iconControls.start({
        scale: [1, 1.2, 1],
        rotate: [0, 10, -10, 0],
        transition: { duration: 0.5 }
      });
    }
  }, [isHovered, iconControls]);

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
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        x.set(0);
        y.set(0);
      }}
      style={{
        rotateX,
        rotateY,
        perspective: 1000,
        transformStyle: "preserve-3d",
        boxShadow: isHovered ? "0 10px 30px rgba(250, 204, 21, 0.1)" : "none",
        position: 'relative' // Ensure position is set to relative for proper grain overlay
      }}
      whileHover={{ 
        scale: 1.02,
        transition: { duration: 0.3 }
      }}
    >
      {/* Card-specific grain texture overlay */}
      <div 
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
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
        
        <motion.div 
          className="mt-auto pt-4"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <motion.div 
            className="h-1 w-12 bg-white/20 rounded-full"
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

const BentoBox = () => {
  return (
    <div className="mx-auto max-w-6xl px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        <BentoCard
          title="AI & Machine Learning"
          description="Passionate about developing intelligent systems and neural networks, constantly exploring the boundaries of what AI can achieve in solving complex real-world problems."
          icon={<Cpu className="h-5 w-5 text-blue-300" />}
          gradient="from-blue-900/30 to-cyan-900/10"
          delay={0}
          sizeClasses="col-span-1 md:col-span-2 row-span-1"
        />
        
        <BentoCard
          title="Electrical Engineering"
          description="Designing and optimizing electrical systems with precision and innovation. I love working with hardware components and creating integrated solutions."
          icon={<Zap className="h-5 w-5 text-amber-300" />}
          gradient="from-amber-900/30 to-yellow-900/10"
          delay={1}
          sizeClasses="col-span-1 md:col-span-1 row-span-1"
        />
        
        <BentoCard
          title="Innovation"
          description="Always seeking creative solutions to complex problems. I believe in thinking outside the box and challenging conventional approaches."
          icon={<Lightbulb className="h-5 w-5 text-yellow-300" />}
          gradient="from-yellow-900/30 to-amber-900/10"
          delay={2}
          sizeClasses="col-span-1 row-span-1"
        />
        
        <BentoCard
          title="Programming"
          description="From embedded systems to high-level applications, I enjoy the creative process of coding and bringing ideas to life through software development and algorithm optimization."
          icon={<Code2 className="h-5 w-5 text-green-300" />}
          gradient="from-green-900/30 to-emerald-900/10"
          delay={3}
          sizeClasses="col-span-1 md:col-span-1 row-span-1 md:row-span-2"
        />
        
        <BentoCard
          title="Culinary Arts"
          description="When not engineering systems, I explore the science of cooking. The precision and creativity required in the kitchen parallels my engineering work in surprising ways."
          icon={<ChefHat className="h-5 w-5 text-orange-300" />}
          gradient="from-orange-900/30 to-red-900/10"
          delay={4}
          sizeClasses="col-span-1 md:col-span-2 row-span-1"
        />
        
        <BentoCard
          title="Music Appreciation"
          description="A lifelong love for diverse musical genres helps me maintain creative balance. I find parallels between musical patterns and engineering systems."
          icon={<Music className="h-5 w-5 text-purple-300" />}
          gradient="from-purple-900/30 to-indigo-900/10"
          delay={5}
          sizeClasses="col-span-1 row-span-1"
        />

        <BentoCard
          title="Future Tech"
          description="Exploring emerging technologies and envisioning how they'll shape our future. I'm particularly interested in sustainable tech solutions and their real-world applications."
          icon={<Rocket className="h-5 w-5 text-sky-300" />}
          gradient="from-sky-900/30 to-blue-900/10"
          delay={6}
          sizeClasses="col-span-1 md:col-span-3 row-span-1"
        />
      </div>
    </div>
  );
};

export default BentoBox;
