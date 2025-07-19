import React, { useState } from 'react';
import { Filter, Palette, DollarSign, Sliders } from 'lucide-react';
import { DesignFilters } from '../types';

interface SidebarProps {
  filters: DesignFilters;
  onFiltersChange: (filters: DesignFilters) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ filters, onFiltersChange }) => {
  const styles = ['Modern', 'Scandinavian', 'Boho', 'Minimalist', 'Industrial', 'Rustic'];
  const colorPalettes = [
    { name: 'Neutral', colors: ['#F5F5F5', '#E8E8E8', '#D3D3D3'] },
    { name: 'Warm', colors: ['#D97C5A', '#E1B07E', '#F4E4BC'] },
    { name: 'Cool', colors: ['#4A635D', '#6B8E7A', '#A4C3B2'] },
    { name: 'Bold', colors: ['#2D3E50', '#8E44AD', '#E74C3C'] }
  ];

  const toggleStyle = (style: string) => {
    const newStyles = filters.styles.includes(style) 
      ? filters.styles.filter(s => s !== style)
      : [...filters.styles, style];
    
    onFiltersChange({ ...filters, styles: newStyles });
  };

  const toggleColor = (colorName: string) => {
    const newColors = filters.colors.includes(colorName) 
      ? filters.colors.filter(c => c !== colorName)
      : [...filters.colors, colorName];
    
    onFiltersChange({ ...filters, colors: newColors });
  };

  const handleBudgetChange = (budget: number) => {
    onFiltersChange({ ...filters, budget });
  };

  const resetFilters = () => {
    onFiltersChange({ styles: [], colors: [], budget: 5000 });
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 h-fit sticky top-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Filter className="w-5 h-5 text-[#4A635D]" />
          <h3 className="text-lg font-semibold text-[#2D3E50]">Design Filters</h3>
        </div>
        <button
          onClick={resetFilters}
          className="text-sm text-[#D97C5A] hover:text-[#c66d4f] transition-colors duration-200"
        >
          Reset
        </button>
      </div>

      {/* Style Filters */}
      <div className="mb-8">
        <div className="flex items-center space-x-2 mb-4">
          <Sliders className="w-4 h-4 text-[#D97C5A]" />
          <h4 className="font-medium text-[#2D3E50]">Design Styles</h4>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {styles.map((style) => (
            <button
              key={style}
              onClick={() => toggleStyle(style)}
              className={`px-3 py-2 text-sm rounded-lg transition-all duration-200 ${
                filters.styles.includes(style)
                  ? 'bg-[#4A635D] text-white'
                  : 'bg-gray-100 text-[#2D3E50] hover:bg-[#E1B07E] hover:text-white'
              }`}
            >
              {style}
            </button>
          ))}
        </div>
        {filters.styles.length > 0 && (
          <p className="text-xs text-gray-500 mt-2">
            {filters.styles.length} style{filters.styles.length > 1 ? 's' : ''} selected
          </p>
        )}
      </div>

      {/* Color Palettes */}
      <div className="mb-8">
        <div className="flex items-center space-x-2 mb-4">
          <Palette className="w-4 h-4 text-[#D97C5A]" />
          <h4 className="font-medium text-[#2D3E50]">Color Palettes</h4>
        </div>
        <div className="space-y-3">
          {colorPalettes.map((palette) => (
            <div
              key={palette.name}
              onClick={() => toggleColor(palette.name)}
              className={`p-3 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                filters.colors.includes(palette.name)
                  ? 'border-[#4A635D] bg-[#4A635D]/5'
                  : 'border-gray-200 hover:border-[#E1B07E]'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-[#2D3E50]">{palette.name}</span>
                {filters.colors.includes(palette.name) && (
                  <div className="w-2 h-2 bg-[#4A635D] rounded-full"></div>
                )}
              </div>
              <div className="flex space-x-1">
                {palette.colors.map((color, index) => (
                  <div
                    key={index}
                    className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Budget Slider */}
      <div className="mb-6">
        <div className="flex items-center space-x-2 mb-4">
          <DollarSign className="w-4 h-4 text-[#D97C5A]" />
          <h4 className="font-medium text-[#2D3E50]">Budget Range</h4>
        </div>
        <div className="space-y-3">
          <input
            type="range"
            min="1000"
            max="20000"
            value={filters.budget}
            onChange={(e) => handleBudgetChange(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            style={{
              background: `linear-gradient(to right, #4A635D 0%, #4A635D ${((filters.budget - 1000) / 19000) * 100}%, #e5e7eb ${((filters.budget - 1000) / 19000) * 100}%, #e5e7eb 100%)`
            }}
          />
          <div className="flex justify-between text-sm text-gray-600">
            <span>$1,000</span>
            <span className="font-semibold text-[#D97C5A]">${filters.budget.toLocaleString()}</span>
            <span>$20,000</span>
          </div>
        </div>
      </div>

      <div className="text-center">
        <p className="text-xs text-gray-500 mb-4">
          Filters will be applied to your next design generation
        </p>
      </div>
    </div>
  );
};

export default Sidebar;