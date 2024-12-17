import { Cpu, Users, Brain } from 'lucide-react';

export const gameModes = [
  {
    id: 'easy',
    name: 'Easy AI',
    description: 'Play against an easy AI opponent',
    icon: Cpu,
    color: 'purple',
    difficulty: 'Normal',
  },
  {
    id: 'hard',
    name: 'Hard AI',
    description: 'Challenge yourself against a smarter AI',
    icon: Brain,
    color: 'yellow',
    difficulty: 'Hard',
  },
  {
    id: 'two-player',
    name: 'Two Players',
    description: 'Play against a friend locally',
    icon: Users,
    color: 'blue',
    difficulty: 'Normal',
  },
]; 