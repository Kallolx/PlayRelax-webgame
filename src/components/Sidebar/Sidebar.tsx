import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Home, 
  Clock, 
  Sparkles, 
  TrendingUp, 
  RefreshCw, 
  Star, 
  Users,
  User
} from 'lucide-react';

const menuItems = [
  { icon: Home, label: 'Home', path: '/' },
  { icon: Clock, label: 'Recent', path: '/recent' },
  { icon: Sparkles, label: 'New', path: '/new' },
  { icon: TrendingUp, label: 'Trending', path: '/trending' },
  { icon: RefreshCw, label: 'Updated', path: '/updated' },
  { icon: Star, label: 'Originals', path: '/originals' },
  { icon: Users, label: 'Multiplayer', path: '/multiplayer' },
  { icon: User, label: '2 Player', path: '/2player' },
];

const categories = [
  'Action',
  'Arcade',
  'Puzzle',
  'Strategy',
  'Casual',
  'Educational',
  'Multiplayer',
];

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <aside className="w-64 bg-dark-nav p-4 h-[calc(100vh-4rem)] sticky top-16">
      {/* Main Menu */}
      <div className="mb-8">
        <h2 className="text-gray-400 text-sm font-medium mb-4 px-4">MENU</h2>
        <nav>
          {menuItems.map(({ icon: Icon, label, path }) => (
            <button
              key={path}
              onClick={() => navigate(path)}
              className={`
                w-full flex items-center space-x-3 px-4 py-2 rounded-lg
                ${isActive(path) 
                  ? 'bg-brand-purple text-white' 
                  : 'text-gray-400 hover:bg-dark-hover hover:text-white'}
                transition-colors
              `}
            >
              <Icon className="h-5 w-5" />
              <span>{label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Categories */}
      <div>
        <h2 className="text-gray-400 text-sm font-medium mb-4 px-4">CATEGORIES</h2>
        <nav>
          {categories.map(category => (
            <button
              key={category}
              onClick={() => navigate(`/category/${category.toLowerCase()}`)}
              className={`
                w-full text-left px-4 py-2 rounded-lg
                ${location.pathname === `/category/${category.toLowerCase()}` 
                  ? 'bg-brand-purple text-white' 
                  : 'text-gray-400 hover:bg-dark-hover hover:text-white'}
                transition-colors
              `}
            >
              {category}
            </button>
          ))}
        </nav>
      </div>
    </aside>
  );
} 