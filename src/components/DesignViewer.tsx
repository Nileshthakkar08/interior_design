import React, { useState } from 'react';
import { X, Download, Heart, Share2, RotateCcw, Maximize2 } from 'lucide-react';
import { DesignResult } from '../types';

interface DesignViewerProps {
  design: DesignResult;
  onClose: () => void;
}

const DesignViewer: React.FC<DesignViewerProps> = ({ design, onClose }) => {
  const [showComparison, setShowComparison] = useState(true);
  const [isLiked, setIsLiked] = useState(false);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = design.generatedImage;
    link.download = `design-${design.id}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Check out my AI-generated room design!',
          text: `I just created this amazing ${design.style} room design using AI`,
          url: window.location.href
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-[#2D3E50]">AI-Generated Design</h2>
            <p className="text-gray-600">{design.style} • Generated {design.timestamp.toLocaleDateString()}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Toggle View */}
          <div className="flex items-center justify-center mb-6">
            <div className="bg-gray-100 p-1 rounded-lg flex">
              <button
                onClick={() => setShowComparison(true)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  showComparison 
                    ? 'bg-[#4A635D] text-white' 
                    : 'text-gray-600 hover:text-[#4A635D]'
                }`}
              >
                Before & After
              </button>
              <button
                onClick={() => setShowComparison(false)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  !showComparison 
                    ? 'bg-[#4A635D] text-white' 
                    : 'text-gray-600 hover:text-[#4A635D]'
                }`}
              >
                Generated Design
              </button>
            </div>
          </div>

          {/* Image Display */}
          <div className="mb-6">
            {showComparison ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative">
                  <img 
                    src={design.originalImage} 
                    alt="Original room" 
                    className="w-full h-80 object-cover rounded-xl"
                  />
                  <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Original
                  </div>
                </div>
                <div className="relative">
                  <img 
                    src={design.generatedImage} 
                    alt="Generated design" 
                    className="w-full h-80 object-cover rounded-xl"
                  />
                  <div className="absolute bottom-4 right-4 bg-[#D97C5A] text-white px-3 py-1 rounded-full text-sm font-medium">
                    AI Generated
                  </div>
                </div>
              </div>
            ) : (
              <div className="relative">
                <img 
                  src={design.generatedImage} 
                  alt="Generated design" 
                  className="w-full h-96 object-cover rounded-xl"
                />
                <button className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-lg hover:bg-white transition-colors duration-200">
                  <Maximize2 className="w-5 h-5 text-gray-700" />
                </button>
              </div>
            )}
          </div>

          {/* Design Details */}
          <div className="bg-gray-50 rounded-xl p-6 mb-6">
            <h3 className="font-semibold text-[#2D3E50] mb-3">Design Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Style:</span>
                <span className="ml-2 font-medium text-[#4A635D]">{design.style}</span>
              </div>
              <div>
                <span className="text-gray-600">Generated:</span>
                <span className="ml-2 font-medium text-[#4A635D]">
                  {design.timestamp.toLocaleTimeString()}
                </span>
              </div>
              <div>
                <span className="text-gray-600">Status:</span>
                <span className="ml-2 font-medium text-green-600 capitalize">{design.status}</span>
              </div>
            </div>
            <div className="mt-3">
              <span className="text-gray-600">Prompt:</span>
              <p className="mt-1 text-sm text-[#2D3E50] bg-white p-3 rounded-lg">{design.prompt}</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={() => setIsLiked(!isLiked)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-200 ${
                isLiked 
                  ? 'bg-red-50 text-red-600 border border-red-200' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
              <span>{isLiked ? 'Liked' : 'Like'}</span>
            </button>
            
            <button
              onClick={handleDownload}
              className="flex items-center space-x-2 px-4 py-2 bg-[#4A635D] text-white rounded-lg hover:bg-[#3d5249] transition-colors duration-200"
            >
              <Download className="w-4 h-4" />
              <span>Download</span>
            </button>
            
            <button
              onClick={handleShare}
              className="flex items-center space-x-2 px-4 py-2 bg-[#E1B07E] text-white rounded-lg hover:bg-[#d4a373] transition-colors duration-200"
            >
              <Share2 className="w-4 h-4" />
              <span>Share</span>
            </button>
            
            <button className="flex items-center space-x-2 px-4 py-2 bg-[#D97C5A] text-white rounded-lg hover:bg-[#c66d4f] transition-colors duration-200">
              <RotateCcw className="w-4 h-4" />
              <span>Generate Variation</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignViewer;