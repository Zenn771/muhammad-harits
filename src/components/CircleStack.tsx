
import React, { useState, useEffect } from 'react';

const CircleStack: React.FC = () => {
  // Set up properties for the enhanced circles
  const circleProps = [
    { size: '85vh', delay: 0, opacity: 0.03, scale: 1, rotate: 0, borderWidth: 1 },
    { size: '60vh', delay: 2, opacity: 0.04, scale: 1.05, rotate: -8, borderWidth: 1 },
    { size: '35vh', delay: 4, opacity: 0.05, scale: 1.1, rotate: 5, borderWidth: 2 }
  ];

  // State for each circle's animation
  const [animations, setAnimations] = useState(
    circleProps.map((circle) => ({
      scale: circle.scale,
      rotate: circle.rotate,
      pulse: 0,
    }))
  );

  // Animate circles with more subtle motion
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimations(prev => 
        prev.map((anim, i) => ({
          scale: circleProps[i].scale + (Math.random() * 0.04 - 0.02), // More subtle scale change
          rotate: anim.rotate + (Math.random() * 0.4 - 0.2), // More subtle rotation
          pulse: (anim.pulse + 0.01) % (Math.PI * 2), // Slower pulse cycle
        }))
      );
    }, 3000); // Slower update interval
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
      {circleProps.map((circle, idx) => {
        // Calculate pulsing for additional subtle movement
        const pulseFactor = 0.01 * Math.sin(animations[idx].pulse);
        
        return (
          <div
            key={idx}
            className="absolute rounded-full border border-white/5 bg-black grain-effect"
            style={{
              width: circle.size,
              height: circle.size,
              opacity: circle.opacity,
              transform: `scale(${animations[idx].scale + pulseFactor}) rotate(${animations[idx].rotate}deg)`,
              transition: 'transform 12s cubic-bezier(0.4, 0, 0.2, 1)',
              animationDelay: `${circle.delay}s`,
              borderWidth: `${circle.borderWidth}px`,
              boxShadow: idx === 0 ? '0 0 40px 5px rgba(0,0,0,0.8) inset' : 'none',
            }}
          />
        );
      })}

      {/* Reduced number of particle dots */}
      {[...Array(12)].map((_, i) => {
        const size = Math.random() * 4 + 1.5;
        const top = Math.random() * 100;
        const left = Math.random() * 100;
        const depth = Math.random();
        const opacity = Math.random() * 0.3; // Lower opacity
        const delay = Math.random() * 5;
        const duration = 5 + Math.random() * 4; // Slower animation
        
        return (
          <div
            key={`particle-${i}`}
            className="absolute rounded-full animate-pulse-slow"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              top: `${top}%`,
              left: `${left}%`,
              opacity: opacity,
              animationDelay: `${delay}s`,
              animationDuration: `${duration}s`,
              transform: `translateZ(${depth * 50}px)`,
              background: `rgba(250, 204, 21, ${opacity * 0.5})`,
              boxShadow: `0 0 ${size * 2}px 0 rgba(250, 204, 21, ${opacity * 0.3})`,
            }}
          />
        );
      })}

      {/* Central glowing orb - slightly more prominent */}
      <div 
        className="absolute rounded-full animate-pulse-slow z-10"
        style={{
          width: '10vh',
          height: '10vh',
          opacity: 0.5,
          background: 'radial-gradient(circle, rgba(250,204,21,0.3) 0%, rgba(250,204,21,0) 70%)',
          boxShadow: '0 0 40px 20px rgba(250,204,21,0.07)',
          filter: 'blur(5px)',
          animationDuration: '5s',
        }}
      />
    </div>
  );
};

export default CircleStack;
