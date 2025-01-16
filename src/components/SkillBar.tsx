import React from 'react';

interface SkillBarProps {
  name: string;
  percentage: number;
}

const SkillBar = ({ name, percentage }: SkillBarProps) => {
  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{name}</span>
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{percentage}%</span>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
        <div
          className="bg-blue-600 dark:bg-blue-500 h-2.5 rounded-full transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default SkillBar;