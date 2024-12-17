import React from 'react';

export default function WhyChooseUs() {
  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Why Choose Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="text-center p-6">
            <h3 className="text-xl font-semibold mb-2">Instant Play</h3>
            <p className="text-gray-600">No downloads or installations required. Play directly in your browser!</p>
          </div>
          <div className="text-center p-6">
            <h3 className="text-xl font-semibold mb-2">Brain Training</h3>
            <p className="text-gray-600">Improve your cognitive skills while having fun!</p>
          </div>
          <div className="text-center p-6">
            <h3 className="text-xl font-semibold mb-2">Fun for Everyone</h3>
            <p className="text-gray-600">Games suitable for all ages and skill levels</p>
          </div>
        </div>
      </div>
    </section>
  );
} 