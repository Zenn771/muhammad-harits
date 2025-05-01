
import React from 'react';
import { cn } from "@/lib/utils";

interface NavbarProps {
  className?: string;
  activeSection?: string;
  scrollBased?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ className, activeSection = 'home', scrollBased = false }) => {
  const handleScrollTo = (sectionId: string, e: React.MouseEvent) => {
    if (scrollBased) {
      e.preventDefault();
      const element = document.getElementById(sectionId);
      if (element) {
        window.scrollTo({
          top: element.offsetTop,
          behavior: 'smooth'
        });
      }
    }
  };

  return (
    <nav className={cn("px-4 py-3 flex justify-center w-full z-50 transition-all duration-300", className)}>
      <div className="backdrop-blur-xl bg-black/30 px-8 py-3 rounded-full border border-white/10 shadow-[0_0_20px_rgba(0,0,0,0.3)]">
        <ul className="flex space-x-10 text-sm font-medium">
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
      </div>
    </nav>
  );
};

export default Navbar;
