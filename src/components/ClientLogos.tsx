
import React from 'react';

const ClientLogos: React.FC = () => {
  const clients = [
    { name: 'Duolingo', opacity: 0.5 },
    { name: 'Netflix', opacity: 0.5 },
    { name: 'Disney', opacity: 0.5 },
    { name: 'Airbnb', opacity: 0.5 },
    { name: 'Microsoft', opacity: 0.5 },
  ];

  return (
    <div className="w-full mt-24">
      <h3 className="text-center text-xs uppercase tracking-widest text-white/50 mb-8">
        CURATED WORK
      </h3>
      <div className="flex flex-wrap items-center justify-center gap-12 opacity-50">
        {clients.map((client, index) => (
          <div key={index} className="h-8 grayscale hover:grayscale-0 transition-all duration-300" style={{ opacity: client.opacity }}>
            <span className="text-lg font-bold tracking-wide text-white/80">{client.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClientLogos;
