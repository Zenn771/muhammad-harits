
import React, { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";
import { useIsMobile } from '@/hooks/use-mobile';
import { useLocation } from 'react-router-dom';

interface NavbarProps {
  className?: string;
  activeSection?: string;
  scrollBased?: boolean;
}

// Define all navigation items for consistency across the site
export const navigationItems = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'career', label: 'Timeline' },
  { id: 'works', label: 'Works' },
  { id: 'skills', label: 'Skills & Tools' },
  { id: 'testimonials', label: 'Testimonials' },
  { id: 'faq', label: 'FAQ' },
  { id: 'contact', label: 'Contact' },
];

const Navbar: React.FC<NavbarProps> = ({ className, activeSection: propActiveSection, scrollBased = true }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(propActiveSection || 'home');
  const isMobile = useIsMobile();
  const location = useLocation();
  
  // Effect to track active section based on scroll position
  useEffect(() => {
    if (!scrollBased) return;
    
    const handleScroll = () => {
      // Get all section elements
      const sections = navigationItems.map(item => {
        return {
          id: item.id,
          element: document.getElementById(item.id)
        };
      }).filter(section => section.element);
      
      // Find which section is currently in view
      const scrollPosition = window.scrollY + 100; // Offset to trigger earlier
      
      // Find last section that has been scrolled past its top
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (!section.element) continue;
        
        const sectionTop = section.element.offsetTop;
        
        if (scrollPosition >= sectionTop) {
          setActiveSection(section.id);
          break;
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    // Trigger once on mount to set initial active section
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrollBased]);
  
  const handleScrollTo = (sectionId: string, e: React.MouseEvent) => {
    e.preventDefault();
    
    if (location.pathname !== '/') {
      window.location.href = `/#${sectionId}`;
      return;
    }
    
    const element = document.getElementById(sectionId);
    if (element) {
      const navbarHeight = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      // Update active section immediately for better UI feedback
      setActiveSection(sectionId);
      
      if (isMenuOpen) {
        setIsMenuOpen(false);
      }
    }
  };

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 px-4 py-3 flex justify-center w-full z-50 transition-all duration-300", 
      className
    )}>
      <div className="backdrop-blur-xl bg-black/40 px-6 sm:px-8 py-4 rounded-full border border-white/10 shadow-lg w-full max-w-4xl mx-auto flex justify-between items-center">
        {/* Mobile menu button */}
        {isMobile && (
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white/90 hover:text-white transition-colors p-2"
            aria-label="Toggle menu"
          >
            <div className="space-y-1.5">
              <span className={`block w-6 h-0.5 bg-white transition-transform ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
              <span className={`block w-6 h-0.5 bg-white transition-opacity ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
              <span className={`block w-6 h-0.5 bg-white transition-transform ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </div>
          </button>
        )}
      
        {/* Desktop menu */}
        {!isMobile && (
          <ul className="flex space-x-6 sm:space-x-8 text-sm font-medium mx-auto">
            {navigationItems.map((item) => (
              <li key={item.id}>
                <a 
                  href={`#${item.id}`} 
                  onClick={(e) => handleScrollTo(item.id, e)}
                  className={cn(
                    "transition-all duration-300 px-3 py-2 relative group",
                    activeSection === item.id 
                      ? "text-accent font-semibold" 
                      : "text-white/80 hover:text-white"
                  )}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-accent rounded-full glow-effect"></span>
                  )}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent/70 rounded-full group-hover:w-full transition-all duration-300"></span>
                </a>
              </li>
            ))}
          </ul>
        )}
        
        {/* Mobile logo/empty div for flex alignment */}
        {isMobile && <div></div>}
      </div>
      
      {/* Mobile menu dropdown */}
      {isMobile && isMenuOpen && (
        <div className="fixed top-[70px] left-0 right-0 bg-black/95 backdrop-blur-xl border-t border-white/10 py-4 z-50 animate-fade-in">
          <ul className="flex flex-col space-y-4 px-8 text-center">
            {navigationItems.map((item) => (
              <li key={item.id}>
                <a 
                  href={`#${item.id}`} 
                  onClick={(e) => handleScrollTo(item.id, e)}
                  className={cn(
                    "flex justify-center py-3 px-4 transition-all rounded-md",
                    activeSection === item.id 
                      ? "text-accent font-medium bg-white/5" 
                      : "text-white/90 hover:text-white hover:bg-white/5"
                  )}
                >
                  <span>{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
