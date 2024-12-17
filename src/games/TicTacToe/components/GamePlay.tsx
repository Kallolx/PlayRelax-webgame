import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Circle } from 'lucide-react';
import { Board, Player, checkWinner, getAIMove } from '../utils/gameLogic';

interface GamePlayProps {
  mode: string;
  onGameOver: (result: 'win' | 'lose' | 'draw') => void;
  isMuted: boolean;
  playMove: () => void;
}

export default function GamePlay({ mode, onGameOver, isMuted, playMove }: GamePlayProps) {
  const [board, setBoard] = useState<Board>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<Player>('X');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCellClick = (index: number) => {
    if (board[index] || isProcessing || (mode !== 'two-player' && currentPlayer === 'O')) return;

    makeMove(index);
  };

  const makeMove = (index: number) => {
    if (!isMuted) playMove();
    
    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);

    const result = checkWinner(newBoard);
    if (result) {
      handleGameEnd(result);
      return;
    }

    setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
  };

  // AI move
  useEffect(() => {
    if (mode !== 'two-player' && currentPlayer === 'O' && !isProcessing) {
      setIsProcessing(true);
      // Add delay to make AI move feel more natural
      const timer = setTimeout(() => {
        const aiMove = getAIMove(board, mode as 'easy' | 'hard');
        makeMove(aiMove);
        setIsProcessing(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [currentPlayer, board, mode]);

  const handleGameEnd = (result: Player | 'draw') => {
    if (result === 'draw') {
      onGameOver('draw');
    } else if (result === 'X') {
      onGameOver('win');
    } else {
      onGameOver('lose');
    }
  };

  const renderCell = (index: number) => {
    const value = board[index];
    return (
      <motion.button
        key={index}
        onClick={() => handleCellClick(index)}
        className={`
          aspect-square bg-dark-card rounded-xl border-2 
          ${value ? 'border-gray-700' : 'border-gray-700/50 hover:border-gray-700'} 
          flex items-center justify-center transition-colors
          ${isProcessing ? 'cursor-not-allowed' : 'cursor-pointer'}
        `}
        whileHover={!value && !isProcessing ? { scale: 1.05 } : {}}
        whileTap={!value && !isProcessing ? { scale: 0.95 } : {}}
      >
        {value && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className={value === 'X' ? 'text-brand-purple' : 'text-yellow-500'}
          >
            {value === 'X' ? (
              <X className="w-16 h-16 md:w-24 md:h-24" />
            ) : (
              <Circle className="w-16 h-16 md:w-24 md:h-24" />
            )}
          </motion.div>
        )}
      </motion.button>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="text-center"
    >
      <div className="text-2xl font-bold text-white mb-8">
        {mode === 'two-player' ? (
          <span>Player {currentPlayer}'s Turn</span>
        ) : (
          <span>{currentPlayer === 'X' ? 'Your' : "AI's"} Turn</span>
        )}
      </div>

      <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
        {board.map((_, index) => renderCell(index))}
      </div>
    </motion.div>
  );
} 