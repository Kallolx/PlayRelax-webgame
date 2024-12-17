import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, ArrowLeft, Volume2, VolumeX } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import GameMenu from './components/GameMenu';
import GamePlay from './components/GamePlay';
import GameResults from './components/GameResults';
import useSound from 'use-sound';
import { gameModes } from './config/gameModes';

type GameState = 'menu' | 'playing' | 'results';

export default function WhackAMole() {
  const navigate = useNavigate();
  const [gameState, setGameState] = useState<GameState>('menu');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameMode, setGameMode] = useState('classic');
  const [isMuted, setIsMuted] = useState(false);

  const [playWhack] = useSound('/sounds/whack.mp3', { volume: 0.5 });
  const [playMiss] = useSound('/sounds/miss.mp3', { volume: 0.3 });
  const [playGameOver] = useSound('/sounds/game-over.mp3', { volume: 0.5 });

  useEffect(() => {
    const savedHighScore = localStorage.getItem('whack-a-mole-highscore');
    if (savedHighScore) setHighScore(parseInt(savedHighScore));
  }, []);

  const handleStart = (mode: string) => {
    setGameMode(mode);
    setGameState('playing');
    setScore(0);
  };

  const handleGameOver = (finalScore: number) => {
    if (!isMuted) playGameOver();
    if (finalScore > highScore) {
      setHighScore(finalScore);
      localStorage.setItem('whack-a-mole-highscore', finalScore.toString());
    }
    setScore(finalScore);
    setGameState('results');
  };

  const handleBackClick = () => {
    if (gameState === 'menu') {
      navigate(-1);
    } else {
      setGameState('menu');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark via-dark/95 to-dark/90 flex flex-col items-center justify-center p-4">
      <div 
        className="w-full max-w-4xl relative"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.05"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          backgroundSize: '30px 30px',
        }}
      >
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
            <GameMenu onStart={handleStart} />
          )}
          {gameState === 'playing' && (
            <GamePlay 
              mode={gameMode}
              onGameOver={handleGameOver}
              isMuted={isMuted}
              playWhack={playWhack}
              playMiss={playMiss}
            />
          )}
          {gameState === 'results' && (
            <GameResults
              score={score}
              mode={gameMode}
              onPlayAgain={() => handleStart(gameMode)}
              onMainMenu={() => setGameState('menu')}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
} 