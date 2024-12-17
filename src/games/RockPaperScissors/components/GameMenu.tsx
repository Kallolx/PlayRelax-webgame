import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import { gameModes } from '../config/gameModes';

interface GameMenuProps {
  onStart: (mode: string) => void;
}

export default function GameMenu({ onStart }: GameMenuProps) {
  const [selectedMode, setSelectedMode] = useState('classic');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="text-center px-4"
    >
      <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Rock Paper Scissors</h1>
      <p className="text-gray-400 text-base sm:text-lg mb-12">
        Challenge the computer in this classic game with a modern twist!
      </p>
      
      <h2 className="text-xl sm:text-2xl font-bold text-white mb-8">Select Game Mode</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto mb-8">
        {gameModes.map((mode) => {
          const Icon = mode.icon;
          return (
            <motion.button
              key={mode.id}
              onClick={() => setSelectedMode(mode.id)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className={`
                p-4 sm:p-6 rounded-2xl text-left transition-all duration-300
                ${selectedMode === mode.id 
                  ? 'bg-dark-card border-2 border-brand-purple' 
                  : 'bg-dark-card hover:bg-dark-hover'}
              `}
            >
              <div className="flex items-start space-x-4">
                <div className="p-2 sm:p-3 rounded-lg bg-brand-purple/20">
                  <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-brand-purple" />
                </div>
                <div>
                  <h3 className="font-bold text-white mb-1">{mode.name}</h3>
                  <p className="text-xs sm:text-sm text-gray-400 mb-2">
                    {mode.description}
                  </p>
                  <span className={`
                    text-xs px-2 py-1 rounded-full
                    ${mode.difficulty === 'Normal' ? 'bg-green-500/20 text-green-400' :
                      mode.difficulty === 'Hard' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-red-500/20 text-red-400'}
                  `}>
                    {mode.difficulty}
                  </span>
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onStart(selectedMode)}
        className="bg-brand-purple hover:bg-brand-hover text-white py-3 px-8 rounded-xl font-sour flex items-center justify-center space-x-2 transition-colors mx-auto"
      >
        <Play className="h-5 w-5" />
        <span>Start Game</span>
      </motion.button>
    </motion.div>
  );
} 