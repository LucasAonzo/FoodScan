import { useState } from 'react';
import { analyzeMenu as analyzeMenuService } from '../services/openai';
import type { MenuAnalysisResult } from '../types';
import * as FileSystem from 'expo-file-system';

/**
 * Custom hook for analyzing menu images
 * Provides loading state and error handling for the menu analysis process
 */
export const useAnalyzeMenu = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Analyzes a menu image using the OpenAI service
   * @param imageUri The URI of the image to analyze
   * @returns Analysis results or null if there was an error
   */
  const analyzeMenu = async (imageUri: string): Promise<MenuAnalysisResult[] | null> => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Convert the image URI to base64
      const base64Image = await FileSystem.readAsStringAsync(imageUri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      
      // Analyze the menu using OpenAI
      const results = await analyzeMenuService(base64Image);
      return results;
    } catch (err: any) {
      console.error('Error in useAnalyzeMenu:', err);
      setError(err?.message || 'Failed to analyze menu');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    analyzeMenu,
    isLoading,
    error
  };
};