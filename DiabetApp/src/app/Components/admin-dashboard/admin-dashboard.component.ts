import { NutrientService } from './../../Service/nutrient.service';
import { AuthService } from 'src/app/Service/authentication.service';
import { Component } from '@angular/core';
import { FoodItem } from 'src/app/Models/FoodItem/fooditem';
import { UserService } from 'src/app/Service/user.service';
import { FoodItemService } from 'src/app/Service/fooditem.service';
import {nutrient} from 'src/app/Models/Nutrient/nutrient';
import { MenuService } from 'src/app/Service/menu.service';
import { menu } from 'src/app/Models/Menu/menu';
import { fooditemwithquantity } from 'src/app/Models/FoodItemWithQuantity/fooditemwithquantity';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {

  foodItemsData: FoodItem[] = [];
  displayedFoodItems: FoodItem[] = [];
  showAllFoodItems: boolean = false;

  nutrientData: nutrient[] = [];
  displayedNutrients: nutrient[] = [];
  showAllNutrients: boolean = false;

  menuData: menu[] = [];
  displayedMenus: menu[] = [];
  showAllMenus: boolean = false;

  allFoodItems: FoodItem[] = [];

  foodItemForm: FormGroup;
  showFoodItemForm = false; 

  showMenuForm = false;
  menuForm: FormGroup;

  

  
  
  categoryOptions: string[] = ['fruits', 'vegetables', 'meat', 'bread', 'dairy', 'sweets'];


  constructor(private authService:AuthService,
     private userService: UserService,
      private fooditemService: FoodItemService,
      private nutrientService: NutrientService,
      private menuService: MenuService,
      private fb: FormBuilder
      ){
 
        this.foodItemForm = this.fb.group({
          name: ['', [Validators.required]],
          category: ['', [Validators.required]],
          calories: ['', [Validators.required, Validators.pattern(/^[0-9]*$/)]],
          carbs: ['', [Validators.required, Validators.pattern(/^[0-9]*$/)]],
          proteins: ['', [Validators.required, Validators.pattern(/^[0-9]*$/)]],
          fats: ['', [Validators.required, Validators.pattern(/^[0-9]*$/)]],
          fibers: ['', [Validators.required, Validators.pattern(/^[0-9]*$/)]],
          vitamins: ['', [Validators.required, Validators.pattern(/^[0-9]*$/)]],
          IG: ['', [Validators.required, Validators.pattern(/^[0-9]*$/)]]
        });

        this.menuForm = this.fb.group({
          name: ['', [Validators.required]],
          foodItems: this.fb.array([]),
          imageUrl: [''],
          sg:[0, Validators.required]

        })

        
        
    }

  ngOnInit(){
    this.loadFoodItems();
    this.loadNutrients();
    this.loadMenus();
    this.loadAllFoodItems();

    
  }

  onSubmit() {
    if (this.foodItemForm.valid) {
      const nutrientData = {
        calories: this.foodItemForm.value.calories,
        carbs: this.foodItemForm.value.carbs,
        proteins: this.foodItemForm.value.proteins,
        fats: this.foodItemForm.value.fats,
        fibers: this.foodItemForm.value.fibers,
        vitamins: this.foodItemForm.value.vitamins,
        IG: this.foodItemForm.value.IG
      };
  
      this.nutrientService.createNutrient(nutrientData).subscribe({
        next: (nutrientResponse) => {
          
          const foodItemData : Omit<FoodItem,'id'>= {
            name: this.foodItemForm.value.name,
            calories: this.foodItemForm.value.calories,
            category: this.foodItemForm.value.category,
            nutrient: nutrientResponse,
            menuList: []
            
            
          };
          console.log('nutrient created', nutrientResponse);
  
          this.fooditemService.createFoodItem(foodItemData).subscribe({
            next: (foodItemResponse) => {
              console.log('Food item created:', foodItemResponse);
              // Handle success, e.g., closing the form and refreshing the list
            },
            error: (error) => {
              console.error('Error creating food item:', error);
              // Handle error, e.g., displaying an error message
            }
          });
        },
        error: (error) => {
          console.error('Error creating nutrient:', error);
          // Handle error, e.g., displaying an error message
        }
      });
    }
  }

  onSubmitMenu() {
    if (this.menuForm.valid) {
      const formValue = this.menuForm.value;
      const menuData: menu = {
        name: formValue.name,
        foodItemWithQuantities: formValue.foodItems.map((item: any) => ({
          foodItemId: item.foodItemId,
          quantity: item.quantity
        })),
        img: formValue.imageUrl,
        sg: formValue.sg
      };
  
      this.menuService.createMenu(menuData).subscribe({
        next: (menu) => {
          // Handle successful menu creation
          // Reset the form or navigate the user to a different page
          this.showMenuForm = false;
          this.menuForm.reset();
          // You may want to re-initialize the foodItemsFormArray here as well
          while (this.foodItemsFormArray.length) {
            this.foodItemsFormArray.removeAt(0);
          }
          // Load menus to update the list
          this.loadMenus();
        },
        error: (error) => {
          // Handle error
          console.error('Error creating menu:', error);
        }
      });
    }
  }

  get foodItemsFormArray(): FormArray {
    return this.menuForm.get('foodItems') as FormArray;
  }

  removeFoodItemFromMenu(index: number) {
    this.foodItemsFormArray.removeAt(index);
  }
  


  addFoodItemToMenu() {
    const foodItemFormGroup = this.fb.group({
      foodItemId: ['', Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]] 
    });
    this.foodItemsFormArray.push(foodItemFormGroup);
  }
  

  // addFoodItem() {
  //   if (this.foodItemForm.valid) {
  //     this.fooditemService.createFoodItem(this.foodItemForm.value).subscribe({
  //       next: (res) => {
  //         // Handle success (e.g., showing a success message, reloading the food items list)
  //         this.showFoodItemForm = false; // Hide the form
  //       },
  //       error: (error) => {
  //         // Handle error
  //         console.error('There was an error!', error);
  //       }
  //     });
  //   }
  // }

  loadAllFoodItems(){
    this.fooditemService.getFoodItems().subscribe(
      (items: FoodItem[]) => {
        this.allFoodItems = items;
      },
      (error) => {
        console.error('Error loading all food items', error);
      }
    );
  }

  loadFoodItems(){
      this.fooditemService.getFoodItems().subscribe(
        (data: FoodItem[])=> {
          this.foodItemsData = data;
          this.displayedFoodItems = this.foodItemsData;
        },
        (error) => {
          console.error('Eroare la incarcarcarea alimentelor', error);
        }
      )
    }

    // toggleDisplayAllFoodItems(){
    //   this.showAllFoodItems = !this.showAllFoodItems;
    //   this.displayedFoodItems = this.showAllFoodItems ? this.foodItemsData : this.foodItemsData.slice(0, 3);
    // }

    loadNutrients(){
      this.nutrientService.getNutrients().subscribe(
      (data:nutrient[])=>{
        this.nutrientData = data;
        this.displayedNutrients = this.nutrientData.slice(0,3);

      },
      (error) => {
        console.error('Eroare la incarcarea nutrientilor', error);
      }
      )
    }

    toggleAllNutrients(){
      this.showAllNutrients = !this.showAllNutrients;
      this.displayedNutrients = this.showAllNutrients ? this.nutrientData : this.nutrientData.slice(0,3);
    }

    loadMenus(){
        this.menuService.getMenus().subscribe(
          (data:menu[])=>
          {
            this.menuData = data;
            this.displayedMenus = this.menuData;
          },
          (error) => {
            console.error('Eroare la incarcarea meniurilor', error);
          }
        )
    }

    // toggleAllMenus(){
    //   this.showAllMenus = !this.showAllMenus;
    //   this.displayedMenus = this.showAllMenus ? this.menuData : this.menuData.slice(0,3);
    // }

    getDisplayFoodItems(foodItemWithQuantities: fooditemwithquantity[]): string {
      return foodItemWithQuantities.map(data => {
        const foodItem = this.allFoodItems.find(item => item.id === data.foodItemId);
        return `${foodItem ? foodItem.name : 'Unknown'}: ${data.quantity}`;
      }).join(', ');
    }

    toggleMenuForm() {
      this.showMenuForm = !this.showMenuForm;
      console.log('Form visibility:', this.showMenuForm);
    }
      
  }


