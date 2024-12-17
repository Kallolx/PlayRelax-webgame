import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';
import GamePlay from '../GamePlay';
import { Choice } from '../../types';

interface TimeAttackProps {
  onEnd: (score: number) => void;
}

export default function TimeAttack({ onEnd }: TimeAttackProps) {
  const [timeLeft, setTimeLeft] = useState(60);
  const [score, setScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsPlaying(false);
          clearInterval(timer);
          onEnd(score);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [score, onEnd]);

  const handleChoice = (choice: Choice) => {
    // ... game logic
    setScore(prev => prev + 1);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="flex justify-between items-center mb-8">
        <div className="text-2xl font-sour text-white">
          Score: {score}
        </div>
        <div className="flex items-center space-x-2 text-xl font-sour text-white">
          <Clock className="h-5 w-5" />
          <span>{timeLeft}s</span>
        </div>
      </div>

      <GamePlay
        onChoice={handleChoice}
        playerChoice={null}
        computerChoice={null}
        isTimeAttack
      />
    </motion.div>
  );
} 