import AsyncStorage from '@react-native-async-storage/async-storage';
import { MealHistory, MenuAnalysisResult } from '../types';

const MEAL_HISTORY_KEY = '@foodscan:meal_history';

export const StorageService = {
  async saveMealToHistory(menuItem: MenuAnalysisResult, restaurantName?: string): Promise<void> {
    try {
      const history = await this.getMealHistory();
      const newMeal: MealHistory = {
        id: Date.now().toString(),
        menuItem,
        date: new Date(),
        restaurantName,
      };
      
      const updatedHistory = [newMeal, ...history];
      // Keep only last 100 items to manage storage size
      const trimmedHistory = updatedHistory.slice(0, 100);
      
      await AsyncStorage.setItem(MEAL_HISTORY_KEY, JSON.stringify(trimmedHistory));
    } catch (error) {
      console.error('Error saving meal to history:', error);
    }
  },

  async getMealHistory(): Promise<MealHistory[]> {
    try {
      const historyString = await AsyncStorage.getItem(MEAL_HISTORY_KEY);
      if (!historyString) return [];
      
      const history = JSON.parse(historyString) as MealHistory[];
      return history.map(item => ({
        ...item,
        date: new Date(item.date),
      }));
    } catch (error) {
      console.error('Error getting meal history:', error);
      return [];
    }
  },

  async clearMealHistory(): Promise<void> {
    try {
      await AsyncStorage.removeItem(MEAL_HISTORY_KEY);
    } catch (error) {
      console.error('Error clearing meal history:', error);
    }
  },
};