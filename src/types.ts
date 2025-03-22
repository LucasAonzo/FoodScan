export interface NutritionalInfo {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface MenuAnalysisResult {
  dishName: string;
  description: string;
  nutritionalInfo: NutritionalInfo;
  isVegan: boolean;
  timestamp?: Date;
}

export interface MealHistory {
  id: string;
  menuItem: MenuAnalysisResult;
  date: Date;
  restaurantName?: string;
}

export type FilterType = 'all' | 'highProtein' | 'lowCalorie' | 'lowCarb' | 'vegan';