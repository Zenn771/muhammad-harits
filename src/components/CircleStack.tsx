
import React, { useState, useEffect } from 'react';

const CircleStack: React.FC = () => {
  // Set up properties for the four circles
  const circleProps = [
    { size: '80vh', delay: 0, opacity: 0.03, scale: 1, rotate: 0 },
    { size: '60vh', delay: 2, opacity: 0.05, scale: 1.05, rotate: -10 },
    { size: '40vh', delay: 4, opacity: 0.08, scale: 1.1, rotate: 5 },
    { size: '20vh', delay: 6, opacity: 0.12, scale: 1.15, rotate: -5 }
  ];

  // State for each circle's animation
  const [animations, setAnimations] = useState(
    circleProps.map((circle) => ({
      scale: circle.scale,
      rotate: circle.rotate,
    }))
  );

  // Animate circles subtly
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimations(prev => 
        prev.map((anim, i) => ({
          scale: circleProps[i].scale + (Math.random() * 0.05 - 0.025),
          rotate: anim.rotate + (Math.random() * 0.5 - 0.25),
        }))
      );
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
      {circleProps.map((circle, idx) => (
        <div
          key={idx}
          className="absolute rounded-full border border-white/5 bg-black grain-effect"
          style={{
            width: circle.size,
            height: circle.size,
            opacity: circle.opacity,
            transform: `scale(${animations[idx].scale}) rotate(${animations[idx].rotate}deg)`,
            transition: 'transform 8s cubic-bezier(0.4, 0, 0.2, 1)',
            animationDelay: `${circle.delay}s`,
          }}
        />
      ))}

      {/* Particle dots scattered around for 3D effect */}
      {[...Array(20)].map((_, i) => {
        const size = Math.random() * 4 + 1;
        const top = Math.random() * 100;
        const left = Math.random() * 100;
        const depth = Math.random();
        const opacity = Math.random() * 0.5;
        const delay = Math.random() * 5;
        
        return (
          <div
            key={`particle-${i}`}
            className="absolute rounded-full bg-white animate-pulse-slow"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              top: `${top}%`,
              left: `${left}%`,
              opacity: opacity,
              animationDelay: `${delay}s`,
              transform: `translateZ(${depth * 50}px)`,
            }}
          />
        );
      })}
    </div>
  );
};

export default CircleStack;
