export type Player = 'X' | 'O' | null;
export type Board = Player[];

export const checkWinner = (board: Board): Player | 'draw' | null => {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
  ];

  // Check for winner
  for (const [a, b, c] of winPatterns) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }

  // Check for draw
  if (board.every(cell => cell !== null)) {
    return 'draw';
  }

  return null;
};

export const getAIMove = (board: Board, difficulty: 'easy' | 'hard'): number => {
  if (difficulty === 'easy') {
    // Easy AI: Random valid move
    const emptyCells = board
      .map((cell, index) => cell === null ? index : -1)
      .filter(index => index !== -1);
    return emptyCells[Math.floor(Math.random() * emptyCells.length)];
  } else {
    // Hard AI: Minimax algorithm
    return getBestMove(board);
  }
};

const getBestMove = (board: Board): number => {
  let bestScore = -Infinity;
  let bestMove = 0;

  for (let i = 0; i < board.length; i++) {
    if (board[i] === null) {
      board[i] = 'O';
      const score = minimax(board, 0, false);
      board[i] = null;

      if (score > bestScore) {
        bestScore = score;
        bestMove = i;
      }
    }
  }

  return bestMove;
};

const minimax = (board: Board, depth: number, isMaximizing: boolean): number => {
  const result = checkWinner(board);
  if (result === 'O') return 10 - depth;
  if (result === 'X') return depth - 10;
  if (result === 'draw') return 0;

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < board.length; i++) {
      if (board[i] === null) {
        board[i] = 'O';
        bestScore = Math.max(bestScore, minimax(board, depth + 1, false));
        board[i] = null;
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < board.length; i++) {
      if (board[i] === null) {
        board[i] = 'X';
        bestScore = Math.min(bestScore, minimax(board, depth + 1, true));
        board[i] = null;
      }
    }
    return bestScore;
  }
}; 