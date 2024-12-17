import React from 'react';
import { useParams } from 'react-router-dom';
import { games } from '../data/games';
import GameCard from '../components/GameCard';

export default function CategoryPage() {
  const { category } = useParams<{ category: string }>();
  const filteredGames = games.filter(
    game => game.category.toLowerCase() === category?.toLowerCase()
  );

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-white mb-8 capitalize">
        {category} Games
      </h1>
      
      {filteredGames.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredGames.map(game => (
            <GameCard key={game.id} {...game} />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-400 py-12">
          No games found in this category
        </div>
      )}
    </div>
  );
} 