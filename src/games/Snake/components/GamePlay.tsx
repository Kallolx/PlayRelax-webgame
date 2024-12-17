import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Clock, ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react';
import { gameModes } from '../config/gameModes';

interface GamePlayProps {
  mode: string;
  onGameOver: (score: number) => void;
  isMuted: boolean;
  playEat: () => void;
}

type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
type Position = { x: number; y: number };

// Adjust grid size based on screen size
const GRID_SIZE = 15; // Smaller grid for better mobile experience
const calculateCellSize = () => {
  if (typeof window === 'undefined') return 20;
  const screenWidth = window.innerWidth;
  const maxGridWidth = Math.min(screenWidth - 32, 600); // 32px for padding
  return Math.floor(maxGridWidth / GRID_SIZE);
};

export default function GamePlay({ mode, onGameOver, isMuted, playEat }: GamePlayProps) {
  const [cellSize, setCellSize] = useState(calculateCellSize());
  const [snake, setSnake] = useState<Position[]>([{ x: 7, y: 7 }]);
  const [food, setFood] = useState<Position>({ x: 11, y: 7 });
  const [direction, setDirection] = useState<Direction>('RIGHT');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(mode === 'timed' ? 60 : 0);
  const [isPaused, setIsPaused] = useState(false);
  
  const gameMode = gameModes.find(m => m.id === mode) || gameModes[0];

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setCellSize(calculateCellSize());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const generateFood = useCallback(() => {
    const newFood = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE)
    };
    setFood(newFood);
  }, []);

  const checkCollision = useCallback((head: Position) => {
    // Wall collision
    if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
      return true;
    }
    // Self collision
    return snake.some(segment => segment.x === head.x && segment.y === head.y);
  }, [snake]);

  // Prevent page scrolling when using arrow keys
  useEffect(() => {
    const preventScroll = (e: KeyboardEvent) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'w', 'a', 's', 'd'].includes(e.key)) {
        e.preventDefault();
      }
    };

    window.addEventListener('keydown', preventScroll);
    return () => window.removeEventListener('keydown', preventScroll);
  }, []);

  // Update key controls to include WASD
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      switch (e.key.toLowerCase()) {
        case 'arrowup':
        case 'w':
          if (direction !== 'DOWN') setDirection('UP');
          break;
        case 'arrowdown':
        case 's':
          if (direction !== 'UP') setDirection('DOWN');
          break;
        case 'arrowleft':
        case 'a':
          if (direction !== 'RIGHT') setDirection('LEFT');
          break;
        case 'arrowright':
        case 'd':
          if (direction !== 'LEFT') setDirection('RIGHT');
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [direction]);

  // Add mobile controls
  const handleTouchControl = (newDirection: Direction) => {
    switch (newDirection) {
      case 'UP':
        if (direction !== 'DOWN') setDirection('UP');
        break;
      case 'DOWN':
        if (direction !== 'UP') setDirection('DOWN');
        break;
      case 'LEFT':
        if (direction !== 'RIGHT') setDirection('LEFT');
        break;
      case 'RIGHT':
        if (direction !== 'LEFT') setDirection('RIGHT');
        break;
    }
  };

  useEffect(() => {
    const moveSnake = () => {
      const head = { ...snake[0] };
      
      switch (direction) {
        case 'UP':
          head.y -= 1;
          break;
        case 'DOWN':
          head.y += 1;
          break;
        case 'LEFT':
          head.x -= 1;
          break;
        case 'RIGHT':
          head.x += 1;
          break;
      }

      if (checkCollision(head)) {
        onGameOver(score);
        return;
      }

      const newSnake = [head, ...snake];
      
      if (head.x === food.x && head.y === food.y) {
        if (!isMuted) playEat();
        setScore(prev => prev + 1);
        generateFood();
      } else {
        newSnake.pop();
      }

      setSnake(newSnake);
    };

    const gameInterval = setInterval(moveSnake, gameMode.speed);
    return () => clearInterval(gameInterval);
  }, [snake, direction, food, gameMode.speed, checkCollision, generateFood, onGameOver, score, isMuted, playEat]);

  // Timer for timed mode
  useEffect(() => {
    if (mode === 'timed' && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            onGameOver(score);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [mode, timeLeft, score, onGameOver]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="text-center"
    >
      <div className="flex justify-between items-center mb-8">
        <div className="text-2xl font-bold text-white">
          Score: {score}
        </div>
        {mode === 'timed' && (
          <div className="flex items-center space-x-2 text-xl font-sour text-white">
            <Clock className="h-5 w-5" />
            <span>{timeLeft}s</span>
          </div>
        )}
      </div>

      <div 
        className="relative bg-dark-card border-2 border-gray-700 rounded-lg mx-auto mb-8"
        style={{ 
          width: GRID_SIZE * cellSize,
          height: GRID_SIZE * cellSize,
          maxWidth: '100%',
          aspectRatio: '1/1'
        }}
      >
        {/* Food */}
        <div
          className="absolute bg-red-500 rounded-full"
          style={{
            width: cellSize - 2,
            height: cellSize - 2,
            left: food.x * cellSize,
            top: food.y * cellSize,
            transform: 'translate(1px, 1px)'
          }}
        />
        
        {/* Snake */}
        {snake.map((segment, index) => (
          <motion.div
            key={index}
            className="absolute bg-green-500 rounded-sm"
            style={{
              width: cellSize - 2,
              height: cellSize - 2,
              left: segment.x * cellSize,
              top: segment.y * cellSize,
              backgroundColor: index === 0 ? '#22c55e' : '#4ade80',
              transform: 'translate(1px, 1px)'
            }}
          />
        ))}
      </div>

      {/* Mobile Controls */}
      <div className="md:hidden">
        <div className="grid grid-cols-3 gap-4 max-w-[240px] mx-auto">
          <div className="col-start-2">
            <button
              onClick={() => handleTouchControl('UP')}
              className="w-20 h-20 rounded-2xl bg-gray-700/50 flex items-center justify-center active:bg-gray-600/50 focus:outline-none focus:ring-2 focus:ring-brand-purple"
            >
              <ArrowUp className="w-10 h-10 text-white" />
            </button>
          </div>
          <div className="col-start-1 col-end-4 grid grid-cols-3 gap-4">
            <button
              onClick={() => handleTouchControl('LEFT')}
              className="w-20 h-20 rounded-2xl bg-gray-700/50 flex items-center justify-center active:bg-gray-600/50 focus:outline-none focus:ring-2 focus:ring-brand-purple"
            >
              <ArrowLeft className="w-10 h-10 text-white" />
            </button>
            <button
              onClick={() => handleTouchControl('DOWN')}
              className="w-20 h-20 rounded-2xl bg-gray-700/50 flex items-center justify-center active:bg-gray-600/50 focus:outline-none focus:ring-2 focus:ring-brand-purple"
            >
              <ArrowDown className="w-10 h-10 text-white" />
            </button>
            <button
              onClick={() => handleTouchControl('RIGHT')}
              className="w-20 h-20 rounded-2xl bg-gray-700/50 flex items-center justify-center active:bg-gray-600/50 focus:outline-none focus:ring-2 focus:ring-brand-purple"
            >
              <ArrowRight className="w-10 h-10 text-white" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
} 