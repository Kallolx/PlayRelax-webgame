import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';
import { gameModes } from '../config/gameModes';
import { Grid, createEmptyGrid, addNewTile, moveGrid, isGameOver, hasWon } from '../utils/gameLogic';

interface GamePlayProps {
  mode: string;
  onGameOver: (score: number) => void;
  onScore: (score: number) => void;
  isMuted: boolean;
  playMerge: () => void;
}

const tileColors: Record<number, string> = {
  2: 'bg-gray-200 text-gray-800',
  4: 'bg-gray-300 text-gray-800',
  8: 'bg-orange-300 text-white',
  16: 'bg-orange-400 text-white',
  32: 'bg-orange-500 text-white',
  64: 'bg-orange-600 text-white',
  128: 'bg-yellow-300 text-white',
  256: 'bg-yellow-400 text-white',
  512: 'bg-yellow-500 text-white',
  1024: 'bg-yellow-600 text-white',
  2048: 'bg-yellow-700 text-white',
};

export default function GamePlay({ mode, onGameOver, onScore, isMuted, playMerge }: GamePlayProps) {
  const gameMode = gameModes.find(m => m.id === mode) || gameModes[0];
  const gridSize = gameMode.gridSize;
  
  const [grid, setGrid] = useState<Grid>(() => {
    const newGrid = createEmptyGrid(gridSize);
    return addNewTile(addNewTile(newGrid));
  });
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(gameMode.timeLimit || 0);
  const [dragStart, setDragStart] = useState<{ x: number; y: number } | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Update parent score when local score changes
  useEffect(() => {
    onScore(score);
  }, [score, onScore]);

  const handleMove = (direction: 'up' | 'down' | 'left' | 'right') => {
    const { grid: newGrid, score: moveScore } = moveGrid(grid, direction);
    
    if (JSON.stringify(newGrid) !== JSON.stringify(grid)) {
      if (!isMuted && moveScore > 0) playMerge();
      const gridWithNewTile = addNewTile(newGrid);
      setGrid(gridWithNewTile);
      const newScore = score + moveScore;
      setScore(newScore);

      if (hasWon(gridWithNewTile)) {
        onGameOver(newScore);
      } else if (isGameOver(gridWithNewTile)) {
        onGameOver(newScore);
      }
    }
  };

  // Mouse controls
  const handleMouseDown = (e: React.MouseEvent) => {
    setDragStart({ x: e.clientX, y: e.clientY });
    setIsDragging(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragStart || !isDragging) return;

    const deltaX = e.clientX - dragStart.x;
    const deltaY = e.clientY - dragStart.y;
    const minSwipeDistance = 50;

    if (Math.abs(deltaX) > minSwipeDistance || Math.abs(deltaY) > minSwipeDistance) {
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        handleMove(deltaX > 0 ? 'right' : 'left');
      } else {
        handleMove(deltaY > 0 ? 'down' : 'up');
      }
      setDragStart(null);
      setIsDragging(false);
    }
  };

  const handleMouseUp = () => {
    setDragStart(null);
    setIsDragging(false);
  };

  // Touch controls
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    setDragStart({ x: touch.clientX, y: touch.clientY });
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!dragStart) return;

    const touch = e.changedTouches[0];
    const deltaX = touch.clientX - dragStart.x;
    const deltaY = touch.clientY - dragStart.y;
    const minSwipeDistance = 50;

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      if (Math.abs(deltaX) > minSwipeDistance) {
        handleMove(deltaX > 0 ? 'right' : 'left');
      }
    } else {
      if (Math.abs(deltaY) > minSwipeDistance) {
        handleMove(deltaY > 0 ? 'down' : 'up');
      }
    }
    setDragStart(null);
  };

  // Timer for speed mode
  useEffect(() => {
    if (timeLeft > 0) {
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
    }
  }, [timeLeft, score, onGameOver]);

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
        {timeLeft > 0 && (
          <div className="flex items-center space-x-2 text-lg sm:text-xl font-sour text-white">
            <Clock className="h-4 w-4 sm:h-5 sm:w-5" />
            <span>{timeLeft}s</span>
          </div>
        )}
      </div>

      <div
        className="bg-dark-card rounded-xl p-4 mx-auto mb-8"
        style={{ 
          width: '100%',
          maxWidth: '400px',
          aspectRatio: '1/1'
        }}
      >
        <div 
          className="grid gap-2 h-full"
          style={{ 
            gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {grid.map((row, i) => 
            row.map((cell, j) => (
              <div
                key={`${i}-${j}`}
                className={`
                  aspect-square rounded-md flex items-center justify-center
                  text-2xl font-bold select-none
                  ${cell ? tileColors[cell] : 'bg-gray-700/50'}
                `}
              >
                {cell}
              </div>
            ))
          )}
        </div>
      </div>

      <div className="text-gray-400 text-sm">
        Click and drag to move tiles
      </div>
    </motion.div>
  );
} 