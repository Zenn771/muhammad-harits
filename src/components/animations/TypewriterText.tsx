
import React, { useState, useEffect } from 'react';

interface TypewriterTextProps {
  text: string | string[];
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
  const [textArrayIndex, setTextArrayIndex] = useState(0);
  
  // Determine if we're working with an array of strings or a single string
  const isTextArray = Array.isArray(text);
  const currentText = isTextArray ? text[textArrayIndex] : text;
  
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
      if (currentIndex < currentText.length) {
        timeout = setTimeout(() => {
          setDisplayedText(currentText.substring(0, currentIndex + 1));
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
          setDisplayedText(currentText.substring(0, currentIndex - 1));
          setCurrentIndex(prev => prev - 1);
        }, speed / 2); // Delete faster than typing
      } else {
        // Complete deletion, move to next text if array or reset
        if (isTextArray) {
          setTextArrayIndex(prev => (prev + 1) % text.length);
        }
        setIsDeleting(false);
      }
    }
    
    return () => clearTimeout(timeout);
  }, [isTyping, isDeleting, currentIndex, currentText, speed, repeat, isTextArray, text]);
  
  // Add line numbers for code blocks with HTML formatting
  const formatTextWithLineNumbers = (text: string) => {
    if (!text.includes('\n')) return text;
    
    const lines = text.split('\n');
    let result = '';
    
    lines.forEach((line, index) => {
      const lineNumber = index + 1;
      result += `<span class="code-line"><span class="code-line-number">${lineNumber}</span>${line}</span>`;
      if (index < lines.length - 1) {
        result += '\n';
      }
    });
    
    return result;
  };
  
  if (useRawHTML) {
    const formattedText = formatTextWithLineNumbers(displayedText);
    return (
      <div 
        className={className}
        dangerouslySetInnerHTML={{ __html: formattedText }}
        style={{ lineHeight: '1.6' }}
      />
    );
  }
  
  return (
    <div className={className}>{displayedText}</div>
  );
};

export default TypewriterText;
