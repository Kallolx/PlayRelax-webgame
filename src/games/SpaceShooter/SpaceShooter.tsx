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

export default function SpaceShooter() {
  const navigate = useNavigate();
  const [gameState, setGameState] = useState<GameState>('menu');
  const [selectedMode, setSelectedMode] = useState('campaign');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [isMuted, setIsMuted] = useState(false);

  // Sound effects
  const [playLaser] = useSound('/sounds/laser.mp3', { volume: 0.3 });
  const [playExplosion] = useSound('/sounds/explosion.mp3', { volume: 0.4 });
  const [playPowerUp] = useSound('/sounds/powerup.mp3', { volume: 0.4 });
  const [playBossAlert] = useSound('/sounds/boss-alert.mp3', { volume: 0.5 });
  const [playGameOver] = useSound('/sounds/game-over.mp3', { volume: 0.5 });

  const handleBackClick = () => {
    navigate('/');
  };

  const handleGameOver = (score: number, stats: any, reason?: 'hearts' | 'time') => {
    if (!isMuted) playGameOver();
    setScore(score);
    if (score > highScore) {
      setHighScore(score);
    }
    setGameState('results');
  };

  const resetGame = () => {
    setScore(0);
    setGameState('playing');
  };

  return (
    <div className="min-h-screen bg-dark p-4">
      <div className="max-w-6xl mx-auto">
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
              playLaser={playLaser}
              playExplosion={playExplosion}
              playPowerUp={playPowerUp}
              playBossAlert={playBossAlert}
            />
          )}
          {gameState === 'results' && (
            <GameResults
              score={score}
              mode={selectedMode}
              onPlayAgain={resetGame}
              onMainMenu={() => setGameState('menu')}
              stats={{
                enemiesDefeated: 0,
                bossesDefeated: 0,
                wavesCompleted: 0,
                timeElapsed: 0,
                accuracy: 0,
              }}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
} 