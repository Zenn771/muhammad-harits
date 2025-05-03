
import React from 'react';
import { motion } from 'framer-motion';

interface ContributionBoxProps {
  filled: boolean;
  intensity: number; // 0 to 4, with 4 being the most intense
  delay: number;
}

const ContributionBox: React.FC<ContributionBoxProps> = ({ filled, intensity, delay }) => {
  // Only generate colors for filled boxes
  const color = filled ? 
    intensity === 1 ? 'bg-yellow-200' : 
    intensity === 2 ? 'bg-yellow-300' : 
    intensity === 3 ? 'bg-yellow-400' : 
    'bg-yellow-500'
    : 'bg-gray-700/50';
  
  return (
    <motion.div 
      className={`w-3 h-3 md:w-3 md:h-3 rounded-sm ${color} transition-colors duration-300 hover:opacity-80`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: delay * 0.01 }}
      whileHover={{ scale: 1.2 }}
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
    const weeks = 26; // Extended to more weeks for a more horizontal display
    const daysPerWeek = 7;
    const contributions = [];
    let counter = 0;

    // Create a pattern with some active days and some inactive days
    for (let week = 0; week < weeks; week++) {
      const weekData = [];
      
      // Every week should have a different pattern
      const activeDay = Math.floor(Math.random() * daysPerWeek);
      const secondaryActiveDay = (activeDay + 2) % daysPerWeek;
      
      for (let day = 0; day < daysPerWeek; day++) {
        counter++;
        // Main active days
        if (day === activeDay) {
          weekData.push({
            filled: true,
            intensity: Math.floor(Math.random() * 2) + 3, // 3-4 intensity
            delay: counter
          });
        }
        // Secondary active days
        else if (day === secondaryActiveDay) {
          weekData.push({
            filled: Math.random() > 0.3, // 70% chance to be filled
            intensity: Math.floor(Math.random() * 2) + 1, // 1-2 intensity
            delay: counter
          });
        }
        // Non-active days
        else {
          weekData.push({
            filled: Math.random() > 0.8, // 20% chance to be filled
            intensity: 1,
            delay: counter
          });
        }
      }
      
      contributions.push(weekData);
    }
    
    return contributions;
  };

  const contributionData = generateContributions();

  return (
    <motion.div 
      className={`${className} p-4 rounded-lg bg-gray-800/50 border border-gray-700/50 backdrop-blur-sm`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="text-sm text-gray-300 mb-3 text-left flex items-center">
        <span className="mr-2">Contribution activity</span>
        <div className="flex-1 h-px bg-gray-700/50"></div>
      </div>
      <div className="flex gap-1 overflow-x-auto pb-2 justify-center md:justify-start">
        {contributionData.map((week, weekIndex) => (
          <div key={`week-${weekIndex}`} className="flex flex-col gap-1">
            {week.map((day, dayIndex) => (
              <ContributionBox 
                key={`day-${weekIndex}-${dayIndex}`} 
                filled={day.filled} 
                intensity={day.intensity}
                delay={day.delay}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="flex justify-between items-center mt-4 text-xs text-gray-400">
        <span>Less</span>
        <div className="flex gap-1">
          <div className="w-3 h-3 rounded-sm bg-gray-700/50"></div>
          <div className="w-3 h-3 rounded-sm bg-yellow-200"></div>
          <div className="w-3 h-3 rounded-sm bg-yellow-300"></div>
          <div className="w-3 h-3 rounded-sm bg-yellow-400"></div>
          <div className="w-3 h-3 rounded-sm bg-yellow-500"></div>
        </div>
        <span>More</span>
      </div>
    </motion.div>
  );
};

export default GitHubContributions;
