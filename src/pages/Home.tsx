import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Gamepad2, Sparkles, Trophy, Users } from 'lucide-react';
import GameCard from '../components/GameCard';
import { games } from '../data/games';

export default function Home() {
  const featuredGames = games.slice(0, 6);

  return (
    <div className="space-y-8">
      {/* Enhanced Hero Section */}
      <section className="relative overflow-hidden rounded-xl md:rounded-2xl">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-radial from-brand-purple/20 via-brand-purple to-dark-nav">
          <div className="absolute inset-0 opacity-30">
            {[...Array(50)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute h-2 w-2 bg-white rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 0.8, 0.3],
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative px-4 py-16 md:py-24 max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="text-left space-y-6">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-6xl font-bold text-white leading-tight"
              >
                Play & Relax{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple to-purple-400">
                  Your Ultimate Gaming Hub
                </span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-lg md:text-xl text-gray-300"
              >
                Discover a world of endless entertainment with our collection of browser-based games
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex flex-wrap gap-4"
              >
                <Link
                  to="/games"
                  className="inline-flex items-center space-x-2 bg-brand-purple hover:bg-brand-hover px-6 py-3 rounded-xl font-medium text-white transition-colors"
                >
                  <Gamepad2 className="h-5 w-5" />
                  <span>Start Playing</span>
                </Link>
                <Link
                  to="/multiplayer"
                  className="inline-flex items-center space-x-2 bg-dark-card hover:bg-dark-hover px-6 py-3 rounded-xl font-medium text-white transition-colors"
                >
                  <Users className="h-5 w-5" />
                  <span>Multiplayer Games</span>
                </Link>
              </motion.div>

              {/* Stats */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="flex flex-wrap gap-6 pt-4"
              >
                <div className="flex items-center space-x-2">
                  <Gamepad2 className="h-5 w-5 text-brand-purple" />
                  <span className="text-white font-medium">20+ Games</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Trophy className="h-5 w-5 text-yellow-500" />
                  <span className="text-white font-medium">Leaderboards</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Sparkles className="h-5 w-5 text-blue-400" />
                  <span className="text-white font-medium">Daily Updates</span>
                </div>
              </motion.div>
            </div>

            {/* Featured Game Preview */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="relative"
            >
              <div className="relative aspect-[16/9] max-w-lg mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-brand-purple/20 to-purple-500/20 rounded-2xl transform rotate-6 scale-95" />
                <div className="absolute inset-0 bg-gradient-to-l from-brand-purple/20 to-purple-500/20 rounded-2xl transform -rotate-6 scale-95" />
                <div className="relative h-full w-full rounded-2xl overflow-hidden shadow-2xl">
                  <img 
                    src="/images/space.jpg"
                    alt="Space Shooter"
                    className="w-full h-full object-cover object-center"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-nav/90 via-dark-nav/20 to-transparent">
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-2xl font-bold text-white mb-2">Space Shooter</h3>
                      <p className="text-gray-300 text-sm">
                        Defend Earth from alien invaders in this action-packed space shooter!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Rest of the content */}
      <div className="space-y-12">
        {/* Featured Games */}
        <section>
          <h2 className="text-xl md:text-2xl font-bold text-gray-200 mb-6">Featured Games</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {featuredGames.map((game) => (
              <GameCard
                key={game.id}
                {...game}
                videoUrl={game.videoUrl || ''}
                players="1.2k"
              />
            ))}
          </div>
        </section>

        {/* New & Trending */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl md:text-2xl font-sour text-gray-200">New & Trending</h2>
            <Link 
              to="/trending" 
              className="text-brand-purple hover:text-brand-hover transition-colors font-sour"
            >
              View all
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {featuredGames.slice(0, 4).map((game) => (
              <GameCard
                key={game.id}
                {...game}
                videoUrl={game.videoUrl || ''}
                players="1.2k"
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}