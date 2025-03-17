import { apiUrl, apiKey } from '../config/api';
import axios from 'axios';
import type { MenuAnalysisResult } from '../types';

// Cache for storing previous menu analyses to avoid duplicate API calls
const menuAnalysisCache = new Map<string, any>();

// Function to calculate a hash of image data for caching
const calculateImageHash = (base64Data: string): string => {
  // Simple hash function for image data - production would use a more robust hash
  let hash = 0;
  const sample = base64Data.substring(0, 10000); // Sample the first part of image
  for (let i = 0; i < sample.length; i++) {
    hash = ((hash << 5) - hash) + sample.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }
  return hash.toString(16);
};

/**
 * Analyzes a menu image using OpenAI's vision capabilities
 * @param base64Image The base64-encoded image data
 * @returns An array of menu items with nutritional information
 */
export const analyzeMenu = async (base64Image: string): Promise<MenuAnalysisResult[]> => {
  try {
    // Check if we have this image in cache
    const imageHash = calculateImageHash(base64Image);
    if (menuAnalysisCache.has(imageHash)) {
      console.log('Using cached menu analysis result');
      return menuAnalysisCache.get(imageHash);
    }

    console.log('Sending menu image to OpenAI for analysis...');
    
    // Use a more efficient model when possible - gpt-4o-mini is faster than full gpt-4o
    const response = await axios.post(
      apiUrl,
      {
        model: 'gpt-4o-mini', // Using the mini model for faster response times
        messages: [
          {
            role: 'system',
            content: 'You are a menu analyzer that identifies dishes and their nutritional information. Extract ALL dishes visible in the menu image. For each dish, provide the name, description, and estimated nutritional facts (calories, protein, carbs, fat). Format the response as a JSON array where each item has dishName, description, and nutritionalInfo fields. Ensure comprehensiveness - extract every single dish visible in the image.',
          },
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: 'Analyze this menu image and extract all dishes with their nutritional information. Include EVERY visible dish.',
              },
              {
                type: 'image_url',
                image_url: {
                  url: `data:image/jpeg;base64,${base64Image}`,
                },
              },
            ],
          },
        ],
        max_tokens: 4000, // Token limit for comprehensive menu analysis
        temperature: 0.3, // Lower temperature for more consistent results
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
      }
    );

    // Safely access content with optional chaining and provide a default
    const content = response.data?.choices?.[0]?.message?.content || '';
    if (!content) {
      console.error('Empty response from OpenAI');
      return [];
    }
    
    // Parse the JSON response
    let result;
    try {
      // Handle case where content might have markdown code blocks
      if (content.includes('```json')) {
        const jsonContent = content.split('```json')[1].split('```')[0].trim();
        result = JSON.parse(jsonContent);
      } else if (content.includes('```')) {
        const jsonContent = content.split('```')[1].split('```')[0].trim();
        result = JSON.parse(jsonContent);
      } else {
        result = JSON.parse(content);
      }
      
      // Store in cache
      menuAnalysisCache.set(imageHash, result);
      
      // Cache management - limit cache size
      if (menuAnalysisCache.size > 20) {
        // Remove oldest entry (first key)
        const firstKey = menuAnalysisCache.keys().next().value;
        if (firstKey) {
          menuAnalysisCache.delete(firstKey);
        }
      }
      
      return result;
    } catch (error) {
      console.error('Error parsing OpenAI response:', error);
      return [];
    }
  } catch (error) {
    console.error('Error calling OpenAI:', error);
    throw new Error('Failed to analyze menu. Please try again.');
  }
};