
import React, { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";
import { useIsMobile } from '@/hooks/use-mobile';
import { useLocation } from 'react-router-dom';
import { useActiveSection } from '@/hooks/use-active-section';

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

const Navbar: React.FC<NavbarProps> = ({ className, scrollBased = true }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const location = useLocation();
  
  // Use the custom hook for tracking active section
  const { activeSection, scrolled } = useActiveSection({
    sections: navigationItems.map(item => item.id),
    offset: 100,
    threshold: 0.3
  });
  
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
      
      if (isMenuOpen) {
        setIsMenuOpen(false);
      }
    }
  };

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 px-4 py-3 flex justify-center w-full z-50 transition-all duration-300", 
      scrolled ? "py-2" : "py-4",
      className
    )}>
      <div className={cn(
        "backdrop-blur-xl border border-white/10 shadow-lg w-full max-w-4xl mx-auto flex justify-between items-center rounded-full",
        scrolled ? "bg-black/60 py-2 px-4 sm:px-6" : "bg-black/40 py-3 px-6 sm:px-8"
      )}>
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
          <ul className="flex space-x-1 sm:space-x-2 text-sm font-medium mx-auto">
            {navigationItems.map((item) => (
              <li key={item.id}>
                <a 
                  href={`#${item.id}`} 
                  onClick={(e) => handleScrollTo(item.id, e)}
                  className={cn(
                    "transition-all duration-300 px-2 sm:px-3 py-2 relative rounded-md group flex items-center",
                    activeSection === item.id 
                      ? "text-white font-semibold bg-white/10" 
                      : "text-white/70 hover:text-white hover:bg-white/5"
                  )}
                >
                  <span>{item.label}</span>
                  {activeSection === item.id && (
                    <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-accent rounded-full glow-effect"></span>
                  )}
                </a>
              </li>
            ))}
          </ul>
        )}
        
        {/* Mobile logo/empty div for flex alignment */}
        {isMobile && <div className="text-sm font-medium text-white">Menu</div>}
      </div>
      
      {/* Mobile menu dropdown - improved styling */}
      {isMobile && isMenuOpen && (
        <div className="fixed top-[70px] left-4 right-4 bg-black/95 backdrop-blur-xl border border-white/10 py-4 z-50 rounded-2xl shadow-lg animate-in fade-in slide-in-from-top duration-300">
          <ul className="flex flex-col space-y-2 px-4">
            {navigationItems.map((item) => (
              <li key={item.id}>
                <a 
                  href={`#${item.id}`} 
                  onClick={(e) => handleScrollTo(item.id, e)}
                  className={cn(
                    "flex items-center py-3 px-4 transition-all rounded-md",
                    activeSection === item.id 
                      ? "text-white font-medium bg-white/10 border-l-2 border-accent" 
                      : "text-white/80 hover:text-white hover:bg-white/5"
                  )}
                >
                  <span className="ml-2">{item.label}</span>
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
