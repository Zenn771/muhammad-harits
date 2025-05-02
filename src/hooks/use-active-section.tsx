
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
      
      // Get all available sections
      const availableSections = sections
        .map(sectionId => {
          const element = document.getElementById(sectionId);
          if (!element) return null;
          
          const rect = element.getBoundingClientRect();
          const sectionTop = rect.top + window.scrollY - offset;
          
          return {
            id: sectionId,
            top: sectionTop,
            bottom: sectionTop + rect.height
          };
        })
        .filter(Boolean) as Array<{id: string, top: number, bottom: number}>;
      
      // Default to first section if we're at the top of the page
      if (window.scrollY < 100 && availableSections.length > 0) {
        setActiveSection(sections[0]);
        history.replaceState(null, '', `#${sections[0]}`);
        return;
      }
      
      // Find the section that is currently in view
      for (const section of availableSections) {
        if (currentPosition >= section.top && currentPosition <= section.bottom) {
          if (activeSection !== section.id) {
            setActiveSection(section.id);
            // Update URL hash without triggering a new history entry
            history.replaceState(null, '', `#${section.id}`);
          }
          return;
        }
      }
      
      // If no section is in view, use the last one or the first one
      if (availableSections.length > 0) {
        const lastSection = availableSections[availableSections.length - 1];
        if (currentPosition > lastSection.bottom) {
          setActiveSection(lastSection.id);
        } else {
          setActiveSection(sections[0]);
        }
      }
    };
    
    // Initial check on mount - this ensures we have the correct section highlighted on load
    setTimeout(handleScroll, 100);
    
    // Add scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections, activeSection, offset, threshold]);

  // Check URL hash on mount to set initial active section
  useEffect(() => {
    const hash = window.location.hash.substring(1);
    if (hash && sections.includes(hash)) {
      setActiveSection(hash);
    } else {
      setActiveSection(sections[0] || '');
    }
  }, [sections]);

  return { activeSection, scrolled };
};

export default useActiveSection;
