import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, ArrowLeft, Volume2, VolumeX } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import GameMenu from './components/GameMenu';
import GamePlay from './components/GamePlay';
import GameResults from './components/GameResults';
import useSound from 'use-sound';

type GameState = 'menu' | 'playing' | 'results';
type Choice = 'rock' | 'paper' | 'scissors' | null;

export default function RockPaperScissors() {
  const navigate = useNavigate();
  const [gameState, setGameState] = useState<GameState>('menu');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [playerChoice, setPlayerChoice] = useState<Choice>(null);
  const [computerChoice, setComputerChoice] = useState<Choice>(null);
  const [result, setResult] = useState<'win' | 'lose' | 'draw' | null>(null);
  const [isMuted, setIsMuted] = useState(false);

  const [playSelect] = useSound('/sounds/select.mp3', { volume: 0.5 });
  const [playWin] = useSound('/sounds/win.mp3', { volume: 0.5 });
  const [playLose] = useSound('/sounds/lose.mp3', { volume: 0.5 });

  useEffect(() => {
    const savedHighScore = localStorage.getItem('rps-highscore');
    if (savedHighScore) setHighScore(parseInt(savedHighScore));
  }, []);

  const handleChoice = (choice: Choice) => {
    if (!isMuted) playSelect();
    setPlayerChoice(choice);
    const choices: Choice[] = ['rock', 'paper', 'scissors'];
    const computerChoice = choices[Math.floor(Math.random() * 3)];
    setComputerChoice(computerChoice);
    
    setTimeout(() => {
      const result = determineWinner(choice, computerChoice);
      setResult(result);
      if (result === 'win') {
        if (!isMuted) playWin();
        setScore(prev => prev + 1);
        if (score + 1 > highScore) {
          setHighScore(score + 1);
          localStorage.setItem('rps-highscore', (score + 1).toString());
        }
      } else if (result === 'lose') {
        if (!isMuted) playLose();
      }
      setGameState('results');
    }, 2000);
  };

  const determineWinner = (player: Choice, computer: Choice): 'win' | 'lose' | 'draw' => {
    if (player === computer) return 'draw';
    if (
      (player === 'rock' && computer === 'scissors') ||
      (player === 'paper' && computer === 'rock') ||
      (player === 'scissors' && computer === 'paper')
    ) return 'win';
    return 'lose';
  };

  const resetGame = () => {
    setPlayerChoice(null);
    setComputerChoice(null);
    setResult(null);
    setGameState('playing');
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
            <GameMenu onStart={() => setGameState('playing')} />
          )}
          {gameState === 'playing' && (
            <GamePlay 
              onChoice={handleChoice}
              playerChoice={playerChoice}
              computerChoice={computerChoice}
            />
          )}
          {gameState === 'results' && (
            <GameResults
              result={result}
              playerChoice={playerChoice}
              computerChoice={computerChoice}
              score={score}
              onPlayAgain={resetGame}
              onMainMenu={() => {
                setScore(0);
                setGameState('menu');
              }}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
} 