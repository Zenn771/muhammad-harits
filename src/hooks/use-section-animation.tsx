
import { useState, useEffect, useRef } from 'react';

interface SectionAnimationOptions {
  rootMargin?: string;
  threshold?: number;
  triggerOnce?: boolean;
  delay?: number;
}

export const useSectionAnimation = ({
  rootMargin = "-100px 0px",
  threshold = 0.1,
  triggerOnce = true,
  delay = 0
}: SectionAnimationOptions = {}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const currentRef = ref.current;
    
    // Make sure the ref element has a non-static position
    if (currentRef) {
      const currentPosition = window.getComputedStyle(currentRef).position;
      if (currentPosition === 'static') {
        currentRef.style.position = 'relative';
      }
    }
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Add delay if specified
          if (delay) {
            setTimeout(() => {
              setIsVisible(true);
            }, delay);
          } else {
            setIsVisible(true);
          }

          // Unobserve if triggerOnce is true
          if (triggerOnce && currentRef) {
            observer.unobserve(currentRef);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      { rootMargin, threshold }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [rootMargin, threshold, triggerOnce, delay]);

  return { ref, isVisible };
};

export default useSectionAnimation;
