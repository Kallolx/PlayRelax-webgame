import React from 'react';
import { Search, Bell, Heart, Menu } from 'lucide-react';

interface HeaderProps {
  onMenuClick: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="bg-dark-nav border-b border-gray-800 sticky top-0 z-10">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between max-w-7xl">
        <div className="flex items-center flex-1 gap-4">
          <button 
            onClick={onMenuClick}
            className="text-gray-400 hover:text-white lg:hidden"
          >
            <Menu className="h-6 w-6" />
          </button>
          <div className="w-full max-w-xl">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
              <input
                type="text"
                placeholder="Search games..."
                className="w-full bg-dark pl-10 pr-4 py-2 rounded-full border border-gray-800 focus:outline-none focus:border-brand-purple text-gray-200 placeholder-gray-500 hidden md:block"
              />
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 md:space-x-4">
          <button className="text-gray-400 hover:text-gray-200 transition-colors hidden md:block">
            <Bell className="h-6 w-6" />
          </button>
          <button className="text-gray-400 hover:text-gray-200 transition-colors hidden md:block">
            <Heart className="h-6 w-6" />
          </button>
          <button className="bg-brand-purple text-white px-3 py-1.5 md:px-4 md:py-2 rounded-lg hover:bg-brand-hover transition-colors text-sm md:text-base">
            Log in
          </button>
        </div>
      </div>
    </header>
  );
}