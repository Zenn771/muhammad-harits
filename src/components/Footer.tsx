
import React from 'react';
import { Instagram, Linkedin, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    {
      name: 'Instagram',
      icon: Instagram,
      href: 'https://instagram.com',
      color: 'hover:text-pink-400'
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      href: 'https://linkedin.com',
      color: 'hover:text-blue-500'
    },
    {
      name: 'Email',
      icon: Mail,
      href: 'mailto:contact@example.com',
      color: 'hover:text-amber-400'
    }
  ];

  return (
    <footer className="w-full py-16 bg-gradient-to-br from-black to-gray-950 relative overflow-hidden">
      {/* Enhanced animated background elements */}
      <div className="absolute inset-0 overflow-hidden z-0">
        {/* Improved gradient background */}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-blue-900/15 to-amber-900/15 z-0"
        />
        
        {/* Larger, more vibrant glowing orbs */}
        <motion.div 
          className="absolute w-56 h-56 rounded-full bg-amber-500/15 blur-3xl"
          animate={{ 
            x: ['-10%', '15%', '-5%'], 
            y: ['5%', '-10%', '8%'],
            scale: [1, 1.1, 0.97, 1.05, 1]
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity, 
            repeatType: 'reverse' 
          }}
          style={{ left: '30%', top: '20%' }}
        />
        
        <motion.div 
          className="absolute w-40 h-40 rounded-full bg-blue-500/15 blur-3xl"
          animate={{ 
            x: ['10%', '-15%', '5%'], 
            y: ['-5%', '10%', '-8%'],
            scale: [1.1, 0.9, 1.05, 0.95, 1.1]
          }}
          transition={{ 
            duration: 25, 
            repeat: Infinity, 
            repeatType: 'reverse' 
          }}
          style={{ right: '25%', bottom: '20%' }}
        />
        
        {/* Additional purple orb for more depth */}
        <motion.div 
          className="absolute w-48 h-48 rounded-full bg-purple-500/10 blur-3xl"
          animate={{ 
            x: ['-5%', '12%', '-8%'], 
            y: ['8%', '-5%', '10%'],
            scale: [0.9, 1.05, 0.95, 1.1, 0.9]
          }}
          transition={{ 
            duration: 18, 
            repeat: Infinity, 
            repeatType: 'reverse' 
          }}
          style={{ left: '60%', top: '50%' }}
        />
      </div>

      {/* Enhanced grid overlay with more visible pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.04] pointer-events-none z-0" />
      
      {/* Subtle grain texture overlay */}
      <div className="absolute inset-0 grain-effect-subtle pointer-events-none z-0"></div>
      
      {/* Content container with increased vertical spacing */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center">
          {/* Enhanced social links */}
          <div className="flex justify-center space-x-8 mb-10">
            {socialLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.href}
                aria-label={link.name}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "w-14 h-14 flex items-center justify-center rounded-full",
                  "bg-white/[0.07] border border-white/15 backdrop-blur-md",
                  "transition-all duration-300 hover:scale-110 shadow-lg",
                  "hover:shadow-[0_0_15px_rgba(255,255,255,0.2)]",
                  link.color
                )}
                whileHover={{ 
                  y: -8,
                  boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)"
                }}
                whileTap={{ scale: 0.92 }}
              >
                <link.icon className="w-6 h-6 text-white/90" />
              </motion.a>
            ))}
          </div>
          
          {/* Enhanced separator with gradient */}
          <motion.div 
            className="w-24 h-0.5 bg-gradient-to-r from-transparent via-white/30 to-transparent mb-8"
            initial={{ width: 0 }}
            animate={{ width: "6rem" }}
            transition={{ 
              duration: 1.5,
              delay: 0.2
            }}
          />
          
          {/* Enhanced copyright text */}
          <motion.p 
            className="text-white/70 text-sm font-light tracking-wider"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            © {currentYear} All Rights Reserved
          </motion.p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
