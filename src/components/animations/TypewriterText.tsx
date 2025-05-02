
import React, { useState, useEffect } from 'react';

interface TypewriterTextProps {
  text: string;
  delay?: number;
  speed?: number;
  className?: string;
  repeat?: boolean;
  useRawHTML?: boolean;
}

const TypewriterText: React.FC<TypewriterTextProps> = ({
  text,
  delay = 0,
  speed = 50,
  className = '',
  repeat = false,
  useRawHTML = false
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  useEffect(() => {
    // Delay before starting
    const startTimeout = setTimeout(() => {
      setIsTyping(true);
    }, delay * 1000);
    
    return () => clearTimeout(startTimeout);
  }, [delay]);
  
  useEffect(() => {
    if (!isTyping) return;
    
    let timeout: NodeJS.Timeout;
    
    if (!isDeleting) {
      // Typing effect
      if (currentIndex < text.length) {
        timeout = setTimeout(() => {
          setDisplayedText(text.substring(0, currentIndex + 1));
          setCurrentIndex(prev => prev + 1);
        }, speed);
      } else if (repeat) {
        // Pause at the end before deleting
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, 2000);
      }
    } else {
      // Deleting effect
      if (currentIndex > 0) {
        timeout = setTimeout(() => {
          setDisplayedText(text.substring(0, currentIndex - 1));
          setCurrentIndex(prev => prev - 1);
        }, speed / 2); // Delete faster than typing
      } else {
        // Complete deletion, reset
        setIsDeleting(false);
      }
    }
    
    return () => clearTimeout(timeout);
  }, [isTyping, isDeleting, currentIndex, text, speed, repeat]);
  
  if (useRawHTML) {
    return (
      <div 
        className={className}
        dangerouslySetInnerHTML={{ __html: displayedText }}
      />
    );
  }
  
  return (
    <div className={className}>{displayedText}</div>
  );
};

export default TypewriterText;
