
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from "@/lib/utils";

interface NavbarProps {
  className?: string;
}

const Navbar: React.FC<NavbarProps> = ({ className }) => {
  return (
    <nav className={cn("px-4 py-3 flex justify-center w-full z-50", className)}>
      <div className="backdrop-blur-md bg-black/30 px-6 py-2 rounded-full border border-white/10">
        <ul className="flex space-x-8 text-sm font-medium">
          <li>
            <Link to="/" className="text-white hover:text-accent transition-colors px-2 py-1">
              Home
            </Link>
          </li>
          <li>
            <Link to="/works" className="text-white/80 hover:text-accent transition-colors px-2 py-1">
              Works
            </Link>
          </li>
          <li>
            <Link to="/about" className="text-white/80 hover:text-accent transition-colors px-2 py-1">
              About
            </Link>
          </li>
          <li>
            <Link to="/faq" className="text-white/80 hover:text-accent transition-colors px-2 py-1">
              FAQ
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
