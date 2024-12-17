import React from 'react';
import { motion } from 'framer-motion';
import { RotateCcw, Home, Trophy, Target, Clock, Star, Heart } from 'lucide-react';
import { gameModes } from '../config/gameModes';

interface GameResultsProps {
  score: number;
  mode: string;
  onPlayAgain: () => void;
  onMainMenu: () => void;
  stats?: {
    enemiesDefeated: number;
    bossesDefeated: number;
    wavesCompleted: number;
    timeElapsed: number;
    accuracy: number;
  };
  reason?: 'hearts' | 'time';
}

export default function GameResults({
  score,
  mode,
  onPlayAgain,
  onMainMenu,
  stats = {
    enemiesDefeated: 0,
    bossesDefeated: 0,
    wavesCompleted: 0,
    timeElapsed: 0,
    accuracy: 0,
  },
  reason = 'time',
}: GameResultsProps) {
  const gameMode = gameModes.find(m => m.id === mode) || gameModes[0];

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

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
        className={`text-4xl sm:text-5xl font-bold mb-8 sm:mb-12 ${reason === 'hearts' ? 'text-red-500' : 'text-green-500'}`}
      >
        Game Over!
      </motion.h2>

      {/* Game Over Reason */}
      <div className={`text-lg sm:text-xl mb-8 ${reason === 'hearts' ? 'text-red-400' : 'text-gray-400'}`}>
        {reason === 'hearts' ? (
          <div className="flex items-center justify-center gap-2">
            <Heart className="h-6 w-6" />
            <span>Out of Lives!</span>
          </div>
        ) : (
          <div className="flex items-center justify-center gap-2">
            <Clock className="h-6 w-6" />
            <span>Time's Up!</span>
          </div>
        )}
      </div>

      <div className="bg-dark-card rounded-2xl p-6 sm:p-8 mb-8 sm:mb-12">
        {/* Final Score */}
        <div className="text-3xl sm:text-4xl font-bold text-white mb-8 flex items-center justify-center gap-3">
          <Trophy className="h-8 w-8 text-yellow-500" />
          <span>{score} Points</span>
        </div>

        {/* Game Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div className="bg-dark-hover rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Target className="h-5 w-5 text-red-500" />
                <span className="text-gray-300">Enemies Defeated</span>
              </div>
              <span className="text-white font-bold">{stats.enemiesDefeated}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-500" />
                <span className="text-gray-300">Bosses Defeated</span>
              </div>
              <span className="text-white font-bold">{stats.bossesDefeated}</span>
            </div>
          </div>

          <div className="bg-dark-hover rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-blue-500" />
                <span className="text-gray-300">Time Survived</span>
              </div>
              <span className="text-white font-bold">{formatTime(stats.timeElapsed)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Accuracy</span>
              <span className="text-white font-bold">{Math.round(stats.accuracy)}%</span>
            </div>
          </div>
        </div>

        {/* Game Mode Info */}
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