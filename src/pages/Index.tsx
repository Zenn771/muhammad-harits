
import React from 'react';
import Navbar from '@/components/Navbar';
import CircleStack from '@/components/CircleStack';
import ParticleEffect from '@/components/ParticleEffect';
import StatusBadge from '@/components/StatusBadge';
import ClientLogos from '@/components/ClientLogos';
import { Button } from '@/components/ui/button';

const Index = () => {
  return (
    <div className="min-h-screen w-full overflow-hidden bg-gradient-to-b from-black to-dark relative grain-effect">
      {/* Background particles */}
      <ParticleEffect count={75} />
      
      {/* Navigation */}
      <div className="fixed top-5 left-0 right-0 z-50">
        <Navbar />
      </div>
      
      {/* Circle stack */}
      <CircleStack />
      
      {/* Main content positioned in the center */}
      <div className="relative h-screen flex flex-col items-center justify-center z-10">
        <div className="text-center max-w-3xl px-6 spotlight">
          {/* Status badge */}
          <div className="mb-8 flex justify-center">
            <StatusBadge status="available" />
          </div>
          
          {/* Main headline */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-white relative">
            Welcome to
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-accent to-white">
              my digital humble abode
            </span>
          </h1>
          
          {/* Subtitle */}
          <div className="space-y-4 mb-12">
            <p className="text-lg text-white/70">
              I'm an independent designer.
            </p>
            <p className="text-lg text-white/70">
              My interest lies in brand experience, and user experience.
            </p>
          </div>
          
          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-white text-dark hover:bg-accent hover:text-black transition-colors">
              👋 Let's talk
            </Button>
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
              Get Template <span className="ml-2">↗</span>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Footer with client logos */}
      <div className="absolute bottom-0 left-0 right-0 pb-10">
        <ClientLogos />
      </div>
      
      {/* Add random glows/stars */}
      {[...Array(5)].map((_, i) => {
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
            }}
          />
        );
      })}

      {/* Add placeholder pages for navigation */}
      <div className="sr-only">
        <div id="works">Works Page</div>
        <div id="about">About Page</div>
        <div id="faq">FAQ Page</div>
      </div>
    </div>
  );
};

export default Index;
