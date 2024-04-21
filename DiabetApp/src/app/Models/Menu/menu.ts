import { FoodItem } from "../FoodItem/fooditem";
import { fooditemwithquantity } from "../FoodItemWithQuantity/fooditemwithquantity";

export interface menu{
    id?: number;
    name: string;
    foodItemWithQuantities: fooditemwithquantity[];
    img: string;
    sg: number;
    userId?: number;
}