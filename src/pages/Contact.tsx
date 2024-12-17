import React from 'react';
import { Mail, MessageSquare, MapPin } from 'lucide-react';

export default function Contact() {
  return (
    <div className="min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Have questions or suggestions? We'd love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow-md p-8">
              <div className="flex items-start space-x-4">
                <Mail className="w-6 h-6 text-purple-600 mt-1" />
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Email Us</h3>
                  <p className="text-gray-600">support@playrelax.com</p>
                  <p className="text-gray-600">business@playrelax.com</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-8">
              <div className="flex items-start space-x-4">
                <MessageSquare className="w-6 h-6 text-purple-600 mt-1" />
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Live Chat</h3>
                  <p className="text-gray-600">Available 24/7</p>
                  <p className="text-gray-600">Response time: ~5 minutes</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-8">
              <div className="flex items-start space-x-4">
                <MapPin className="w-6 h-6 text-purple-600 mt-1" />
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Office</h3>
                  <p className="text-gray-600">123 Gaming Street</p>
                  <p className="text-gray-600">San Francisco, CA 94105</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 