import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';
import { gameModes } from '../config/gameModes';

interface GamePlayProps {
  mode: string;
  onGameOver: (score: number) => void;
  isMuted: boolean;
  playWhack: () => void;
  playMiss: () => void;
}

export default function GamePlay({ 
  mode, 
  onGameOver,
  isMuted,
  playWhack,
  playMiss,
}: GamePlayProps) {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [activeMoles, setActiveMoles] = useState<number[]>([]);
  const [lastHit, setLastHit] = useState<number | null>(null);

  const gameMode = gameModes.find(m => m.id === mode) || gameModes[0];
  const gridSize = gameMode.gridSize;

  // Calculate grid cell size based on screen width
  const getCellSize = () => {
    if (typeof window === 'undefined') return 80;
    const screenWidth = window.innerWidth;
    const maxGridWidth = Math.min(screenWidth - 32, 600); // 32px for padding
    return Math.floor(maxGridWidth / Math.sqrt(gridSize));
  };

  const [cellSize, setCellSize] = useState(getCellSize());

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setCellSize(getCellSize());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const spawnMole = useCallback(() => {
    const availableHoles = Array.from({ length: gridSize }, (_, i) => i)
      .filter(i => !activeMoles.includes(i));
    
    if (availableHoles.length === 0) return;
    
    const newMoleIndex = availableHoles[Math.floor(Math.random() * availableHoles.length)];
    setActiveMoles(prev => [...prev, newMoleIndex]);

    const despawnTime = mode === 'speed-rush' ? 750 : 1000;
    setTimeout(() => {
      setActiveMoles(prev => prev.filter(i => i !== newMoleIndex));
      if (!lastHit) playMiss();
    }, despawnTime);
  }, [activeMoles, mode, lastHit, playMiss]);

  useEffect(() => {
    const spawnInterval = mode === 'speed-rush' ? 600 : 800;
    const interval = setInterval(spawnMole, spawnInterval);
    return () => clearInterval(interval);
  }, [spawnMole, mode]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          onGameOver(score);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [score, onGameOver]);

  const handleWhack = (index: number) => {
    if (activeMoles.includes(index)) {
      if (!isMuted) playWhack();
      setScore(prev => prev + 1);
      setLastHit(index);
      setActiveMoles(prev => prev.filter(i => i !== index));
    } else {
      if (!isMuted) playMiss();
      if (mode === 'precision') {
        onGameOver(score);
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="text-center px-4"
    >
      <div className="flex justify-between items-center mb-8">
        <div className="text-xl sm:text-2xl font-bold text-white">
          Score: {score}
        </div>
        <div className="flex items-center space-x-2 text-lg sm:text-xl font-sour text-white">
          <Clock className="h-4 w-4 sm:h-5 sm:w-5" />
          <span>{timeLeft}s</span>
        </div>
      </div>

      <div 
        className={`grid gap-2 sm:gap-4 mx-auto mb-8`}
        style={{ 
          gridTemplateColumns: `repeat(${Math.sqrt(gridSize)}, 1fr)`,
          maxWidth: cellSize * Math.sqrt(gridSize),
        }}
      >
        {Array.from({ length: gridSize }).map((_, index) => (
          <motion.button
            key={index}
            onClick={() => handleWhack(index)}
            className="aspect-square bg-gradient-to-br from-green-800/20 to-green-900/20 
              rounded-xl sm:rounded-2xl border-2 border-green-800 relative overflow-hidden"
            whileTap={{ scale: 0.95 }}
          >
            {activeMoles.includes(index) && (
              <motion.div
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                exit={{ y: 100 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <span className="text-2xl sm:text-4xl">🦫</span>
              </motion.div>
            )}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
} 