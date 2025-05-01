
import { useState, useEffect } from 'react';

interface UseActiveSectionOptions {
  sections: string[];
  offset?: number;
  threshold?: number;
}

export const useActiveSection = ({
  sections,
  offset = 100,
  threshold = 0.3
}: UseActiveSectionOptions) => {
  const [activeSection, setActiveSection] = useState<string>(sections[0] || '');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Check if page has scrolled enough to change navbar appearance
      setScrolled(window.scrollY > 50);
      
      // Find which section is currently in view
      const currentPosition = window.scrollY + window.innerHeight * threshold;
      
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (!element) continue;
        
        const rect = element.getBoundingClientRect();
        const sectionTop = rect.top + window.scrollY - offset;
        const sectionBottom = sectionTop + rect.height;
        
        if (currentPosition >= sectionTop && currentPosition <= sectionBottom) {
          // Found the active section
          if (activeSection !== sectionId) {
            setActiveSection(sectionId);
            // Optionally update URL hash without triggering a new history entry
            history.replaceState(null, '', `#${sectionId}`);
          }
          break;
        }
      }
    };
    
    // Initial check on mount
    handleScroll();
    
    // Add scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections, activeSection, offset, threshold]);

  return { activeSection, scrolled };
};

export default useActiveSection;
