import { Cpu, Zap, Timer } from 'lucide-react';

export const gameModes = [
  {
    id: 'classic',
    name: 'Classic',
    description: 'Classic snake game - grow longer and avoid walls',
    icon: Cpu,
    color: 'purple',
    difficulty: 'Normal',
    speed: 150,
  },
  {
    id: 'speed',
    name: 'Speed Run',
    description: 'Faster snake movement for skilled players',
    icon: Zap,
    color: 'yellow',
    difficulty: 'Hard',
    speed: 100,
  },
  {
    id: 'timed',
    name: 'Time Trial',
    description: 'Get the highest score before time runs out',
    icon: Timer,
    color: 'blue',
    difficulty: 'Hard',
    speed: 150,
    timeLimit: 60,
  },
]; 