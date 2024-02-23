import { FoodItemService } from './../../Service/fooditem.service';
import { Component, OnInit } from '@angular/core';
import { FoodItem } from 'src/app/Models/FoodItem/fooditem';

@Component({
  selector: 'app-create-menu',
  templateUrl: './create-menu.component.html',
  styleUrls: ['./create-menu.component.css']
})
export class CreateMenuComponent implements OnInit{

  foodItems: FoodItem[] = [];
  selectedFoodItems: FoodItem[] = [];

  constructor (private foodItemService : FoodItemService)
  {}

  ngOnInit(): void {
    this.foodItemService.getFoodItems().subscribe(items => 
      {
        this.foodItems = items;
      });
  }

  onSelectedFoodItem(item:FoodItem):void{
    if(!this.selectedFoodItems.find(f=>f.id === item.id))
    {
      this.selectedFoodItems.push(item);
    }
    else
    {
      alert('Ați selectat deja acest aliment!');
    }
    
  }
  
  onDeselectFoodItem(index: number):void{
    this.selectedFoodItems.splice(index, 1);
  }

  onRemoveFoodItem(item:FoodItem):void{
    const index = this.selectedFoodItems.indexOf(item);
    if(index > -1)
    {
      this.selectedFoodItems.splice(index,1);
    }
  }

}
