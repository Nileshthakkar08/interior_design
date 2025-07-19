import React from 'react';
import { Heart, Download, Eye, RefreshCw, Clock } from 'lucide-react';
import { DesignResult } from '../types';
import { useDesignGeneration } from '../hooks/useDesignGeneration';

interface MockupGalleryProps {
  onViewDesign: (design: DesignResult) => void;
}

const MockupGallery: React.FC<MockupGalleryProps> = ({ onViewDesign }) => {
  const { generatedDesigns, isGenerating } = useDesignGeneration();

  // Sample mockups for demonstration
  const sampleMockups = [
    {
      id: 'sample-1',
      style: 'Modern Minimalist',
      originalImage: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800',
      generatedImage: 'https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg?auto=compress&cs=tinysrgb&w=800',
      prompt: 'Modern minimalist living room design',
      timestamp: new Date(Date.now() - 3600000),
      status: 'completed' as const,
      budget: '$3,200',
      time: '2.1s'
    },
    {
      id: 'sample-2',
      style: 'Scandinavian',
      originalImage: 'https://images.pexels.com/photos/1571457/pexels-photo-1571457.jpeg?auto=compress&cs=tinysrgb&w=800',
      generatedImage: 'https://images.pexels.com/photos/1571471/pexels-photo-1571471.jpeg?auto=compress&cs=tinysrgb&w=800',
      prompt: 'Scandinavian style interior design',
      timestamp: new Date(Date.now() - 7200000),
      status: 'completed' as const,
      budget: '$2,800',
      time: '1.9s'
    },
    {
      id: 'sample-3',
      style: 'Boho Chic',
      originalImage: 'https://images.pexels.com/photos/1571452/pexels-photo-1571452.jpeg?auto=compress&cs=tinysrgb&w=800',
      generatedImage: 'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=800',
      prompt: 'Boho chic living space design',
      timestamp: new Date(Date.now() - 10800000),
      status: 'completed' as const,
      budget: '$4,100',
      time: '2.3s'
    }
  ];

  const allDesigns = [...generatedDesigns, ...sampleMockups];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-[#2D3E50] mb-2">AI-Generated Designs</h2>
          <p className="text-gray-600">
            {generatedDesigns.length > 0 
              ? `${generatedDesigns.length} new design${generatedDesigns.length > 1 ? 's' : ''} generated`
              : 'Explore stunning transformations created by our AI'
            }
          </p>
        </div>
        <button 
          disabled={isGenerating}
          className="bg-[#4A635D] text-white px-4 py-2 rounded-lg hover:bg-[#3d5249] transition-colors duration-200 flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <RefreshCw className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
          <span>{isGenerating ? 'Generating...' : 'Generate More'}</span>
        </button>
      </div>

      {allDesigns.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Eye className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-[#2D3E50] mb-2">No designs yet</h3>
          <p className="text-gray-600">Upload a room photo and generate your first AI design!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allDesigns.map((design) => (
            <div key={design.id} className="bg-gray-50 rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-200">
              <div className="relative">
                <div className="grid grid-cols-2">
                  <div className="relative">
                    <img 
                      src={design.originalImage} 
                      alt="Before" 
                      className="w-full h-32 object-cover"
                    />
                    <div className="absolute bottom-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                      Before
                    </div>
                  </div>
                  <div className="relative">
                    <img 
                      src={design.generatedImage} 
                      alt="After" 
                      className="w-full h-32 object-cover"
                    />
                    <div className="absolute bottom-2 right-2 bg-[#D97C5A] text-white px-2 py-1 rounded text-xs">
                      After
                    </div>
                  </div>
                </div>
                {design.status === 'generating' && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <div className="bg-white rounded-lg p-3 flex items-center space-x-2">
                      <RefreshCw className="w-4 h-4 animate-spin text-[#4A635D]" />
                      <span className="text-sm font-medium">Generating...</span>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-[#2D3E50]">{design.style}</h3>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-3 h-3 text-gray-400" />
                    <span className="text-xs text-gray-500">
                      {design.timestamp.toLocaleDateString()}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-gray-600">
                    Status: <span className={`font-semibold ${
                      design.status === 'completed' ? 'text-green-600' : 
                      design.status === 'generating' ? 'text-blue-600' : 'text-red-600'
                    }`}>
                      {design.status}
                    </span>
                  </span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={() => onViewDesign(design)}
                    disabled={design.status !== 'completed'}
                    className="flex-1 bg-[#E1B07E] text-white py-2 px-3 rounded-lg hover:bg-[#d4a373] transition-colors duration-200 flex items-center justify-center space-x-1 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Eye className="w-4 h-4" />
                    <span className="text-sm">View</span>
                  </button>
                  <button 
                    disabled={design.status !== 'completed'}
                    className="p-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Heart className="w-4 h-4 text-gray-600" />
                  </button>
                  <button 
                    disabled={design.status !== 'completed'}
                    className="p-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Download className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {allDesigns.length > 0 && (
        <div className="text-center mt-8">
          <button className="bg-[#D97C5A] text-white px-8 py-3 rounded-lg font-medium hover:bg-[#c66d4f] transition-colors duration-200">
            Load More Designs
          </button>
        </div>
      )}
    </div>
  );
};

export default MockupGallery;