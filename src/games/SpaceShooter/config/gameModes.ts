import { Rocket, Shield, Skull } from 'lucide-react';

export const gameModes = [
  {
    id: 'campaign',
    name: 'Campaign',
    description: 'Fight through waves of enemies and epic boss battles',
    icon: Rocket,
    color: 'purple',
    difficulty: 'Normal',
    waves: 10,
    bossWaves: [5, 10],
  },
  {
    id: 'survival',
    name: 'Survival',
    description: 'Survive endless waves of increasingly difficult enemies',
    icon: Shield,
    color: 'yellow',
    difficulty: 'Hard',
    waves: Infinity,
    bossWaves: [5, 10, 15, 20],
  },
  {
    id: 'boss-rush',
    name: 'Boss Rush',
    description: 'Face off against increasingly difficult bosses',
    icon: Skull,
    color: 'red',
    difficulty: 'Expert',
    waves: 5,
    allBoss: true,
  },
];

export const enemyTypes = {
  fighter: {
    health: 100,
    speed: 2,
    fireRate: 1000,
    points: 100,
    size: 40,
  },
  bomber: {
    health: 200,
    speed: 1,
    fireRate: 2000,
    points: 200,
    size: 50,
  },
  elite: {
    health: 300,
    speed: 1.5,
    fireRate: 800,
    points: 300,
    size: 45,
  },
};

export const bossTypes = {
  dreadnought: {
    health: 2000,
    phases: 3,
    patterns: ['spread', 'laser', 'missiles'],
    size: 120,
  },
  mothership: {
    health: 3000,
    phases: 4,
    patterns: ['drones', 'beam', 'blackhole'],
    size: 150,
  },
  titan: {
    health: 4000,
    phases: 5,
    patterns: ['multibeam', 'shockwave', 'rain'],
    size: 180,
  },
};

export const powerUps = {
  tripleShot: {
    duration: 10000,
    color: 'blue',
  },
  shield: {
    duration: 8000,
    color: 'green',
  },
  rapidFire: {
    duration: 6000,
    color: 'yellow',
  },
}; 