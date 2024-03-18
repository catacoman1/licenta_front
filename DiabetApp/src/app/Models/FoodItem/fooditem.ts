import { menu } from "src/app/Models/Menu/menu";
import { nutrient } from "../Nutrient/nutrient";

export interface FoodItem{
    id: number;
    name: string;
    calories: number;
    category:string;
    menuList: menu[]; 
    nutrient: nutrient; 
}