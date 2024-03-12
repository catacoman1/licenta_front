import { FoodItemService } from './../../Service/fooditem.service';
import { Component, OnInit } from '@angular/core';
import { FoodItem } from 'src/app/Models/FoodItem/fooditem';
import { MenuService } from 'src/app/Service/menu.service';
import { menu } from 'src/app/Models/Menu/menu';
import { MessageService } from 'primeng/api';

interface SelectedFoodItemWithQuantity{
  foodItem:FoodItem;
  quantity: number;
}

@Component({
  selector: 'app-create-menu',
  templateUrl: './create-menu.component.html',
  styleUrls: ['./create-menu.component.css'],
  providers: [MessageService]
})

export class CreateMenuComponent implements OnInit {

  foodItems: FoodItem[] = [];
  selectedFoodItems: FoodItem[] = [];
  menuName: string = '';
  selectedFoodItemsWithQuantities: SelectedFoodItemWithQuantity[] = [];
  categories: string[] = ['fruits','vegetables','dairy','bread','sweets','meat'];
  selectedCateogry: string = '';
  SG: number = 0;

  constructor(
    private messageService : MessageService,
    private foodItemService: FoodItemService,
    private menuService: MenuService
  ) { }

  ngOnInit(): void {
    this.foodItemService.getFoodItems().subscribe(items => {
      this.foodItems = items;
    });
  }
  showSuccess() {
    this.messageService.add({severity:'success', summary: 'Success', detail: 'Meniu salvat cu succes!'});
  }

  showErrorSalvare() {
    this.messageService.add({severity:'error', summary: 'Error', detail: 'Eroare la salvarea meniului'});
  }

  showErrorSelectare() {
    this.messageService.add({severity:'error', summary: 'Error', detail: 'Ați selectat deja acest aliment!'});
  }

  showErrorNumeMeniu() {
    this.messageService.add({severity:'error', summary: 'Error', detail: 'Nu ați selectat un nume pentru meniul dumneavoastră!'});
  }

  onSelectedFoodItem(item: FoodItem): void {
    if (!this.selectedFoodItemsWithQuantities.find(f => f.foodItem.id === item.id)) {
      this.selectedFoodItemsWithQuantities.push({ foodItem:item, quantity: 1});
    }
    else {
      this.showErrorSelectare();
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
      this.showErrorNumeMeniu();
      return;
    }
    const newMenu = {
      name: this.menuName,
      foodItemWithQuantities: this.selectedFoodItemsWithQuantities.map(item => ({
        foodItemId: item.foodItem.id,
        quantity: item.quantity
      })),
      img: 'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png' ,
      sg: this.SG
    };
  
    
    this.menuService.createMenu(newMenu).subscribe({
      next: (savedMenu) => {
        
        this.selectedFoodItemsWithQuantities = [];
        this.menuName = '';
        this.showSuccess();
      },
      error: (error) => {
        console.error('Error saving menu', error);
        this.showErrorSalvare();
      }
    });
  }

  filterFoodItemsByCategory(category: string): void {
    this.selectedCateogry = category;
    this.foodItemService.getFoodItemByCategory(category).subscribe({
      next: (items) => {
        this.foodItems = items;
      },
      error: (error) => {
        console.error('Error fetching food items by category', error);
        
      }
    });
  }
  

}
