import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, ArrowLeft, Volume2, VolumeX } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import useSound from 'use-sound';
import GameMenu from './components/GameMenu';
import GamePlay from './components/GamePlay';
import GameResults from './components/GameResults';
import { gameModes } from './config/gameModes';

type GameState = 'menu' | 'playing' | 'results';

export default function Game2048() {
  const navigate = useNavigate();
  const [gameState, setGameState] = useState<GameState>('menu');
  const [selectedMode, setSelectedMode] = useState('classic');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [isMuted, setIsMuted] = useState(false);

  const [playMerge] = useSound('/sounds/merge.mp3', { volume: 0.5 });
  const [playGameOver] = useSound('/sounds/game-over.mp3', { volume: 0.5 });

  const handleBackClick = () => {
    navigate('/');
  };

  const handleGameOver = (finalScore: number) => {
    if (!isMuted) playGameOver();
    setScore(finalScore);
    if (finalScore > highScore) {
      setHighScore(finalScore);
    }
    setGameState('results');
  };

  const resetGame = () => {
    setScore(0);
    setGameState('playing');
  };

  return (
    <div className="min-h-screen bg-dark p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <button 
            onClick={handleBackClick}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-6 w-6" />
          </button>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-yellow-500">
              <Trophy className="h-5 w-5" />
              <span className="font-sour">{highScore}</span>
            </div>
            <button 
              onClick={() => setIsMuted(!isMuted)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              {isMuted ? <VolumeX className="h-6 w-6" /> : <Volume2 className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Game Content */}
        <AnimatePresence mode="wait">
          {gameState === 'menu' && (
            <GameMenu 
              onStart={(mode) => {
                setSelectedMode(mode);
                setGameState('playing');
              }} 
            />
          )}
          {gameState === 'playing' && (
            <GamePlay 
              mode={selectedMode}
              onGameOver={handleGameOver}
              onScore={setScore}
              isMuted={isMuted}
              playMerge={playMerge}
            />
          )}
          {gameState === 'results' && (
            <GameResults
              score={score}
              mode={selectedMode}
              onPlayAgain={resetGame}
              onMainMenu={() => setGameState('menu')}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
} 