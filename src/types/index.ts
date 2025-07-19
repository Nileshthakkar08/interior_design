export interface DesignResult {
  id: string;
  originalImage: string;
  generatedImage: string;
  style: string;
  prompt: string;
  timestamp: Date;
  status: 'generating' | 'completed' | 'failed';
}

export interface DesignFilters {
  styles: string[];
  colors: string[];
  budget: number;
}