import React from 'react';
import { motion } from 'framer-motion';
import { RotateCcw, Home } from 'lucide-react';
import { gameModes } from '../config/gameModes';
import { choices } from '../styles';

interface GameResultsProps {
  result: string;
  playerChoice: string;
  computerChoice: string;
  score: number;
  onPlayAgain: () => void;
  onMainMenu: () => void;
}

export default function GameResults({
  result,
  playerChoice,
  computerChoice,
  score,
  onPlayAgain,
  onMainMenu,
}: GameResultsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="text-center px-4"
    >
      <motion.h2 
        initial={{ scale: 0.5 }}
        animate={{ scale: 1 }}
        className={`text-4xl sm:text-5xl font-bold mb-8 sm:mb-12
          ${result === 'win' ? 'text-green-500' : 
            result === 'lose' ? 'text-red-500' : 
            'text-yellow-500'}
        `}
      >
        {result === 'win' ? 'You Win!' : result === 'lose' ? 'You Lose!' : 'Draw!'}
      </motion.h2>

      <div className="grid grid-cols-2 gap-4 sm:gap-8 max-w-xl mx-auto mb-8 sm:mb-12">
        <div className="space-y-2 sm:space-y-4">
          <h3 className="text-lg sm:text-xl font-bold text-white">Your Choice</h3>
          <div className={`
            aspect-square rounded-2xl bg-gradient-to-br
            ${choices.find(c => c.id === playerChoice)?.color}
            border-2 ${choices.find(c => c.id === playerChoice)?.borderColor}
            flex items-center justify-center
          `}>
            <span className="text-4xl sm:text-6xl">
              {choices.find(c => c.id === playerChoice)?.icon}
            </span>
          </div>
        </div>
        <div className="space-y-2 sm:space-y-4">
          <h3 className="text-lg sm:text-xl font-bold text-white">AI's Choice</h3>
          <div className={`
            aspect-square rounded-2xl bg-gradient-to-br
            ${choices.find(c => c.id === computerChoice)?.color}
            border-2 ${choices.find(c => c.id === computerChoice)?.borderColor}
            flex items-center justify-center
          `}>
            <span className="text-4xl sm:text-6xl">
              {choices.find(c => c.id === computerChoice)?.icon}
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onPlayAgain}
          className="w-full sm:w-auto bg-brand-purple hover:bg-brand-hover text-white py-3 px-8 rounded-xl font-sour flex items-center justify-center space-x-2 transition-colors"
        >
          <RotateCcw className="h-5 w-5" />
          <span>Play Again</span>
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onMainMenu}
          className="w-full sm:w-auto bg-gray-700 hover:bg-gray-600 text-white py-3 px-8 rounded-xl font-sour flex items-center justify-center space-x-2 transition-colors"
        >
          <Home className="h-5 w-5" />
          <span>Main Menu</span>
        </motion.button>
      </div>
    </motion.div>
  );
} 