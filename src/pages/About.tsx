
import React from 'react';
import Navbar from '@/components/Navbar';
import ParticleEffect from '@/components/ParticleEffect';
import SectionBackground from '@/components/backgrounds/SectionBackground';
import BentoBox from '@/components/BentoGrid';
import MacBookFrame from '@/components/MacBookFrame';

const About = () => {
  return (
    <div className="min-h-screen w-full overflow-hidden bg-gradient-to-b from-black to-dark relative">
      {/* Background particles */}
      <ParticleEffect count={75} />
      
      {/* Navigation */}
      <div className="fixed top-5 left-0 right-0 z-50">
        <Navbar />
      </div>
      
      {/* Main content */}
      <SectionBackground pattern="hexagon" withGrain={false}>
        <div className="flex flex-col items-center justify-center pt-32 pb-20 px-6">
          <div className="max-w-4xl mx-auto relative spotlight-enhanced animate-fade-in">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-12 text-white text-center">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-accent to-white">
                About Me
              </span>
            </h1>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {/* Profile Photo in MacBook Frame */}
              <div className="col-span-1 flex items-center justify-center">
                <MacBookFrame 
                  imageSrc="/placeholder.svg" 
                  altText="About Me Profile Photo"
                />
              </div>
              
              {/* About Me Text */}
              <div className="col-span-1 md:col-span-2 space-y-6 text-white/80 text-lg">
                <p className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
                  I am a passionate engineer with expertise in AI, machine learning, and electrical systems. My work combines cutting-edge technology with practical applications, helping organizations solve complex technical challenges.
                </p>
                
                <p className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
                  My approach brings together technical knowledge with innovative thinking, ensuring that every project not only performs exceptionally but also pushes boundaries in what technology can accomplish.
                </p>
              </div>
            </div>
            
            <div className="space-y-8 text-white/80 text-lg">
              <div className="animate-fade-in" style={{ animationDelay: '0.6s' }}>
                <h2 className="text-3xl font-semibold mb-6 text-white">Core Expertise</h2>
                <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <li className="flex items-center p-3 bg-white/5 rounded-lg border border-white/10">
                    <span className="w-2 h-2 rounded-full bg-accent mr-3"></span>
                    Machine Learning
                  </li>
                  <li className="flex items-center p-3 bg-white/5 rounded-lg border border-white/10">
                    <span className="w-2 h-2 rounded-full bg-accent mr-3"></span>
                    Electrical Engineering
                  </li>
                  <li className="flex items-center p-3 bg-white/5 rounded-lg border border-white/10">
                    <span className="w-2 h-2 rounded-full bg-accent mr-3"></span>
                    Software Development
                  </li>
                  <li className="flex items-center p-3 bg-white/5 rounded-lg border border-white/10">
                    <span className="w-2 h-2 rounded-full bg-accent mr-3"></span>
                    System Optimization
                  </li>
                  <li className="flex items-center p-3 bg-white/5 rounded-lg border border-white/10">
                    <span className="w-2 h-2 rounded-full bg-accent mr-3"></span>
                    Data Analysis
                  </li>
                  <li className="flex items-center p-3 bg-white/5 rounded-lg border border-white/10">
                    <span className="w-2 h-2 rounded-full bg-accent mr-3"></span>
                    Research & Development
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </SectionBackground>
      
      {/* Bento Grid Section */}
      <div className="py-20 px-4 bg-gradient-to-b from-dark/80 to-black">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-accent to-white">
              Interests & Skills
            </span>
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto text-lg">
            Beyond my professional expertise, I cultivate a diverse range of interests and continuously develop new skills across multiple domains.
          </p>
        </div>
        <BentoBox />
      </div>
      
      {/* Add enhanced glow effects */}
      {[...Array(10)].map((_, i) => {
        const size = Math.random() * 6 + 2;
        const top = Math.random() * 80 + 10;
        const left = Math.random() * 80 + 10;
        const opacity = Math.random() * 0.5 + 0.2;
        
        return (
          <div
            key={`star-${i}`}
            className="absolute animate-pulse-slow"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              top: `${top}%`,
              left: `${left}%`,
              opacity: opacity,
              background: 'radial-gradient(circle, rgba(250,204,21,0.8) 0%, rgba(250,204,21,0) 70%)',
              borderRadius: '50%',
              filter: 'blur(1px)',
              animationDelay: `${i * 0.5}s`,
              boxShadow: '0 0 10px 2px rgba(250,204,21,0.3)',
              zIndex: 1
            }}
          />
        );
      })}
    </div>
  );
};

export default About;
