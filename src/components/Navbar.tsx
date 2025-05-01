
import React, { useState } from 'react';
import { cn } from "@/lib/utils";
import { useIsMobile } from '@/hooks/use-mobile';
import { useLocation } from 'react-router-dom';
import { Home, Briefcase, Info, Wrench, MessageSquare, Phone } from 'lucide-react';

interface NavbarProps {
  className?: string;
  activeSection?: string;
  scrollBased?: boolean;
}

// Define all navigation items for consistency across the site
export const navigationItems = [
  { id: 'home', label: 'Home', icon: <Home className="h-4 w-4" /> },
  { id: 'about', label: 'About', icon: <Info className="h-4 w-4" /> },
  { id: 'career', label: 'Timeline', icon: <Briefcase className="h-4 w-4" /> },
  { id: 'works', label: 'Works', icon: <Briefcase className="h-4 w-4" /> },
  { id: 'skills', label: 'Skills & Tools', icon: <Wrench className="h-4 w-4" /> },
  { id: 'testimonials', label: 'Testimonials', icon: <MessageSquare className="h-4 w-4" /> },
  { id: 'faq', label: 'FAQ', icon: <MessageSquare className="h-4 w-4" /> },
  { id: 'contact', label: 'Contact', icon: <Phone className="h-4 w-4" /> },
];

const Navbar: React.FC<NavbarProps> = ({ className, activeSection = 'home', scrollBased = false }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const location = useLocation();
  
  const handleScrollTo = (sectionId: string, e: React.MouseEvent) => {
    e.preventDefault();
    
    if (location.pathname !== '/') {
      // If we're not on the home page, navigate to home page with hash
      window.location.href = `/#${sectionId}`;
      return;
    }
    
    const element = document.getElementById(sectionId);
    if (element) {
      const navbarHeight = 80; // Approximate navbar height
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
      "px-4 py-3 flex justify-center w-full z-50 transition-all duration-300", 
      className
    )}>
      <div className="backdrop-blur-xl bg-black/30 px-4 sm:px-8 py-3 rounded-full border border-white/10 shadow-[0_0_20px_rgba(0,0,0,0.3)] w-full max-w-4xl mx-auto flex justify-between items-center glass-effect">
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
          <ul className="flex space-x-4 sm:space-x-6 text-sm font-medium mx-auto">
            {navigationItems.map((item) => (
              <li key={item.id}>
                <a 
                  href={`#${item.id}`} 
                  onClick={(e) => handleScrollTo(item.id, e)}
                  className={cn(
                    "transition-all duration-300 px-2 py-1 relative group flex items-center gap-1.5",
                    activeSection === item.id 
                      ? "text-accent" 
                      : "text-white/80 hover:text-white"
                  )}
                >
                  <span className="hidden sm:inline">{item.icon}</span>
                  <span>{item.label}</span>
                  {activeSection === item.id && (
                    <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-accent rounded-full glow-effect"></span>
                  )}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent rounded-full group-hover:w-full transition-all duration-300"></span>
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
                    "flex items-center justify-center gap-2 py-2 px-4 transition-all",
                    activeSection === item.id 
                      ? "text-accent font-medium" 
                      : "text-white/90 hover:text-white"
                  )}
                >
                  {item.icon}
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
