import { FoodItem } from "../FoodItem/fooditem";

export interface menu{
    id: number;
    name: string;
    foodItemList: FoodItem[];
}