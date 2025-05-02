
import React from 'react';
import BentoCard from './BentoCard';
import { bentoCardsData } from '@/data/bentoCardsData';
import MacBookFrame from './MacBookFrame';

const BentoBox = () => {
  return (
    <div className="mx-auto max-w-6xl px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {/* MacBook Frame - Placed as first item */}
        <div className="col-span-1 md:col-span-1 lg:col-span-1 row-span-2">
          <MacBookFrame 
            imageSrc="/placeholder.svg" 
            className="h-full"
            altText="About Me Profile Photo"
            fallbackText="My Photo"
          />
        </div>
        
        {/* Regular Bento Cards */}
        {bentoCardsData.map((card, index) => (
          <BentoCard
            key={index}
            title={card.title}
            description={card.description}
            icon={<card.icon className={`h-5 w-5 text-${card.gradient.split('-')[1]}-300`} />}
            gradient={card.gradient}
            delay={card.delay}
            sizeClasses={card.sizeClasses}
          />
        ))}
      </div>
    </div>
  );
};

export default BentoBox;
