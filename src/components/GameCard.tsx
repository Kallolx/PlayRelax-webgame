import React, { useState } from 'react';
import { Play, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface GameCardProps {
  title: string;
  description: string;
  image: string;
  videoUrl: string;
  category: string;
  players: string;
  path: string;
}

export default function GameCard({ 
  title, 
  description, 
  image, 
  videoUrl, 
  category, 
  players,
  path 
}: GameCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    if (path) {
      navigate(path);
    }
  };

  return (
    <div 
      onClick={handleClick}
      className="bg-dark-card rounded-xl overflow-hidden cursor-pointer transition-transform hover:scale-[1.02]"
    >
      <div className="relative aspect-video">
        {isHovered && videoUrl ? (
          <video 
            className="w-full h-full object-cover"
            src={videoUrl}
            autoPlay 
            muted 
            loop
          />
        ) : (
          <img 
            src={image}
            alt={title}
            className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-500"
            loading="lazy"
            style={{ 
              imageRendering: 'crisp-edges',
            }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0" />
        <div className="absolute top-2 right-2 flex items-center space-x-2">
          <span className="bg-brand-purple/90 text-white px-2 py-0.5 md:px-3 md:py-1 rounded-full text-xs font-medium">
            {category}
          </span>
        </div>
        <div className="absolute bottom-2 left-2 flex items-center space-x-1 md:space-x-2">
          <Users className="h-3 w-3 md:h-4 md:w-4 text-gray-200" />
          <span className="text-gray-200 text-xs md:text-sm">{players}</span>
        </div>
      </div>
      <div className="p-3 md:p-4">
        <h3 className="text-gray-200 font-bold text-sm md:text-base mb-1">{title}</h3>
        <p className="text-gray-400 text-xs md:text-sm line-clamp-2 mb-3">{description}</p>
        <button 
          onClick={handleClick}
          className="w-full bg-brand-purple hover:bg-brand-hover text-white py-1.5 md:py-2 px-3 md:px-4 rounded-lg flex items-center justify-center space-x-2 transition-colors"
        >
          <Play className="h-3 w-3 md:h-4 md:w-4" />
          <span>Play Now</span>
        </button>
      </div>
    </div>
  );
} 