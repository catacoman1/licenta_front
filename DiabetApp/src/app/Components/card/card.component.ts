import { Component, Input, OnInit } from '@angular/core';
import { menu } from 'src/app/Models/Menu/menu';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { FoodItemService } from 'src/app/Service/fooditem.service';
import { FoodItem } from 'src/app/Models/FoodItem/fooditem';
import { Observable } from 'rxjs';
import { FoodItemSwap } from 'src/app/Models/FoodItem/fooditemswap';
import { FavoriteService } from 'src/app/Service/favorites.service';
import { AuthService } from 'src/app/Service/authentication.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],

})
export class CardComponent implements OnInit{

  @Input() menu?: menu ; 
  @Input() foodItemId?:number;
  @Input() menuid? : number;
  foodItem? : FoodItem;
  foodItemsVisible: boolean = false;
  foodItemsDetails: {[key: number]: FoodItem} = {}; 

  recommendationsLoaded: boolean = false;
  swapRecommendations: FoodItemSwap[] = [];


  constructor(
    private foodItemService:FoodItemService,
    private favoriteService:FavoriteService,
    private authService:AuthService
    ){}

  ngOnInit(): void {
    if (typeof this.foodItemId !== 'undefined') {
      this.fetchFoodItem(this.foodItemId);
    }

  }
  

  addMenuToFavorites(): void{
      const userId = this.authService.getUserId();
      if(userId && this.menuid)
      {
        this.favoriteService.addFavoriteMenu(+userId,this.menuid).subscribe({
          next:() =>
          {
            console.log('Menu added to favorites');
          },
          error:(error) =>{
            console.error('failed to add to favorites', error);
          }
         

        });
        
      }
      else{
        console.error('user id or menu id is missing');
      }
  }

  fetchFoodItem(id: number): Observable<FoodItem> {
    return this.foodItemService.getFoodItemById(id);
  }


  toggleFoodItemsVisibility(): void {
    this.foodItemsVisible = !this.foodItemsVisible;
  
    
    if (this.foodItemsVisible && Object.keys(this.foodItemsDetails).length === 0 && this.menu?.foodItemWithQuantities) {
      this.fetchAndStoreFoodItemDetails();
    }
  }

  fetchAndStoreFoodItemDetails(): void {
    this.menu?.foodItemWithQuantities.forEach(item => {
      if (item.foodItemId) {
        this.fetchFoodItem(item.foodItemId).subscribe({
          next: (foodItem: FoodItem) => {
            console.log(`Food item details for ${item.foodItemId}:`, foodItem);
            this.foodItemsDetails[item.foodItemId] = foodItem;
          },
          error: (error: any) => {
            console.error("Failed to fetch food item details", error);
          }
        });
      }
    });
  }

  getSgColor(sg?: number): string {
    if (sg !== undefined) {
      if (sg < 300) {
        return 'green';
      } else if (sg >= 300 && sg <= 500) {
        return '#FCD12A';
      } else if (sg > 500) {
        return 'red';
      }
    }
    return 'inherit';
  }

  
}


  
