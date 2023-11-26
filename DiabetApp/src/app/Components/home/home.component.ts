import { Component, OnInit } from '@angular/core';
import { FoodItemService } from 'src/app/Service/fooditem.service';
import { FoodItem } from './../../Models/FoodItem/fooditem';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  foodItems: FoodItem[] = []; 

  constructor(private foodItemService: FoodItemService) {}

  ngOnInit(): void {
    this.foodItemService.getFoodItems().subscribe((data: FoodItem[]) => { 
      this.foodItems = data;
    }, error => {
      console.error('Error fetching food items', error);
    });
  }
}
