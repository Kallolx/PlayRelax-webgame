import {
  Home,
  Clock,
  Sparkles,
  Flame,
  RefreshCw,
  Crown,
  Users,
  Swords,
  Map,
  Trophy,
  Car,
  Puzzle,
  Gamepad2,
  Target
} from 'lucide-react';

export const categories = [
  { name: 'Home', icon: Home, path: '/' },
  { name: 'Recently played', icon: Clock, path: '/recent' },
  { name: 'New', icon: Sparkles, path: '/new' },
  { name: 'Trending now', icon: Flame, path: '/trending' },
  { name: 'Updated', icon: RefreshCw, path: '/updated' },
  { name: 'Originals', icon: Crown, path: '/originals' },
  { name: 'Multiplayer', icon: Users, path: '/multiplayer' },
];

export const gameTypes = [
  { name: 'Action', icon: Swords, path: '/category/action' },
  { name: 'Adventure', icon: Map, path: '/category/adventure' },
  { name: 'Sports', icon: Trophy, path: '/category/sports' },
  { name: 'Racing', icon: Car, path: '/category/racing' },
  { name: 'Puzzle', icon: Puzzle, path: '/category/puzzle' },
  { name: 'Casual', icon: Gamepad2, path: '/category/casual' },
  { name: 'Arcade', icon: Target, path: '/category/arcade' },
]; 