import React from 'react';
import { motion } from 'framer-motion';
import { choices } from '../styles';

interface GamePlayProps {
  onChoice: (choice: string) => void;
  playerChoice: string | null;
  computerChoice: string | null;
  isTimeAttack?: boolean;
}

export default function GamePlay({ onChoice, playerChoice, computerChoice, isTimeAttack }: GamePlayProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="text-center"
    >
      {!playerChoice ? (
        <>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">
            Choose Your Weapon
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto px-4">
            {choices.map((choice) => (
              <motion.button
                key={choice.id}
                onClick={() => !playerChoice && onChoice(choice.id)}
                disabled={!!playerChoice}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`
                  relative group aspect-square rounded-2xl bg-gradient-to-br ${choice.color}
                  border-2 ${choice.borderColor} p-4 sm:p-8 transition-all duration-300
                  ${playerChoice ? 'opacity-50 cursor-not-allowed' : `hover:shadow-xl hover:${choice.shadowColor}`}
                  disabled:transform-none
                `}
              >
                <div className="flex flex-col items-center justify-center h-full">
                  <span className="text-4xl sm:text-7xl mb-2 sm:mb-4 transform group-hover:scale-110 transition-transform">
                    {choice.icon}
                  </span>
                  <span className="text-white font-sour text-lg sm:text-xl">
                    {choice.label}
                  </span>
                </div>
              </motion.button>
            ))}
          </div>
        </>
      ) : (
        <div className="space-y-12 px-4">
          <div className="grid grid-cols-2 gap-8 max-w-2xl mx-auto">
            <div className="space-y-4">
              <h3 className="text-xl sm:text-2xl font-bold text-white">You</h3>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className={`
                  aspect-square rounded-2xl bg-gradient-to-br
                  ${choices.find(c => c.id === playerChoice)?.color}
                  border-2 ${choices.find(c => c.id === playerChoice)?.borderColor}
                  flex items-center justify-center
                `}
              >
                <span className="text-5xl sm:text-7xl">
                  {choices.find(c => c.id === playerChoice)?.icon}
                </span>
              </motion.div>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                {isTimeAttack ? 'Computer' : 'AI'}
              </h3>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className={`
                  aspect-square rounded-2xl bg-gradient-to-br
                  ${computerChoice ? choices.find(c => c.id === computerChoice)?.color : 'bg-gray-700'}
                  border-2 ${computerChoice ? choices.find(c => c.id === computerChoice)?.borderColor : 'border-gray-600'}
                  flex items-center justify-center
                `}
              >
                <span className="text-5xl sm:text-7xl">
                  {computerChoice ? choices.find(c => c.id === computerChoice)?.icon : '?'}
                </span>
              </motion.div>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
} 