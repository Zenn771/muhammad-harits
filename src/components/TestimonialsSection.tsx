
import React, { useState, useRef, useEffect } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { motion, useAnimationControls } from 'framer-motion';

type Testimonial = {
  id: number;
  name: string;
  position: string;
  text: string;
  avatar: string;
  initials: string;
};

// Testimonial data
const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Alice Chen",
    position: "Senior AI Researcher",
    text: "Harits is one of the most creative engineers I've worked with. His ability to blend AI concepts with electrical engineering principles resulted in groundbreaking solutions for our team.",
    avatar: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=150&h=150&fit=crop&q=80",
    initials: "AC"
  },
  {
    id: 2,
    name: "Michael Rodriguez",
    position: "Project Lead, Innovate Systems",
    text: "Working alongside Harits was an incredible experience. His technical expertise and problem-solving skills consistently helped us deliver complex projects ahead of schedule.",
    avatar: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=150&h=150&fit=crop&q=80",
    initials: "MR"
  },
  {
    id: 3,
    name: "Sarah Johnson",
    position: "CTO, PowerTech Solutions",
    text: "Harits brings both technical excellence and innovative thinking to every project. His work on our electrical systems improved efficiency by over 30%.",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&q=80",
    initials: "SJ"
  },
  {
    id: 4,
    name: "David Lee",
    position: "Lead Engineer, Future Tech Labs",
    text: "The depth of Harits's knowledge in both AI and electrical engineering is remarkable. He consistently delivers solutions that others wouldn't even think of.",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&q=80",
    initials: "DL"
  },
  {
    id: 5,
    name: "Emma Wilson",
    position: "Research Director, AI Institute",
    text: "I've mentored many engineers, but Harits stands out with his unique perspective and dedication. His ability to connect theories to practical applications is outstanding.",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&q=80",
    initials: "EW"
  }
];

const TestimonialsSection = () => {
  const [isPaused, setIsPaused] = useState(false);
  const [duplicatedItems, setDuplicatedItems] = useState<Testimonial[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const controls = useAnimationControls();
  const animationSpeed = 45; // Define the animation speed as a constant

  // Create duplicated items to enable infinite scroll effect
  useEffect(() => {
    // Duplicate the testimonials to create seamless infinite scroll
    setDuplicatedItems([...testimonials, ...testimonials, ...testimonials]);
  }, []);

  // Effect to handle animation controls based on isPaused state
  useEffect(() => {
    const animationConfig = {
      x: "-100%",
      transition: {
        repeat: Infinity,
        repeatType: "loop",
        duration: animationSpeed, // Use consistent animation speed
        ease: "linear"
      }
    };
    
    if (isPaused) {
      controls.stop();
    } else {
      // Start animation with consistent speed
      controls.start(animationConfig);
    }
    
    return () => {
      controls.stop(); // Clean up animation when component unmounts
    };
  }, [isPaused, controls, animationSpeed]);

  return (
    <section id="testimonials" className="w-full py-12 md:py-16 bg-black vintage-effect overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 relative">
        <motion.h2 
          className="text-4xl md:text-6xl font-bold mb-8 text-center text-gray-100 vintage-text"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          What People Say
        </motion.h2>
        
        <div className="mb-8 max-w-3xl mx-auto text-center">
          <motion.p 
            className="text-lg text-gray-300/90"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Testimonials from colleagues and clients I've had the pleasure to work with
          </motion.p>
        </div>

        {/* Infinite scrolling testimonial carousel with optimized animation */}
        <div 
          className="relative w-full overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          ref={containerRef}
        >
          <motion.div 
            className="flex gap-6 will-change-transform"
            animate={controls}
            initial={{ x: 0 }}
          >
            {duplicatedItems.map((testimonial, index) => (
              <div 
                key={`${testimonial.id}-${index}`}
                className="flex-shrink-0 w-[280px] md:w-[320px] vintage-project-card rounded-xl bento-card glow-border"
              >
                <div className="p-5 flex flex-col h-full relative">
                  {/* Subtler vintage texture overlay */}
                  <div className="absolute inset-0 rounded-xl bg-[#221F26] opacity-50 mix-blend-soft-light pointer-events-none z-0"></div>
                  <div className="absolute inset-0 grain-effect-subtle rounded-xl opacity-10"></div>
                  
                  <div className="flex items-center gap-3 mb-3 relative z-10">
                    <Avatar className="h-12 w-12 border-2 border-white/10">
                      <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                      <AvatarFallback className="bg-gradient-to-br from-blue-900/80 to-blue-600/50 text-white">
                        {testimonial.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-medium text-white text-base">{testimonial.name}</h4>
                      <p className="text-xs text-blue-300/80">{testimonial.position}</p>
                    </div>
                  </div>
                  
                  <p className="text-white/80 text-sm leading-relaxed relative z-10 mt-1">{testimonial.text}</p>

                  {/* Decorative vintage quote element */}
                  <div className="absolute bottom-3 right-3 opacity-20">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9.63 17.93C5.38 17.93 2 14.46 2 10.3C2 6.25 5.38 2.77 9.63 2.77C13.88 2.77 17.26 6.25 17.26 10.3C17.26 14.46 13.88 17.93 9.63 17.93Z" stroke="currentColor" strokeWidth="0.5" strokeMiterlimit="10"/>
                      <path d="M21.98 21.98C21.98 21.98 17.51 17.59 17.26 17.33" stroke="currentColor" strokeWidth="0.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
          
          {/* Left and right fade effects for better entry/exit points */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none"></div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
