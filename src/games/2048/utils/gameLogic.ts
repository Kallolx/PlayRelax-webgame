export type Grid = (number | null)[][];

export const createEmptyGrid = (size: number): Grid => {
  return Array(size).fill(null).map(() => Array(size).fill(null));
};

export const addNewTile = (grid: Grid): Grid => {
  const emptyCells = [];
  grid.forEach((row, i) => {
    row.forEach((cell, j) => {
      if (cell === null) {
        emptyCells.push({ i, j });
      }
    });
  });

  if (emptyCells.length === 0) return grid;

  const { i, j } = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  const newGrid = grid.map(row => [...row]);
  newGrid[i][j] = Math.random() < 0.9 ? 2 : 4;
  return newGrid;
};

export const moveGrid = (grid: Grid, direction: 'up' | 'down' | 'left' | 'right'): { grid: Grid; score: number } => {
  let score = 0;
  let newGrid = grid.map(row => [...row]);

  const rotate = (grid: Grid): Grid => {
    const size = grid.length;
    const newGrid = createEmptyGrid(size);
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        newGrid[j][size - 1 - i] = grid[i][j];
      }
    }
    return newGrid;
  };

  // Align grid so we can always process left-to-right
  if (direction === 'up') newGrid = rotate(rotate(rotate(newGrid)));
  if (direction === 'right') newGrid = rotate(rotate(newGrid));
  if (direction === 'down') newGrid = rotate(newGrid);

  // Process each row
  newGrid = newGrid.map(row => {
    // Remove nulls
    let line = row.filter(cell => cell !== null) as number[];
    // Merge
    for (let i = 0; i < line.length - 1; i++) {
      if (line[i] === line[i + 1]) {
        line[i] *= 2;
        score += line[i];
        line.splice(i + 1, 1);
      }
    }
    // Add nulls back
    while (line.length < row.length) {
      line.push(null);
    }
    return line;
  });

  // Rotate back
  if (direction === 'up') newGrid = rotate(newGrid);
  if (direction === 'right') newGrid = rotate(rotate(newGrid));
  if (direction === 'down') newGrid = rotate(rotate(rotate(newGrid)));

  return { grid: newGrid, score };
};

export const isGameOver = (grid: Grid): boolean => {
  // Check for empty cells
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] === null) return false;
    }
  }

  // Check for possible merges
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      const current = grid[i][j];
      // Check right
      if (j < grid[i].length - 1 && grid[i][j + 1] === current) return false;
      // Check down
      if (i < grid.length - 1 && grid[i + 1][j] === current) return false;
    }
  }

  return true;
};

export const hasWon = (grid: Grid): boolean => {
  return grid.some(row => row.some(cell => cell === 2048));
}; 