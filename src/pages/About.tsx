
import React from 'react';
import Navbar from '@/components/Navbar';
import ParticleEffect from '@/components/ParticleEffect';
import SectionBackground from '@/components/backgrounds/SectionBackground';
import BentoBox from '@/components/BentoGrid';

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
          <div className="max-w-3xl mx-auto relative spotlight-enhanced animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-10 text-white text-center">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-accent to-white">
                About Me
              </span>
            </h1>
            
            <div className="space-y-8 text-white/80 text-lg">
              <p className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
                I am a passionate designer with over 5 years of experience creating beautiful, functional digital experiences. My work spans across various industries, helping brands establish meaningful connections with their audiences.
              </p>
              
              <p className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
                My approach combines aesthetic sensibility with user-centered design principles, ensuring that every project not only looks stunning but also delivers exceptional usability and performance.
              </p>
              
              <div className="animate-fade-in" style={{ animationDelay: '0.6s' }}>
                <h2 className="text-2xl font-semibold mb-4 text-white">Core Skills</h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <li className="flex items-center">
                    <span className="w-2 h-2 rounded-full bg-accent mr-3"></span>
                    Brand Identity Design
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 rounded-full bg-accent mr-3"></span>
                    User Experience (UX)
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 rounded-full bg-accent mr-3"></span>
                    User Interface (UI) Design
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 rounded-full bg-accent mr-3"></span>
                    Interactive Prototyping
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 rounded-full bg-accent mr-3"></span>
                    Design Systems
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 rounded-full bg-accent mr-3"></span>
                    Motion Design
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </SectionBackground>
      
      {/* Add random glows/stars */}
      {[...Array(8)].map((_, i) => {
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
            }}
          />
        );
      })}
    </div>
  );
};

export default About;
