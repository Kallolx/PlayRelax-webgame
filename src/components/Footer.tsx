import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-purple-600 to-blue-500 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">About PlayRelax</h3>
            <p className="text-gray-200">Your go-to destination for quick, fun, and engaging mini-games. Play instantly, no installation required!</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/games" className="text-gray-200 hover:text-white">Games</Link></li>
              <li><Link to="/about" className="text-gray-200 hover:text-white">About Us</Link></li>
              <li><Link to="/privacy" className="text-gray-200 hover:text-white">Privacy Policy</Link></li>
              <li><Link to="/contact" className="text-gray-200 hover:text-white">Contact</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-200">
          <p>&copy; {new Date().getFullYear()} PlayRelax. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}