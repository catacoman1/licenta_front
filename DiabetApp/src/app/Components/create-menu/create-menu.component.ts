import { FoodItemService } from './../../Service/fooditem.service';
import { Component, OnInit } from '@angular/core';
import { FoodItem } from 'src/app/Models/FoodItem/fooditem';
import { MenuService } from 'src/app/Service/menu.service';
import { menu } from 'src/app/Models/Menu/menu';
import { MessageService } from 'primeng/api';
import { UserService } from 'src/app/Service/user.service';
import { jwtDecode } from 'jwt-decode';
import { AuthService } from 'src/app/Service/authentication.service';
import { FoodItemSwap } from 'src/app/Models/FoodItem/fooditemswap';
import { NutrientService } from 'src/app/Service/nutrient.service';

interface SelectedFoodItemWithQuantity{
  foodItem:FoodItem;
  quantity: number;
}

interface Recommendations {
  [key: string]: FoodItemSwap[];
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
  recommendations: { [category: string]: FoodItemSwap[] } = {};
  recommendationLoaded = false;

  constructor(
    private messageService : MessageService,
    private foodItemService: FoodItemService,
    private menuService: MenuService,
    private userService: UserService,
    private authService: AuthService,
    private nutrientService: NutrientService
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
    if (this.selectedFoodItemsWithQuantities.some(f => f.foodItem.id === item.id)) {
      this.showErrorSelectare();
      return;
    }
  
    this.selectedFoodItemsWithQuantities.push({ foodItem: item, quantity: 1});
    if (item.nutrient.id) {
      this.nutrientService.getNutrientById(item.nutrient.id).subscribe({
        
        next: (nutrient) => {
          const ig = nutrient.ig;
          
          if (item.category && ig != null) {
            this.loadRecommendationsForItem(item.category, ig);
          } else {
            console.warn(`IG is null for nutrient of selected item: ${item.name}`);
          }
        },
        error: (error) => {
          console.error(`Error fetching nutrient for ${item.name}:`, error);
        }
      });
    } else {
      console.warn(`Nutrient ID not found for selected item: ${item.name}`);
    }
  }
  

  onDeselectFoodItem(index: number): void {
    this.selectedFoodItemsWithQuantities.splice(index, 1);
  }

  onRemoveFoodItem(index: number): void {
    
      this.selectedFoodItemsWithQuantities.splice(index, 1);
    
  }

  loadRecommendationsForItem(category: string, ig: number): void {
    
    if(category && ig != null)
    this.foodItemService.getLowerIgAlternatives(category, ig).subscribe({
        next: (recommendations) => {
            
            this.recommendations[category] = recommendations; 
            this.recommendationLoaded = true;
            console.log("Recommendations loaded for category " + category + ": ", recommendations);
        },
        error: (error) => {
            console.error('Error fetching recommendations', error);
        }
    });
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
        //this.loadSwapRecommendations(savedMenu.id as number);
        this.recommendationLoaded = true;
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

  getRecommendationKeys(): string[] {
    return Object.keys(this.recommendations);
  }
  

}
