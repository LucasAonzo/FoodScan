/**
 * Interface for a menu item analysis result
 */
export type MenuAnalysisResult = {
  /** Name of the dish */
  dishName: string;
  /** Nutritional information */
  nutritionalInfo: {
    /** Calories in kcal */
    calories: number;
    /** Protein in grams */
    protein: number;
    /** Carbohydrates in grams */
    carbs: number;
    /** Fat in grams */
    fat: number;
  };
  /** Description of the dish */
  description: string;
};