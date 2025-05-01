
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from "@/lib/utils";

interface NavbarProps {
  className?: string;
}

const Navbar: React.FC<NavbarProps> = ({ className }) => {
  const location = useLocation();

  return (
    <nav className={cn("px-4 py-3 flex justify-center w-full z-50 transition-all duration-300", className)}>
      <div className="backdrop-blur-xl bg-black/30 px-8 py-3 rounded-full border border-white/10 shadow-[0_0_20px_rgba(0,0,0,0.3)]">
        <ul className="flex space-x-10 text-sm font-medium">
          <li>
            <Link 
              to="/" 
              className={cn(
                "transition-all duration-300 px-2 py-1 relative group",
                location.pathname === "/" 
                  ? "text-accent" 
                  : "text-white/80 hover:text-white"
              )}
            >
              Home
              {location.pathname === "/" && (
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-accent"></span>
              )}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300"></span>
            </Link>
          </li>
          <li>
            <Link 
              to="/works" 
              className={cn(
                "transition-all duration-300 px-2 py-1 relative group",
                location.pathname === "/works" 
                  ? "text-accent" 
                  : "text-white/80 hover:text-white"
              )}
            >
              Works
              {location.pathname === "/works" && (
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-accent"></span>
              )}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300"></span>
            </Link>
          </li>
          <li>
            <Link 
              to="/about" 
              className={cn(
                "transition-all duration-300 px-2 py-1 relative group",
                location.pathname === "/about" 
                  ? "text-accent" 
                  : "text-white/80 hover:text-white"
              )}
            >
              About
              {location.pathname === "/about" && (
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-accent"></span>
              )}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300"></span>
            </Link>
          </li>
          <li>
            <Link 
              to="/faq" 
              className={cn(
                "transition-all duration-300 px-2 py-1 relative group",
                location.pathname === "/faq" 
                  ? "text-accent" 
                  : "text-white/80 hover:text-white"
              )}
            >
              FAQ
              {location.pathname === "/faq" && (
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-accent"></span>
              )}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300"></span>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
