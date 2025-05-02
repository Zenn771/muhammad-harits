
import React from 'react';
import { motion } from 'framer-motion';
import { bentoCardsData } from '@/data/bentoCardsData';
import { 
  EnhancedCard, 
  EnhancedCardContent, 
  EnhancedCardHeader, 
  EnhancedCardTitle 
} from './ui/enhanced-card';

const BentoBox = () => {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1]
      }
    })
  };

  return (
    <div className="mx-auto max-w-6xl px-4">
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        {bentoCardsData.map((card, index) => {
          const Icon = card.icon;
          
          return (
            <motion.div
              key={index}
              custom={index}
              variants={itemVariants}
              className={`${card.sizeClasses} relative overflow-hidden`}
            >
              <EnhancedCard 
                className={`h-full bg-gradient-to-br from-gray-900 to-gray-800 overflow-hidden ${card.gradient}`}
                hoverEffect={true}
                animate={false}
              >
                <EnhancedCardHeader className="relative z-10 border-b-0 bg-transparent">
                  <div className="flex items-center space-x-2">
                    <div className={`p-2 rounded-full bg-gradient-to-br ${card.gradient} bg-opacity-20`}>
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <EnhancedCardTitle className="text-white/90">
                      {card.title}
                    </EnhancedCardTitle>
                  </div>
                </EnhancedCardHeader>
                <EnhancedCardContent className="relative z-10">
                  <p className="text-white/70">{card.description}</p>
                </EnhancedCardContent>

                {/* Background decorative elements */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br opacity-10 blur-2xl rounded-full -mr-10 -mt-10" 
                  style={{ background: `linear-gradient(to bottom right, ${card.gradient.split('-')[1]}-500, ${card.gradient.split('-')[2]}-500)` }} />
                
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr opacity-10 blur-3xl rounded-full -ml-16 -mb-16" 
                  style={{ background: `linear-gradient(to top right, ${card.gradient.split('-')[1]}-700, ${card.gradient.split('-')[2]}-400)` }} />
                
                <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
                <div className="absolute inset-0 grain-effect-subtle opacity-30"></div>
              </EnhancedCard>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default BentoBox;
