import React, { useState, useEffect } from 'react';

const CircleStack: React.FC = () => {
  // Set up properties for the enhanced circles, with linear-gradient for fade effect
  const circleProps = [
    { 
      size: '95vh', 
      delay: 0, 
      opacity: 0.7, 
      scale: 1, 
      rotate: 0, 
      borderWidth: 1, 
      background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0))' // Fade hitam ke transparan
    },
    { 
      size: '70vh', 
      delay: 2, 
      opacity: 0.3, 
      scale: 1.05, 
      rotate: -8, 
      borderWidth: 1, 
      background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0))' // Fade hitam ke transparan
    },
    { 
      size: '45vh', 
      delay: 4, 
      opacity: 0.1, 
      scale: 1.1, 
      rotate: 5, 
      borderWidth: 2, 
      background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0))' // Fade hitam ke transparan
    }
  ];

  // State for each circle's animation - initialize with values from circleProps
  const [animations, setAnimations] = useState(
    circleProps.map((circle) => ({
      scale: circle.scale,
      rotate: circle.rotate,
      pulse: 0,
      opacity: circle.opacity,
    }))
  );

  // Animate circles with smoother motion and more efficient updates
  useEffect(() => {
    let animationFrame: number;
    let lastUpdateTime = 0;
    const updateInterval = 50; // milliseconds between updates (20fps instead of 60fps)
    
    const animate = (timestamp: number) => {
      // Only update if enough time has passed
      if (timestamp - lastUpdateTime >= updateInterval) {
        lastUpdateTime = timestamp;
        
        setAnimations(prev => 
          prev.map((anim, i) => ({
            scale: circleProps[i].scale + (Math.sin(Date.now() * 0.0001) * 0.01),
            rotate: anim.rotate + 0.01,
            pulse: (anim.pulse + 0.0025) % (Math.PI * 2),
            opacity: circleProps[i].opacity,
          }))
        );
      }
      
      animationFrame = requestAnimationFrame(animate);
    };
    
    animationFrame = requestAnimationFrame(animate);
    
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden will-change-transform">
      {circleProps.map((circle, idx) => {
        // Calculate pulsing for additional subtle movement
        const pulseFactor = 0.005 * Math.sin(animations[idx].pulse);
        
        return (
          <div
            key={idx}
            className="absolute rounded-full border border-white/5 bg-black will-change-transform"
            style={{
              width: circle.size,
              height: circle.size,
              opacity: animations[idx].opacity,
              transform: `scale(${animations[idx].scale + pulseFactor}) rotate(${animations[idx].rotate}deg)`,
              transition: 'transform 2s cubic-bezier(0.4, 0, 0.2, 1)',
              borderWidth: `${circle.borderWidth}px`,
              background: circle.background, // Apply gradient background
              boxShadow: idx === 0 ? '0 0 40px 5px rgba(0,0,0,0.8) inset' : 'none',
            }}
          />
        );
      })}

      {/* Central glowing orb - optimized animation */}
      <div 
        className="absolute rounded-full animate-pulse-slow z-10 will-change-transform"
        style={{
          width: '12vh',
          height: '12vh',
          opacity: 0.4,
          background: 'radial-gradient(circle, rgba(250,204,21,0.25) 0%, rgba(250,204,21,0) 75%)',
          boxShadow: '0 0 50px 25px rgba(250,204,21,0.06)',
          filter: 'blur(8px)',
          animationDuration: '8s',
        }}
      />
    </div>
  );
};

export default CircleStack;