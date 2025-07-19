import { useState, useCallback } from 'react';
import { DesignResult, DesignFilters } from '../types';

export const useDesignGeneration = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedDesigns, setGeneratedDesigns] = useState<DesignResult[]>([]);
  const [error, setError] = useState<string | null>(null);

  const generateDesign = useCallback(async (
    imageFile: File,
    filters: DesignFilters
  ): Promise<DesignResult | null> => {
    setIsGenerating(true);
    setError(null);

    try {
      // Convert image to base64
      const base64Image = await fileToBase64(imageFile);
      
      // Create design prompt based on filters
      const stylePrompt = filters.styles.length > 0 
        ? filters.styles.join(', ') 
        : 'modern';
      const colorPrompt = filters.colors.length > 0 
        ? `with ${filters.colors.join(', ')} color palette` 
        : '';
      
      const prompt = `Transform this interior space into a beautiful ${stylePrompt} design ${colorPrompt}. Make it look professional, well-lit, and aesthetically pleasing. Keep the room structure but completely redesign the furniture, decor, and color scheme.`;

      // For demo purposes, we'll simulate API call with a timeout
      // In production, replace this with actual Replicate API call
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Simulate generated image (in production, this would be the API response)
      const mockGeneratedImage = await generateMockDesign(base64Image, stylePrompt);
      
      const result: DesignResult = {
        id: Date.now().toString(),
        originalImage: base64Image,
        generatedImage: mockGeneratedImage,
        style: stylePrompt,
        prompt,
        timestamp: new Date(),
        status: 'completed'
      };

      setGeneratedDesigns(prev => [result, ...prev]);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to generate design';
      setError(errorMessage);
      return null;
    } finally {
      setIsGenerating(false);
    }
  }, []);

  return {
    generateDesign,
    isGenerating,
    generatedDesigns,
    error,
    clearError: () => setError(null)
  };
};

const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
};

// Mock function to simulate AI generation
const generateMockDesign = async (originalImage: string, style: string): Promise<string> => {
  // In production, this would call the Replicate API
  // For demo, we'll return a sample interior design image
  const sampleImages = [
    'https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/1571471/pexels-photo-1571471.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/2029667/pexels-photo-2029667.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/1648776/pexels-photo-1648776.jpeg?auto=compress&cs=tinysrgb&w=1200'
  ];
  
  return sampleImages[Math.floor(Math.random() * sampleImages.length)];
};