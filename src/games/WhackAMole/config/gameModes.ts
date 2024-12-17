import { Cpu, Zap, Brain } from 'lucide-react';

export const gameModes = [
  {
    id: 'classic',
    name: 'Classic',
    description: 'Whack as many moles as you can in 60 seconds',
    icon: Cpu,
    color: 'purple',
    difficulty: 'Normal',
    gridSize: 9,
  },
  {
    id: 'speed-rush',
    name: 'Speed Rush',
    description: 'Faster moles, higher scores, more challenge',
    icon: Zap,
    color: 'yellow',
    difficulty: 'Hard',
    gridSize: 9,
  },
  {
    id: 'master',
    name: 'Master Mode',
    description: 'Adaptive difficulty, tests your true skills',
    icon: Brain,
    color: 'orange',
    difficulty: 'Expert',
    gridSize: 12,
  },
]; 