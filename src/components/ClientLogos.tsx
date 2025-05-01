
import React from 'react';

const ClientLogos: React.FC = () => {
  const clients = [
    { name: 'Duolingo', opacity: 0.7 },
    { name: 'Netflix', opacity: 0.7 },
    { name: 'Disney', opacity: 0.7 },
    { name: 'Airbnb', opacity: 0.7 },
    { name: 'Microsoft', opacity: 0.7 },
  ];

  return (
    <div className="w-full mt-24 px-4">
      <h3 className="text-center text-xs uppercase tracking-widest text-white/50 mb-8 font-medium">
        CURATED WORK
      </h3>
      <div className="flex flex-wrap items-center justify-center gap-12">
        {clients.map((client, index) => (
          <div 
            key={index} 
            className="h-8 hover:scale-110 transition-all duration-300 relative group"
            style={{ 
              opacity: client.opacity,
              animationDelay: `${index * 0.2}s` 
            }}
          >
            <span className="text-lg font-bold tracking-wide text-white/80 relative">
              {client.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300"></span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClientLogos;
