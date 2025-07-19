import React, { useState } from 'react';
import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import Sidebar from './components/Sidebar';
import UploadSection from './components/UploadSection';
import MockupGallery from './components/MockupGallery';
import DesignViewer from './components/DesignViewer';
import { DesignFilters, DesignResult } from './types';
import { useDesignGeneration } from './hooks/useDesignGeneration';

function App() {
  const [filters, setFilters] = useState<DesignFilters>({
    styles: [],
    colors: [],
    budget: 5000
  });
  
  const [selectedDesign, setSelectedDesign] = useState<DesignResult | null>(null);
  const { generatedDesigns } = useDesignGeneration();

  const handleDesignGenerated = (designId: string) => {
    const design = generatedDesigns.find(d => d.id === designId);
    if (design) {
      setSelectedDesign(design);
    }
  };

  const handleViewDesign = (design: DesignResult) => {
    setSelectedDesign(design);
  };

  const handleCloseViewer = () => {
    setSelectedDesign(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8f9fa] to-[#e9ecef]">
      <Navigation />
      <HeroSection />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Sidebar filters={filters} onFiltersChange={setFilters} />
          </div>
          
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            <UploadSection 
              filters={filters} 
              onDesignGenerated={handleDesignGenerated}
            />
            <MockupGallery onViewDesign={handleViewDesign} />
          </div>
        </div>
      </div>
      
      {/* Design Viewer Modal */}
      {selectedDesign && (
        <DesignViewer 
          design={selectedDesign} 
          onClose={handleCloseViewer}
        />
      )}
      
      {/* Footer */}
      <footer className="bg-[#2D3E50] py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="bg-[#4A635D] p-2 rounded-lg">
                  <div className="w-6 h-6 bg-white rounded"></div>
                </div>
                <span className="text-white text-xl font-bold">DesignAI</span>
              </div>
              <p className="text-gray-400 text-sm">
                Transform your space with AI-powered interior design solutions.
              </p>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p className="text-gray-400 text-sm">
              © 2025 DesignAI. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;