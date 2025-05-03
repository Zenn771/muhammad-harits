
import React from 'react';

interface ContributionBoxProps {
  filled: boolean;
  intensity: number; // 0 to 4, with 4 being the most intense
}

const ContributionBox: React.FC<ContributionBoxProps> = ({ filled, intensity }) => {
  // Only generate colors for filled boxes
  const color = filled ? 
    intensity === 1 ? 'bg-yellow-200' : 
    intensity === 2 ? 'bg-yellow-300' : 
    intensity === 3 ? 'bg-yellow-400' : 
    'bg-yellow-500'
    : 'bg-gray-200';
  
  return (
    <div 
      className={`w-3 h-3 md:w-4 md:h-4 rounded-sm ${color} transition-colors duration-300 hover:opacity-80`}
      title={filled ? `${intensity} contributions` : "No contributions"}
    />
  );
};

interface GitHubContributionsProps {
  className?: string;
}

const GitHubContributions: React.FC<GitHubContributionsProps> = ({ className }) => {
  // Generate a semi-random pattern for contributions
  // This will create a pattern with some clusters of activity
  const generateContributions = () => {
    const weeks = 12;
    const daysPerWeek = 7;
    const contributions = [];

    // Create a pattern with some active days and some inactive days
    for (let week = 0; week < weeks; week++) {
      const weekData = [];
      
      // Every week should have a different pattern
      const activeDay = Math.floor(Math.random() * daysPerWeek);
      const secondaryActiveDay = (activeDay + 2) % daysPerWeek;
      
      for (let day = 0; day < daysPerWeek; day++) {
        // Main active days
        if (day === activeDay) {
          weekData.push({
            filled: true,
            intensity: Math.floor(Math.random() * 2) + 3 // 3-4 intensity
          });
        }
        // Secondary active days
        else if (day === secondaryActiveDay) {
          weekData.push({
            filled: Math.random() > 0.3, // 70% chance to be filled
            intensity: Math.floor(Math.random() * 2) + 1 // 1-2 intensity
          });
        }
        // Non-active days
        else {
          weekData.push({
            filled: Math.random() > 0.8, // 20% chance to be filled
            intensity: 1
          });
        }
      }
      
      contributions.push(weekData);
    }
    
    return contributions;
  };

  const contributionData = generateContributions();

  return (
    <div className={`${className} p-2 rounded-md bg-gray-100/10`}>
      <div className="text-xs text-gray-400 mb-2 text-left">Contribution activity</div>
      <div className="flex gap-1 justify-center">
        {contributionData.map((week, weekIndex) => (
          <div key={`week-${weekIndex}`} className="flex flex-col gap-1">
            {week.map((day, dayIndex) => (
              <ContributionBox 
                key={`day-${weekIndex}-${dayIndex}`} 
                filled={day.filled} 
                intensity={day.intensity} 
              />
            ))}
          </div>
        ))}
      </div>
      <div className="flex justify-between items-center mt-3 text-xs text-gray-400">
        <span>Less</span>
        <div className="flex gap-1">
          <div className="w-2 h-2 rounded-sm bg-gray-200"></div>
          <div className="w-2 h-2 rounded-sm bg-yellow-200"></div>
          <div className="w-2 h-2 rounded-sm bg-yellow-300"></div>
          <div className="w-2 h-2 rounded-sm bg-yellow-400"></div>
          <div className="w-2 h-2 rounded-sm bg-yellow-500"></div>
        </div>
        <span>More</span>
      </div>
    </div>
  );
};

export default GitHubContributions;
