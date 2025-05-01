
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
  // Enhanced status colors and styles
  const statusStyles = {
    available: 'bg-green-900/20 border-green-500/40 text-green-400',
    unavailable: 'bg-red-900/20 border-red-500/40 text-red-400',
    busy: 'bg-amber-900/20 border-amber-500/40 text-amber-400'
  };
  
  // Enhanced status indicator dot styles
  const dotStyles = {
    available: 'bg-green-500',
    unavailable: 'bg-red-500',
    busy: 'bg-amber-500'
  };

  // Enhanced shadow styles
  const glowStyles = {
    available: 'shadow-[0_0_15px_rgba(74,222,128,0.2)]',
    unavailable: 'shadow-[0_0_15px_rgba(248,113,113,0.2)]',
    busy: 'shadow-[0_0_15px_rgba(251,191,36,0.2)]'
  };

  return (
    <div className={`inline-flex items-center gap-2 px-5 py-2 rounded-full border backdrop-blur-sm ${statusStyles[status]} ${glowStyles[status]} text-sm font-medium transition-all hover:scale-105 ${className}`}>
      <span className={`w-2 h-2 rounded-full animate-pulse ${dotStyles[status]}`}></span>
      {text}
    </div>
  );
};

export default StatusBadge;
