import { FoodItem } from "../FoodItem/fooditem";

export interface nutrient{
    id: number;
    carbs: number;
    proteins: number;
    fats: number;
    fibers: number;
    vitamins: number;
    foodItem: FoodItem;
    ig: number;
}