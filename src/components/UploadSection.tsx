import React, { useState } from 'react';
import { Upload, Camera, Sparkles, Loader2, AlertCircle } from 'lucide-react';
import { useDesignGeneration } from '../hooks/useDesignGeneration';
import { DesignFilters } from '../types';

interface UploadSectionProps {
  filters: DesignFilters;
  onDesignGenerated: (designId: string) => void;
}

const UploadSection: React.FC<UploadSectionProps> = ({ filters, onDesignGenerated }) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  
  const { generateDesign, isGenerating, error, clearError } = useDesignGeneration();

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }
    
    if (file.size > 10 * 1024 * 1024) {
      alert('File size must be less than 10MB');
      return;
    }

    setUploadedFile(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setUploadedImageUrl(e.target.result as string);
      }
    };
    reader.readAsDataURL(file);
    clearError();
  };

  const handleGenerateDesign = async () => {
    if (!uploadedFile) return;

    const result = await generateDesign(uploadedFile, filters);
    if (result) {
      onDesignGenerated(result.id);
    }
  };

  const resetUpload = () => {
    setUploadedFile(null);
    setUploadedImageUrl(null);
    clearError();
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-[#2D3E50] mb-2">Upload Your Room Photo</h2>
        <p className="text-gray-600">Let our AI transform your space with personalized design suggestions</p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2">
          <AlertCircle className="w-5 h-5 text-red-500" />
          <span className="text-red-700">{error}</span>
        </div>
      )}

      {!uploadedImageUrl ? (
        <div
          className={`border-2 border-dashed rounded-xl p-12 text-center transition-all duration-200 ${
            dragActive 
              ? 'border-[#4A635D] bg-[#4A635D]/5' 
              : 'border-gray-300 hover:border-[#E1B07E] hover:bg-gray-50'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <div className="mb-6">
            <Upload className="w-16 h-16 text-[#D97C5A] mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-[#2D3E50] mb-2">
              Drag & drop your room photo here
            </h3>
            <p className="text-gray-500 mb-4">or click to browse your files</p>
          </div>
          
          <input
            type="file"
            id="file-upload"
            className="hidden"
            accept="image/*"
            onChange={handleFileInput}
          />
          
          <label
            htmlFor="file-upload"
            className="inline-flex items-center space-x-2 bg-[#4A635D] text-white px-6 py-3 rounded-lg cursor-pointer hover:bg-[#3d5249] transition-colors duration-200"
          >
            <Camera className="w-5 h-5" />
            <span>Choose Photo</span>
          </label>
          
          <p className="text-sm text-gray-400 mt-4">
            Supports JPG, PNG, WebP up to 10MB
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="relative rounded-xl overflow-hidden">
            <img 
              src={uploadedImageUrl} 
              alt="Uploaded room" 
              className="w-full h-64 object-cover"
            />
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-[#2D3E50]">
              Original
            </div>
          </div>
          
          <div className="flex space-x-4">
            <button 
              onClick={resetUpload}
              disabled={isGenerating}
              className="flex-1 bg-gray-100 text-[#2D3E50] py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Upload Different Photo
            </button>
            <button 
              onClick={handleGenerateDesign}
              disabled={isGenerating}
              className="flex-1 bg-[#D97C5A] text-white py-3 rounded-lg font-medium hover:bg-[#c66d4f] transition-colors duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Generating...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  <span>Start Designing</span>
                </>
              )}
            </button>
          </div>
          
          {isGenerating && (
            <div className="bg-[#4A635D]/5 border border-[#4A635D]/20 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <Loader2 className="w-5 h-5 animate-spin text-[#4A635D]" />
                <div>
                  <p className="font-medium text-[#2D3E50]">AI is working its magic...</p>
                  <p className="text-sm text-gray-600">This usually takes 2-4 seconds</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UploadSection;