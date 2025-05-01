
import React, { useState, useRef, useEffect } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { motion } from 'framer-motion';

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

  // Create duplicated items to enable infinite scroll effect
  useEffect(() => {
    // Duplicate the testimonials to create seamless infinite scroll
    // Add more duplicates to ensure there are enough cards off-screen
    setDuplicatedItems([...testimonials, ...testimonials, ...testimonials]);
  }, []);

  return (
    <section id="testimonials" className="w-full py-12 md:py-20 bg-black vintage-effect overflow-hidden">
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
        
        <div className="mb-10 max-w-3xl mx-auto text-center">
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

        {/* Infinite scrolling testimonial carousel - Now visible on all devices */}
        <div 
          className="relative w-full overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          ref={containerRef}
          style={{ position: 'relative' }}
        >
          <motion.div 
            className="flex gap-6"
            animate={{ x: isPaused ? "0%" : "-50%" }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 25, // Increased speed (was 40)
                ease: "linear",
                pause: isPaused
              }
            }}
            style={{ 
              position: 'relative',
              // Start cards offscreen to create entry from the edge effect
              marginLeft: '100%', 
              width: 'fit-content'
            }}
          >
            {duplicatedItems.map((testimonial, index) => (
              <div 
                key={`${testimonial.id}-${index}`}
                className="flex-shrink-0 w-[280px] md:w-[320px] vintage-project-card rounded-xl bento-card glow-border testimonial-vintage-card"
              >
                <div className="p-5 flex flex-col h-full relative">
                  {/* Vintage paper texture overlay */}
                  <div className="absolute inset-0 rounded-xl bg-opacity-10 testimonial-texture"></div>
                  
                  <div className="flex items-center gap-4 mb-3 relative z-10">
                    <Avatar className="h-12 w-12 border-2 border-white/10">
                      <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                      <AvatarFallback className="bg-gradient-to-br from-blue-900/80 to-blue-600/50 text-white">
                        {testimonial.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-medium text-white text-lg">{testimonial.name}</h4>
                      <p className="text-sm text-blue-300/80">{testimonial.position}</p>
                    </div>
                  </div>
                  <div className="grain-texture rounded-xl"></div>
                  <p className="text-white/90 text-sm leading-relaxed relative z-10 mt-2">{testimonial.text}</p>

                  {/* Quote mark decoration */}
                  <div className="absolute top-4 right-4 opacity-10 testimonial-quote">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9.63 17.93C5.38 17.93 2 14.46 2 10.3C2 6.25 5.38 2.77 9.63 2.77C13.88 2.77 17.26 6.25 17.26 10.3C17.26 14.46 13.88 17.93 9.63 17.93Z" stroke="currentColor" strokeWidth="0.5" strokeMiterlimit="10"/>
                      <path d="M21.98 21.98C21.98 21.98 17.51 17.59 17.26 17.33" stroke="currentColor" strokeWidth="0.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
