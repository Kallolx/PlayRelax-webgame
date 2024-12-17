import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { games } from '../../data/games';

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<typeof games>([]);
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    const results = games.filter(game => 
      game.title.toLowerCase().includes(query.toLowerCase()) ||
      game.description.toLowerCase().includes(query.toLowerCase()) ||
      game.category.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(results);
  };

  const handleGameSelect = (path: string) => {
    setSearchQuery('');
    setSearchResults([]);
    setIsSearching(false);
    navigate(path);
  };

  return (
    <nav className="bg-dark-nav py-4 px-6 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold text-white">GameHub</h1>
        </div>

        {/* Search Bar */}
        <div className="relative flex-1 max-w-xl mx-4">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search games..."
              className="w-full bg-dark-card text-white pl-10 pr-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-purple"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          </div>

          {/* Search Results Dropdown */}
          {isSearching && searchResults.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-dark-card rounded-xl shadow-lg overflow-hidden">
              {searchResults.map(game => (
                <button
                  key={game.id}
                  onClick={() => handleGameSelect(game.path)}
                  className="w-full px-4 py-3 text-left hover:bg-dark-hover flex items-center space-x-3"
                >
                  <img 
                    src={game.image} 
                    alt={game.title} 
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div>
                    <h3 className="text-white font-medium">{game.title}</h3>
                    <p className="text-gray-400 text-sm">{game.category}</p>
                  </div>
                </button>
              ))}
            </div>
          )}

          {isSearching && searchResults.length === 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-dark-card rounded-xl shadow-lg p-4 text-center text-gray-400">
              No games found
            </div>
          )}
        </div>
      </div>
    </nav>
  );
} 