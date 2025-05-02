
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface TypewriterTextProps {
  text: string;
  delay?: number;
  className?: string;
  speed?: number;
  repeat?: boolean;
  repeatDelay?: number;
}

const TypewriterText: React.FC<TypewriterTextProps> = ({
  text, 
  delay = 0.5, 
  className = "", 
  speed = 40,
  repeat = false,
  repeatDelay = 2000
}) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [isDeletingText, setIsDeletingText] = useState(false);

  useEffect(() => {
    // Delay before starting
    const startTimeout = setTimeout(() => {
      setIsTyping(true);
    }, delay * 1000);

    return () => clearTimeout(startTimeout);
  }, [delay]);

  useEffect(() => {
    if (!isTyping) return;

    // Typing text
    if (!isDeletingText && currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    } 
    // Reached the end of text
    else if (!isDeletingText && currentIndex >= text.length && repeat) {
      // Wait before starting to delete
      const pauseTimeout = setTimeout(() => {
        setIsDeletingText(true);
      }, repeatDelay);
      
      return () => clearTimeout(pauseTimeout);
    }
    // Deleting text for repeat animation
    else if (isDeletingText && displayText.length > 0) {
      const deleteTimeout = setTimeout(() => {
        setDisplayText(prev => prev.slice(0, -1));
      }, speed / 2); // Delete a bit faster than typing

      return () => clearTimeout(deleteTimeout);
    }
    // Finished deleting, restart typing
    else if (isDeletingText && displayText.length === 0) {
      setCurrentIndex(0);
      setIsDeletingText(false);
      
      // Small pause before typing again
      const restartTimeout = setTimeout(() => {
        // Ready to type again
      }, 500);
      
      return () => clearTimeout(restartTimeout);
    }
  }, [currentIndex, text, isTyping, speed, isDeletingText, displayText, repeat, repeatDelay]);

  return (
    <span className={className}>
      {displayText}
      {(currentIndex < text.length || isDeletingText) && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ repeat: Infinity, duration: 0.8 }}
          className="inline-block ml-0.5"
        >
          |
        </motion.span>
      )}
    </span>
  );
};

export default TypewriterText;
