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
    name: "Muhammad Rasha",
    position: "Electrical Engineering Student, UGM",
    text: "Working with Harits on a robotics project was an amazing experience. His innovative ideas and problem solving skills played a huge role in our team's success. Definitely someone you want on your team!",
    avatar: "/avatar/Muhammad-Rasha.png",
    initials: "MR"
  },
  {
    id: 2,
    name: "Aldo Ramadhan",
    position: "Information Systems Student, BINUS University",
    text: "Harits has an incredible ability to turn complex problems into simple solutions. During our web development project, his frontend skills were truly next level. A true professional in the making!",
    avatar: "/avatar/Aldo-Ramadhan.png",
    initials: "AR"
  },
  {
    id: 3,
    name: "Chelsea Natasja",
    position: "Computer Science Student, UGM",
    text: "Harits dedication and character set him apart. His intellect and grace in overcoming challenges embody professionalism and integrity.",
    avatar: "/avatar/Chelsea-Natasja.png",
    initials: "CN"
  },
  {
    id: 4,
    name: "Kevin Aditya",
    position: "Mechanical Engineering Student, ITB",
    text: "Harits is an exceptional team player. We worked together on a drone competition, and his expertise in system integration and vision programming ensured our project was a success.",
    avatar: "/avatar/Kevin-Aditya.png",
    initials: "KA"
  },
  {
    id: 5,
    name: "Reza Putra",
    position: "Engineering Physics Student, UGM",
    text: "Harits’s contributions to our renewable energy prototype were invaluable. His technical insights and coding skills ensured we had a polished and efficient solution. Highly recommend him!",
    avatar: "/avatar/Reza-Putra.png",
    initials: "RP"
  }
];

const TestimonialsSection = () => {
  const [isPaused, setIsPaused] = useState(false);
  const [duplicatedItems, setDuplicatedItems] = useState<Testimonial[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const controls = useAnimationControls();

  // Konfigurasi animasi dengan kecepatan konstan
  const animationConfig = {
    x: '-100%',
    transition: {
      repeat: Infinity,
      repeatType: 'loop' as const,
      duration: 30, // Atur durasi untuk kecepatan yang diinginkan
      ease: 'linear', // Pastikan kecepatan konstan
    },
  };

  // Duplikasi item untuk infinite scroll (cukup dua kali untuk performa)
  useEffect(() => {
    setDuplicatedItems([...testimonials, ...testimonials]);
  }, []);

  // Kontrol animasi berdasarkan isPaused
  useEffect(() => {
    if (isPaused) {
      controls.stop();
    } else {
      controls.start(animationConfig);
    }
    return () => {
      controls.stop();
    };
  }, [isPaused, controls]);

  return (
    <section id="testimonials" className="w-full py-8 md:py-16 bg-black vintage-effect overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 relative">
        <motion.h2
          className="text-3xl md:text-6xl font-bold mb-6 md:mb-8 text-center text-gray-100 vintage-text"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          What People Say
        </motion.h2>

        <div className="mb-6 md:mb-8 max-w-3xl mx-auto text-center">
          <motion.p
            className="text-base md:text-lg text-gray-300/90"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Testimonials from colleagues and clients I've had the pleasure to work with
          </motion.p>
        </div>

        {/* Infinite scrolling testimonial carousel */}
        <div
          className="relative w-full overflow-hidden"
          ref={containerRef}
        >
          <motion.div
            className="flex gap-4 md:gap-6 will-change-transform"
            animate={controls}
            initial={{ x: 0 }}
          >
            {duplicatedItems.map((testimonial, index) => (
              <div
                key={`${testimonial.id}-${index}`}
                className="flex-shrink-0 w-[260px] md:w-[320px] vintage-project-card rounded-xl bento-card glow-border"
                onMouseEnter={() => setIsPaused(true)} // Pause saat hover card
                onMouseLeave={() => setIsPaused(false)} // Lanjutkan saat leave
              >
                <div className="p-4 md:p-5 flex flex-col h-full relative">
                  <div className="absolute inset-0 rounded-xl bg-[#221F26] opacity-50 mix-blend-soft-light pointer-events-none z-0"></div>
                  <div className="absolute inset-0 grain-effect-subtle rounded-xl opacity-10"></div>

                  <div className="flex items-center gap-3 mb-3 relative z-10">
                    <Avatar className="h-10 w-10 md:h-12 md:w-12 border-2 border-white/10">
                      <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                      <AvatarFallback className="bg-gradient-to-br from-blue-900/80 to-blue-600/50 text-white">
                        {testimonial.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-medium text-white text-sm md:text-base">{testimonial.name}</h4>
                      <p className="text-[10px] md:text-xs text-blue-300/80">{testimonial.position}</p>
                    </div>
                  </div>

                  <p className="text-white/80 text-xs md:text-sm leading-relaxed relative z-10 mt-1">{testimonial.text}</p>

                  <div className="absolute bottom-2 md:bottom-3 right-2 md:right-3 opacity-20"></div>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Fade effects */}
          <div className="absolute left-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none"></div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;