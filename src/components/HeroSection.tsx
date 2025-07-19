import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

const HeroSection: React.FC = () => {
  return (
    <section className="bg-gradient-to-br from-[#4A635D] to-[#2D3E50] py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <Sparkles className="w-6 h-6 text-[#E1B07E]" />
              <span className="text-[#E1B07E] font-semibold">AI-Powered Design</span>
            </div>
            
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              Transform Your Space with
              <span className="text-[#D97C5A]"> AI Magic</span>
            </h1>
            
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Upload a photo of your room and watch our AI create stunning interior designs 
              tailored to your style, budget, and preferences in seconds.
            </p>
            
            <button className="bg-[#D97C5A] text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-[#c66d4f] transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center space-x-2">
              <span>Start Designing</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
          
          <div className="relative">
            <div className="bg-white p-6 rounded-2xl shadow-2xl">
              <div className="aspect-video bg-gradient-to-br from-[#E1B07E] to-[#D97C5A] rounded-xl mb-4 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white font-semibold">AI-Generated Room Preview</span>
                </div>
                <div className="absolute bottom-4 left-4 bg-white/90 px-3 py-1 rounded-full text-sm font-medium text-[#2D3E50]">
                  Modern Scandinavian
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#2D3E50] font-semibold">Living Room Redesign</span>
                <div className="flex items-center space-x-1">
                  <span className="text-[#4A635D] text-sm">Generated in</span>
                  <span className="text-[#D97C5A] font-bold">3.2s</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;