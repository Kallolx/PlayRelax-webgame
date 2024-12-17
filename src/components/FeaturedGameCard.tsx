import React from 'react';

export default function FeaturedGameCard({ title, description, image }) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105">
      <img src={image} alt={title} className="w-full h-40 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-bold text-pink-600">{title}</h3>
        <p className="text-gray-600">{description}</p>
        <button className="mt-2 bg-pink-500 text-white px-4 py-2 rounded-full hover:bg-pink-600 transition-colors">
          Play Now
        </button>
      </div>
    </div>
  );
} 