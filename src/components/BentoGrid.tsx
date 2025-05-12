
import React from 'react';
import BentoCard from './BentoCard';
import { bentoCardsData } from '@/data/bentoCardsData';
import MacBookFrame from './MacBookFrame';
import CodeTerminal from './animations/CodeTerminal';

const BentoBox = () => {
  // Function to extract color from gradient string
  const getIconColorFromGradient = (gradient: string) => {
    // Extract the primary color from gradient string (format: "from-color-shade/opacity")
    const colorParts = gradient.split('-');
    if (colorParts.length >= 2) {
      const baseColor = colorParts[1].split('/')[0];
      return `text-${baseColor}-400`;
    }
    return 'text-white';
  };

  return (
    <div className="mx-auto max-w-6xl px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {/* First Row */}
        <div className="col-span-1 md:col-span-1 row-span-1 md:h-[340px]">
          <MacBookFrame 
            imageSrc="/profil1.jpg" 
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
              className: getIconColorFromGradient(bentoCardsData[0].gradient)
            })}
            gradient={bentoCardsData[0].gradient}
            delay={bentoCardsData[0].delay}
            sizeClasses="h-full"
            disableEffects={true}
          >
            <CodeTerminal className="mt-3" />
          </BentoCard>
        </div>
        
        {/* Second Row: Electrical Engineering */}
        <div className="col-span-1 md:h-[220px]">
          <BentoCard
            title={bentoCardsData[1].title} // Electrical Engineering
            description={bentoCardsData[1].description}
            icon={React.createElement(bentoCardsData[1].icon, { 
              className: getIconColorFromGradient(bentoCardsData[1].gradient)
            })}
            gradient={bentoCardsData[1].gradient}
            delay={bentoCardsData[1].delay}
            sizeClasses="h-full"
          />
        </div>
        
        {/* Second Row: Programming */}
        <div className="col-span-1 md:h-[220px]">
          <BentoCard
            title={bentoCardsData[2].title} // Programming
            description={bentoCardsData[2].description}
            icon={React.createElement(bentoCardsData[2].icon, { 
              className: getIconColorFromGradient(bentoCardsData[2].gradient)
            })}
            gradient={bentoCardsData[2].gradient}
            delay={bentoCardsData[2].delay}
            sizeClasses="h-full"
          />
        </div>
        
        {/* Second Row: Future Tech */}
        <div className="col-span-1 md:h-[220px]">
          <BentoCard
            title={bentoCardsData[4].title} // Future Tech
            description={bentoCardsData[4].description}
            icon={React.createElement(bentoCardsData[4].icon, { 
              className: getIconColorFromGradient(bentoCardsData[4].gradient)
            })}
            gradient={bentoCardsData[4].gradient}
            delay={bentoCardsData[4].delay}
            sizeClasses="h-full"
          />
        </div>
        
        {/* Third Row: Reading */}
        <div className="col-span-1 md:col-span-3 md:h-[240px]">
          <BentoCard
            title={bentoCardsData[3].title} // Reading
            description={bentoCardsData[3].description}
            icon={React.createElement(bentoCardsData[3].icon, { 
              className: getIconColorFromGradient(bentoCardsData[3].gradient)
            })}
            gradient={bentoCardsData[3].gradient}
            delay={bentoCardsData[3].delay}
            sizeClasses="h-full"
            quote={bentoCardsData[3].quote}
          />
        </div>
      </div>
    </div>
  );
};

export default BentoBox;
