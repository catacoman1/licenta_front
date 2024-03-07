import { FoodItemService } from './../../Service/fooditem.service';
import { Component, OnInit } from '@angular/core';
import { FoodItem } from 'src/app/Models/FoodItem/fooditem';
import { MenuService } from 'src/app/Service/menu.service';
import { menu } from 'src/app/Models/Menu/menu';

interface SelectedFoodItemWithQuantity{
  foodItem:FoodItem;
  quantity: number;
}

@Component({
  selector: 'app-create-menu',
  templateUrl: './create-menu.component.html',
  styleUrls: ['./create-menu.component.css']
})

export class CreateMenuComponent implements OnInit {

  foodItems: FoodItem[] = [];
  selectedFoodItems: FoodItem[] = [];
  menuName: string = '';
  selectedFoodItemsWithQuantities: SelectedFoodItemWithQuantity[] = [];


 

  constructor(
    private foodItemService: FoodItemService,
    private menuService: MenuService
  ) { }

  ngOnInit(): void {
    this.foodItemService.getFoodItems().subscribe(items => {
      this.foodItems = items;
    });
  }

  onSelectedFoodItem(item: FoodItem): void {
    if (!this.selectedFoodItemsWithQuantities.find(f => f.foodItem.id === item.id)) {
      this.selectedFoodItemsWithQuantities.push({ foodItem:item, quantity: 1});
    }
    else {
      alert('Ați selectat deja acest aliment!');
    }

  }

  onDeselectFoodItem(index: number): void {
    this.selectedFoodItemsWithQuantities.splice(index, 1);
  }

  onRemoveFoodItem(index: number): void {
    
      this.selectedFoodItemsWithQuantities.splice(index, 1);
    
  }

  onSaveMenu(): void {
    if (!this.menuName.trim()) {
      alert('Introduceți un nume pentru meniul dumneavoastră!');
      return;
    }
    const newMenu = {
      name: this.menuName,
      foodItemWithQuantities: this.selectedFoodItemsWithQuantities.map(item => ({
        foodItemId: item.foodItem.id,
        quantity: item.quantity
      })),
      img: 'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png' 
    };
  
    
    this.menuService.createMenu(newMenu).subscribe({
      next: (savedMenu) => {
        
        this.selectedFoodItemsWithQuantities = [];
        this.menuName = '';
        alert('Meniu creat cu succes!');
      },
      error: (error) => {
        console.error('Error saving menu', error);
        alert('Eroare la salvarea meniului.');
      }
    });
  }
  

}
