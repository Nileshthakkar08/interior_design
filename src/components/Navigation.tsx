import React from 'react';
import { Home, Palette, BookOpen, User } from 'lucide-react';

const Navigation: React.FC = () => {
  return (
    <nav className="bg-[#2D3E50] shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="bg-[#4A635D] p-2 rounded-lg">
              <Home className="w-6 h-6 text-white" />
            </div>
            <span className="text-white text-xl font-bold">DesignAI</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-[#E1B07E] hover:text-white transition-colors duration-200 font-medium">
              Design My Room
            </a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200 font-medium">
              My Projects
            </a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200 font-medium">
              Inspiration
            </a>
            <button className="bg-[#D97C5A] text-white px-4 py-2 rounded-lg hover:bg-[#c66d4f] transition-colors duration-200 font-medium">
              Sign In
            </button>
          </div>
          
          <div className="md:hidden">
            <button className="text-gray-300 hover:text-white">
              <User className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;