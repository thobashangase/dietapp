import { MealDetails } from './meal-details'
import { DietRecommendationDetails } from './diet-recommendation-details'

export class DietDetails {
    id: number;
    day: Date;
    totalCalories: number;
    dailyDietRecommendations: DietRecommendationDetails;
}