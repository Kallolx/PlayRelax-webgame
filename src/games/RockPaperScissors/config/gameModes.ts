import { Shield, Cpu, Users } from 'lucide-react';

export const gameModes = [
  {
    id: 'classic',
    name: 'Classic',
    description: 'Traditional Rock Paper Scissors against the computer',
    icon: Cpu,
    color: 'purple',
    difficulty: 'Normal',
  },
  {
    id: 'best-of-five',
    name: 'Best of 5',
    description: 'First to win 3 rounds wins the match',
    icon: Shield,
    color: 'green',
    difficulty: 'Normal',
  },
  {
    id: 'two-player',
    name: 'Two Players',
    description: 'Challenge a friend in local multiplayer',
    icon: Users,
    color: 'yellow',
    difficulty: 'Normal',
  },
]; 