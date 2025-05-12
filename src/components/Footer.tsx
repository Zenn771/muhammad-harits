
import React from 'react';
import { Instagram, Linkedin, Mail, Github } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    {
      name: 'Instagram',
      icon: Instagram,
      href: 'https://www.instagram.com/haritszenn_',
      color: 'hover:text-pink-400'
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      href: 'https://www.linkedin.com/in/muhammad-harits7',
      color: 'hover:text-blue-500'
    },
    {
      name: 'Email',
      icon: Mail,
      href: 'mailto:haritsnaufal479@gmail.com',
      color: 'hover:text-amber-400'
    },
    {
      name: 'Github',
      icon: Github,
      href: 'https://github.com/Zenn711',
      color: 'hover:text-amber-400'
    }
  ];

  return (
    <footer className="w-full py-12 bg-black relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div 
          className="absolute inset-0 bg-gradient-to-br from-blue-900/10 to-amber-900/10 z-0"
        />
        
        {/* Glowing orbs in the background */}
        <motion.div 
          className="absolute w-40 h-40 rounded-full bg-amber-500/10 blur-3xl"
          animate={{ 
            x: ['-10%', '15%', '-5%'], 
            y: ['5%', '-10%', '8%'] 
          }}
          transition={{ 
            duration: 15, 
            repeat: Infinity, 
            repeatType: 'reverse' 
          }}
          style={{ left: '30%', top: '20%' }}
        />
        
        <motion.div 
          className="absolute w-32 h-32 rounded-full bg-blue-500/10 blur-3xl"
          animate={{ 
            x: ['10%', '-15%', '5%'], 
            y: ['-5%', '10%', '-8%'] 
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity, 
            repeatType: 'reverse' 
          }}
          style={{ right: '25%', bottom: '20%' }}
        />
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none z-0" />
      
      {/* Content container */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center">
          {/* Social links */}
          <div className="flex justify-center space-x-6 mb-8">
            {socialLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.href}
                aria-label={link.name}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "w-12 h-12 flex items-center justify-center rounded-full",
                  "bg-white/5 border border-white/10 backdrop-blur-sm",
                  "transition-all duration-300 hover:scale-110",
                  link.color
                )}
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <link.icon className="w-5 h-5 text-white/80" />
              </motion.a>
            ))}
          </div>
          
          {/* Separator */}
          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-white/20 to-transparent mb-6" />
          
          {/* Copyright */}
          <p className="text-white/60 text-sm">
            © {currentYear} All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
