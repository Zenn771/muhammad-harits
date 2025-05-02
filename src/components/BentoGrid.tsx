
import React from 'react';
import BentoCard from './BentoCard';
import { bentoCardsData } from '@/data/bentoCardsData';

const BentoBox = () => {
  return (
    <div className="mx-auto max-w-6xl px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
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
