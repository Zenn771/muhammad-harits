
import React, { useState } from 'react';
import { cn } from "@/lib/utils";
import { useIsMobile } from '@/hooks/use-mobile';

interface NavbarProps {
  className?: string;
  activeSection?: string;
  scrollBased?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ className, activeSection = 'home', scrollBased = false }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  
  const handleScrollTo = (sectionId: string, e: React.MouseEvent) => {
    if (scrollBased) {
      e.preventDefault();
      const element = document.getElementById(sectionId);
      if (element) {
        window.scrollTo({
          top: element.offsetTop,
          behavior: 'smooth'
        });
        if (isMenuOpen) {
          setIsMenuOpen(false);
        }
      }
    }
  };

  return (
    <nav className={cn("px-4 py-3 flex justify-center w-full z-50 transition-all duration-300", className)}>
      <div className="backdrop-blur-xl bg-black/30 px-4 sm:px-8 py-3 rounded-full border border-white/10 shadow-[0_0_20px_rgba(0,0,0,0.3)] w-full max-w-3xl mx-auto flex justify-between items-center">
        {/* Mobile menu button */}
        {isMobile && (
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white/90 hover:text-white transition-colors p-2"
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
          <ul className="flex space-x-6 sm:space-x-10 text-sm font-medium mx-auto">
            <li>
              <a 
                href="#home" 
                onClick={(e) => handleScrollTo('home', e)}
                className={cn(
                  "transition-all duration-300 px-2 py-1 relative group",
                  activeSection === "home" 
                    ? "text-accent" 
                    : "text-white/80 hover:text-white"
                )}
              >
                Home
                {activeSection === "home" && (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-accent"></span>
                )}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300"></span>
              </a>
            </li>
            <li>
              <a 
                href="#works"
                onClick={(e) => handleScrollTo('works', e)}
                className={cn(
                  "transition-all duration-300 px-2 py-1 relative group",
                  activeSection === "works" 
                    ? "text-accent" 
                    : "text-white/80 hover:text-white"
                )}
              >
                Works
                {activeSection === "works" && (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-accent"></span>
                )}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300"></span>
              </a>
            </li>
            <li>
              <a 
                href="#about"
                onClick={(e) => handleScrollTo('about', e)}
                className={cn(
                  "transition-all duration-300 px-2 py-1 relative group",
                  activeSection === "about" 
                    ? "text-accent" 
                    : "text-white/80 hover:text-white"
                )}
              >
                About
                {activeSection === "about" && (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-accent"></span>
                )}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300"></span>
              </a>
            </li>
            <li>
              <a 
                href="#faq"
                onClick={(e) => handleScrollTo('faq', e)}
                className={cn(
                  "transition-all duration-300 px-2 py-1 relative group",
                  activeSection === "faq" 
                    ? "text-accent" 
                    : "text-white/80 hover:text-white"
                )}
              >
                FAQ
                {activeSection === "faq" && (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-accent"></span>
                )}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300"></span>
              </a>
            </li>
          </ul>
        )}
        
        {/* Mobile logo/empty div for flex alignment */}
        {isMobile && <div></div>}
      </div>
      
      {/* Mobile menu dropdown */}
      {isMobile && isMenuOpen && (
        <div className="fixed top-[70px] left-0 right-0 bg-black/95 backdrop-blur-xl border-t border-white/10 py-4 z-50 animate-fade-in">
          <ul className="flex flex-col space-y-4 px-8 text-center">
            <li>
              <a 
                href="#home" 
                onClick={(e) => handleScrollTo('home', e)}
                className={cn(
                  "block py-2 px-4 transition-all",
                  activeSection === "home" 
                    ? "text-accent font-medium" 
                    : "text-white/90 hover:text-white"
                )}
              >
                Home
              </a>
            </li>
            <li>
              <a 
                href="#works"
                onClick={(e) => handleScrollTo('works', e)}
                className={cn(
                  "block py-2 px-4 transition-all",
                  activeSection === "works" 
                    ? "text-accent font-medium" 
                    : "text-white/90 hover:text-white"
                )}
              >
                Works
              </a>
            </li>
            <li>
              <a 
                href="#about"
                onClick={(e) => handleScrollTo('about', e)}
                className={cn(
                  "block py-2 px-4 transition-all",
                  activeSection === "about" 
                    ? "text-accent font-medium" 
                    : "text-white/90 hover:text-white"
                )}
              >
                About
              </a>
            </li>
            <li>
              <a 
                href="#faq"
                onClick={(e) => handleScrollTo('faq', e)}
                className={cn(
                  "block py-2 px-4 transition-all",
                  activeSection === "faq" 
                    ? "text-accent font-medium" 
                    : "text-white/90 hover:text-white"
                )}
              >
                FAQ
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
