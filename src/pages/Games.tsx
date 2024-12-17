import React from 'react';
import GameCard from '../components/GameCard';
import { games } from '../data/games';

export default function Games() {
  return (
    <div className="space-y-8">
      <h1 className="text-2xl md:text-3xl font-sour text-gray-200 mb-6">Featured Games</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {games.map((game) => (
          <GameCard
            key={game.id}
            {...game}
            videoUrl={game.videoUrl || ''}
            players="1.2k"
          />
        ))}
      </div>
    </div>
  );
}