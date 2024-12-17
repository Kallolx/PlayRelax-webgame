import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2, X } from 'lucide-react';
import { categories, gameTypes } from '../data/navigation';

interface SidebarProps {
  onClose: () => void;
}

export default function Sidebar({ onClose }: SidebarProps) {
  return (
    <aside className="h-screen overflow-y-auto">
      <div className="p-4">
        <div className="flex items-center justify-between mb-8">
          <Link to="/" className="flex items-center space-x-2">
            <Gamepad2 className="h-8 w-8 text-brand-purple" />
            <span className="text-gray-200 font-bold text-xl">PlayRelax</span>
          </Link>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white lg:hidden"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <nav className="space-y-6">
          <div>
            <div className="space-y-1">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <Link
                    key={category.path}
                    to={category.path}
                    onClick={onClose}
                    className="flex items-center space-x-3 px-4 py-2 text-gray-400 hover:bg-dark-hover hover:text-gray-200 rounded-lg transition-colors"
                  >
                    <Icon className="h-5 w-5" />
                    <span className="text-sm">{category.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          <div>
            <h3 className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Categories
            </h3>
            <div className="space-y-1">
              {gameTypes.map((type) => {
                const Icon = type.icon;
                return (
                  <Link
                    key={type.path}
                    to={type.path}
                    onClick={onClose}
                    className="flex items-center space-x-3 px-4 py-2 text-gray-400 hover:bg-dark-hover hover:text-gray-200 rounded-lg transition-colors"
                  >
                    <Icon className="h-5 w-5" />
                    <span className="text-sm">{type.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </nav>
      </div>
    </aside>
  );
} 