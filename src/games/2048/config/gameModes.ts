import { Cpu, Zap, Brain } from 'lucide-react';

export const gameModes = [
  {
    id: 'classic',
    name: 'Classic',
    description: 'Classic 2048 gameplay - reach 2048 to win!',
    icon: Cpu,
    color: 'purple',
    difficulty: 'Normal',
    gridSize: 4,
  },
  {
    id: 'speed',
    name: 'Speed Mode',
    description: 'Race against time to reach higher scores',
    icon: Zap,
    color: 'yellow',
    difficulty: 'Hard',
    gridSize: 4,
    timeLimit: 180,
  },
  {
    id: 'master',
    name: 'Master Mode',
    description: 'Larger grid for more challenge',
    icon: Brain,
    color: 'orange',
    difficulty: 'Expert',
    gridSize: 5,
  },
]; 