import React from 'react';
import { Users, Award, Globe } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About PlayRelax</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your ultimate destination for casual gaming and entertainment. We bring joy and relaxation through carefully curated mini-games.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <Users className="w-12 h-12 text-purple-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">10K+</h3>
            <p className="text-gray-600">Active Players</p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <Award className="w-12 h-12 text-purple-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">50+</h3>
            <p className="text-gray-600">Games Available</p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <Globe className="w-12 h-12 text-purple-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Global</h3>
            <p className="text-gray-600">Community</p>
          </div>
        </div>

        {/* Mission Section */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
          <p className="text-gray-600 mb-4">
            At PlayRelax, we believe in making gaming accessible to everyone. Our platform offers a diverse collection of games that cater to different interests and skill levels.
          </p>
          <p className="text-gray-600">
            We're committed to creating a safe, enjoyable environment where players can unwind, challenge themselves, and connect with others who share their passion for gaming.
          </p>
        </div>
      </div>
    </div>
  );
} 