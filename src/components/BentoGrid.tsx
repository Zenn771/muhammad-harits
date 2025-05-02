
import React from 'react';
import BentoCard from './BentoCard';
import { bentoCardsData } from '@/data/bentoCardsData';
import MacBookFrame from './MacBookFrame';
import CodeTerminal from './animations/CodeTerminal';

const BentoBox = () => {
  return (
    <div className="mx-auto max-w-6xl px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {/* First Row - Fixed equal heights for cards */}
        <div className="col-span-1 md:col-span-1 row-span-1 md:h-[340px]">
          <MacBookFrame 
            imageSrc="/placeholder.svg" 
            className="h-full"
            altText="About Me Profile Photo"
            fallbackText="My Photo"
          />
        </div>
        
        <div className="col-span-1 md:col-span-2 md:h-[340px]">
          <BentoCard
            title={bentoCardsData[0].title}
            description={bentoCardsData[0].description}
            icon={React.createElement(bentoCardsData[0].icon, { 
              className: `h-5 w-5 text-${bentoCardsData[0].gradient.split('-')[1]}-300` 
            })}
            gradient={bentoCardsData[0].gradient}
            delay={bentoCardsData[0].delay}
            sizeClasses="h-full"
            disableEffects={true} // Add this prop to disable effects for this card
          >
            <CodeTerminal className="mt-3" />
          </BentoCard>
        </div>
        
        {/* Second Row - Equal height cards */}
        <div className="col-span-1 md:h-[220px]">
          <BentoCard
            title={bentoCardsData[1].title}
            description={bentoCardsData[1].description}
            icon={React.createElement(bentoCardsData[1].icon, { 
              className: `h-5 w-5 text-${bentoCardsData[1].gradient.split('-')[1]}-300` 
            })}
            gradient={bentoCardsData[1].gradient}
            delay={bentoCardsData[1].delay}
            sizeClasses="h-full"
          />
        </div>
        
        <div className="col-span-1 md:h-[220px]">
          <BentoCard
            title={bentoCardsData[2].title}
            description={bentoCardsData[2].description}
            icon={React.createElement(bentoCardsData[2].icon, { 
              className: `h-5 w-5 text-${bentoCardsData[2].gradient.split('-')[1]}-300` 
            })}
            gradient={bentoCardsData[2].gradient}
            delay={bentoCardsData[2].delay}
            sizeClasses="h-full"
          />
        </div>
        
        <div className="col-span-1 md:h-[220px]">
          <BentoCard
            title={bentoCardsData[3].title}
            description={bentoCardsData[3].description}
            icon={React.createElement(bentoCardsData[3].icon, { 
              className: `h-5 w-5 text-${bentoCardsData[3].gradient.split('-')[1]}-300` 
            })}
            gradient={bentoCardsData[3].gradient}
            delay={bentoCardsData[3].delay}
            sizeClasses="h-full"
          />
        </div>
        
        {/* Third Row - Equal height cards */}
        <div className="col-span-1 md:col-span-2 md:h-[240px]">
          <BentoCard
            title={bentoCardsData[4].title}
            description={bentoCardsData[4].description}
            icon={React.createElement(bentoCardsData[4].icon, { 
              className: `h-5 w-5 text-${bentoCardsData[4].gradient.split('-')[1]}-300` 
            })}
            gradient={bentoCardsData[4].gradient}
            delay={bentoCardsData[4].delay}
            sizeClasses="h-full"
          />
        </div>
        
        <div className="col-span-1 md:h-[240px]">
          <BentoCard
            title={bentoCardsData[5].title}
            description={bentoCardsData[5].description}
            icon={React.createElement(bentoCardsData[5].icon, { 
              className: `h-5 w-5 text-${bentoCardsData[5].gradient.split('-')[1]}-300` 
            })}
            gradient={bentoCardsData[5].gradient}
            delay={bentoCardsData[5].delay}
            sizeClasses="h-full"
          />
        </div>
        
        {/* Fourth Row */}
        <div className="col-span-1 md:col-span-3 md:h-[200px]">
          <BentoCard
            title={bentoCardsData[6].title}
            description={bentoCardsData[6].description}
            icon={React.createElement(bentoCardsData[6].icon, { 
              className: `h-5 w-5 text-${bentoCardsData[6].gradient.split('-')[1]}-300` 
            })}
            gradient={bentoCardsData[6].gradient}
            delay={bentoCardsData[6].delay}
            sizeClasses="h-full"
          />
        </div>
      </div>
    </div>
  );
};

export default BentoBox;
