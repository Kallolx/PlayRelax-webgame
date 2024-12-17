import React from 'react';
import { motion } from 'framer-motion';
import { RotateCcw, Home } from 'lucide-react';
import { gameModes } from '../config/gameModes';

interface GameResultsProps {
  result: 'win' | 'lose' | 'draw' | null;
  mode: string;
  onPlayAgain: () => void;
  onMainMenu: () => void;
}

export default function GameResults({
  result,
  mode,
  onPlayAgain,
  onMainMenu,
}: GameResultsProps) {
  const gameMode = gameModes.find(m => m.id === mode) || gameModes[0];

  const getResultMessage = () => {
    if (mode === 'two-player') {
      return result === 'win' ? 'Player X Wins!' : result === 'lose' ? 'Player O Wins!' : 'It\'s a Draw!';
    }
    return result === 'win' ? 'You Win!' : result === 'lose' ? 'AI Wins!' : 'It\'s a Draw!';
  };

  const getResultColor = () => {
    return result === 'win' ? 'text-green-500' : 
           result === 'lose' ? 'text-red-500' : 
           'text-yellow-500';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="text-center"
    >
      <motion.h2 
        initial={{ scale: 0.5 }}
        animate={{ scale: 1 }}
        className={`text-5xl font-bold mb-12 ${getResultColor()}`}
      >
        {getResultMessage()}
      </motion.h2>

      <div className="bg-dark-card rounded-2xl p-8 mb-12">
        <div className="text-gray-400 mb-4">
          Mode: {gameMode.name}
        </div>
        <div className={`
          inline-block px-3 py-1 rounded-full text-sm
          ${gameMode.difficulty === 'Normal' ? 'bg-green-500/20 text-green-400' :
            gameMode.difficulty === 'Hard' ? 'bg-yellow-500/20 text-yellow-400' :
            'bg-red-500/20 text-red-400'}
        `}>
          {gameMode.difficulty}
        </div>
      </div>

      <div className="flex justify-center space-x-6">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onPlayAgain}
          className="bg-brand-purple hover:bg-brand-hover text-white py-3 px-8 rounded-xl font-sour flex items-center space-x-2 transition-colors"
        >
          <RotateCcw className="h-5 w-5" />
          <span>Play Again</span>
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onMainMenu}
          className="bg-gray-700 hover:bg-gray-600 text-white py-3 px-8 rounded-xl font-sour flex items-center space-x-2 transition-colors"
        >
          <Home className="h-5 w-5" />
          <span>Main Menu</span>
        </motion.button>
      </div>
    </motion.div>
  );
} 