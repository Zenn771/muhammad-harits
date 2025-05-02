
import React, { useState, useEffect } from 'react';

const CircleStack: React.FC = () => {
  // Set up properties for the enhanced circles
  const circleProps = [
    { size: '85vh', delay: 0, opacity: 0.03, scale: 1, rotate: 0, borderWidth: 1 },
    { size: '60vh', delay: 2, opacity: 0.04, scale: 1.05, rotate: -8, borderWidth: 1 },
    { size: '35vh', delay: 4, opacity: 0.05, scale: 1.1, rotate: 5, borderWidth: 2 }
  ];

  // State for each circle's animation - initialize with default values
  const [animations, setAnimations] = useState(
    circleProps.map((circle) => ({
      scale: circle.scale,
      rotate: circle.rotate,
      pulse: 0,
      opacity: 1, // Ensure full opacity from the start
    }))
  );

  // Animate circles with more subtle motion
  useEffect(() => {
    // Start the animation immediately on component mount
    setAnimations(prev => 
      prev.map((anim, i) => ({
        scale: circleProps[i].scale,
        rotate: circleProps[i].rotate,
        pulse: 0,
        opacity: 1,
      }))
    );
    
    const interval = setInterval(() => {
      setAnimations(prev => 
        prev.map((anim, i) => ({
          scale: circleProps[i].scale + (Math.random() * 0.02 - 0.01), // Even more subtle scale change
          rotate: anim.rotate + (Math.random() * 0.2 - 0.1), // Even more subtle rotation
          pulse: (anim.pulse + 0.005) % (Math.PI * 2), // Very slow pulse cycle
          opacity: 1, // Keep opacity at 1 to ensure visibility
        }))
      );
    }, 5000); // Much slower update interval
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
      {circleProps.map((circle, idx) => {
        // Calculate pulsing for additional subtle movement
        const pulseFactor = 0.005 * Math.sin(animations[idx].pulse);
        
        return (
          <div
            key={idx}
            className="absolute rounded-full border border-white/5 bg-black grain-effect"
            style={{
              width: circle.size,
              height: circle.size,
              opacity: circle.opacity,
              transform: `scale(${animations[idx].scale + pulseFactor}) rotate(${animations[idx].rotate}deg)`,
              transition: 'transform 18s cubic-bezier(0.4, 0, 0.2, 1)', // Slower transition
              borderWidth: `${circle.borderWidth}px`,
              boxShadow: idx === 0 ? '0 0 40px 5px rgba(0,0,0,0.8) inset' : 'none',
            }}
          />
        );
      })}

      {/* Central glowing orb - kept for the elegant effect */}
      <div 
        className="absolute rounded-full animate-pulse-slow z-10"
        style={{
          width: '12vh',
          height: '12vh',
          opacity: 0.4,
          background: 'radial-gradient(circle, rgba(250,204,21,0.25) 0%, rgba(250,204,21,0) 75%)',
          boxShadow: '0 0 50px 25px rgba(250,204,21,0.06)',
          filter: 'blur(8px)',
          animationDuration: '8s', // Slower animation
        }}
      />
    </div>
  );
};

export default CircleStack;
