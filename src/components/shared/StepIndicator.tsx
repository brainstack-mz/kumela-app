'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  stepLabels: string[];
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({
  currentStep,
  totalSteps,
  stepLabels,
}) => {
  return (
    <div className="flex items-center justify-center mb-8">
      <div className="flex items-center space-x-4">
        {Array.from({ length: totalSteps }, (_, index) => (
          <React.Fragment key={index}>
            <div className="flex flex-col items-center">
              <motion.div
                initial={false}
                animate={{
                  backgroundColor: index < currentStep ? '#10B981' : index === currentStep ? '#10B981' : '#E5E7EB',
                  scale: index === currentStep ? 1.1 : 1,
                }}
                transition={{ duration: 0.3 }}
                className={`
                  w-8 h-8 rounded-full flex items-center justify-center
                  text-sm font-medium transition-all duration-300
                  ${index <= currentStep ? 'text-white' : 'text-gray-500'}
                `}
              >
                {index < currentStep ? '✓' : index + 1}
              </motion.div>
              <span className={`
                text-xs mt-2 text-center max-w-20
                ${index <= currentStep ? 'text-green-600 font-medium' : 'text-gray-500'}
              `}>
                {stepLabels[index]}
              </span>
            </div>
            {index < totalSteps - 1 && (
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ 
                  scaleX: index < currentStep ? 1 : 0,
                  backgroundColor: index < currentStep ? '#10B981' : '#E5E7EB'
                }}
                transition={{ duration: 0.3 }}
                className="w-12 h-0.5 origin-left"
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
