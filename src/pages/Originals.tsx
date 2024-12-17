import React from 'react';
import GameCard from '../components/GameCard';
import { games } from '../data/games';

export default function Originals() {
  const originalGames = games.slice(0, 9); // Temporarily using first 9 games

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-200">Original Games</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {originalGames.map((game) => (
          <GameCard
            key={game.id}
            {...game}
            videoUrl="" // Add video URLs in your games data
            players="1.2k"
          />
        ))}
      </div>
    </div>
  );
} 