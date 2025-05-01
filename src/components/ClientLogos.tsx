
import React from 'react';
import { motion } from 'framer-motion';

const ClientLogos: React.FC = () => {
  // Changed from clients to soft skills list
  const softSkills = [
    "Critical Thinking",
    "Leadership",
    "Problem Solving",
    "Time Management",
    "Communication",
    "Teamwork",
    "Adaptability",
    "Creativity",
    "Emotional Intelligence",
    "Organization"
  ];

  return (
    <div className="w-full mt-24 px-4">
      <h3 className="text-center text-xs uppercase tracking-widest text-white/50 mb-8 font-medium">
        SOFT SKILLS
      </h3>
      <div className="relative w-full overflow-hidden">
        <div className="flex whitespace-nowrap animate-scroll-left">
          {/* Double the skills to create seamless loop */}
          {[...softSkills, ...softSkills].map((skill, index) => (
            <motion.div 
              key={index} 
              className="inline-block mx-8 h-8 hover:scale-110 transition-all duration-300 relative group"
              whileHover={{ 
                y: -5,
                transition: { duration: 0.2 }
              }}
            >
              <motion.span 
                className="text-lg font-bold tracking-wide text-white/80 relative"
                whileHover={{ color: "#facc15" }}
              >
                {skill}
                <motion.span 
                  className="absolute -bottom-1 left-0 h-0.5 bg-accent"
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                />
              </motion.span>
              
              {/* Subtle particle effect on hover */}
              <motion.div 
                className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-full h-2 pointer-events-none"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              >
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 rounded-full bg-accent/80"
                    initial={{ 
                      x: 0,
                      y: 0, 
                      opacity: 0 
                    }}
                    animate={{ 
                      x: [-10 + Math.random() * 20, -20 + Math.random() * 40],
                      y: [0, -10 - Math.random() * 10],
                      opacity: [0, 0.8, 0] 
                    }}
                    transition={{ 
                      duration: 1 + Math.random(), 
                      ease: "easeOut",
                      repeat: Infinity,
                      repeatType: "loop",
                      delay: Math.random() * 0.5 
                    }}
                    style={{
                      left: `${Math.random() * 100}%`
                    }}
                  />
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClientLogos;
