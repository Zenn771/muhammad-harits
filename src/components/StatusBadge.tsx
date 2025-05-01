
import React from 'react';

interface StatusBadgeProps {
  status: 'available' | 'unavailable' | 'busy';
  text?: string;
  className?: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ 
  status = 'available',
  text = 'Available for opportunities', 
  className = ''
}) => {
  // Status colors and styles
  const statusStyles = {
    available: 'bg-green-900/20 border-green-500/30 text-green-400',
    unavailable: 'bg-red-900/20 border-red-500/30 text-red-400',
    busy: 'bg-amber-900/20 border-amber-500/30 text-amber-400'
  };
  
  // Status indicator dot styles
  const dotStyles = {
    available: 'bg-green-500',
    unavailable: 'bg-red-500',
    busy: 'bg-amber-500'
  };

  return (
    <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border ${statusStyles[status]} text-xs font-medium ${className}`}>
      <span className={`w-2 h-2 rounded-full animate-pulse ${dotStyles[status]}`}></span>
      {text}
    </div>
  );
};

export default StatusBadge;
