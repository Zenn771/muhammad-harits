
import React from 'react';

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
            <div 
              key={index} 
              className="inline-block mx-8 h-8 hover:scale-110 transition-all duration-300 relative group"
            >
              <span className="text-lg font-bold tracking-wide text-white/80 relative">
                {skill}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300"></span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClientLogos;
