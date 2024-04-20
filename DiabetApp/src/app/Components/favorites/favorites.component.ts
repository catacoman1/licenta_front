import { UserService } from './../../Service/user.service';
import { Component, OnInit } from '@angular/core';
import { menu } from 'src/app/Models/Menu/menu';
import { AuthService } from 'src/app/Service/authentication.service';
import { FavoriteService } from 'src/app/Service/favorites.service';
import { MenuService } from 'src/app/Service/menu.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit{
  
  favoriteMenus:menu[] = [];
  

  
  constructor(
    private menuService:MenuService,
    private userService:UserService,
    private favoriteService: FavoriteService,
    private authenticationService: AuthService
  ){

  }

  ngOnInit(): void {
    
    this.loadFavoriteMenus();


  }

  private loadFavoriteMenus():void{
    const userId = this.authenticationService.getUserId();
    if(userId)
    {
      this.favoriteService.getFavMenuByUserId(+userId).subscribe({
        next: (menus) => this.favoriteMenus = menus,
        error: (error) => console.error('erorare', error)
      });
    } else {
      console.error('user id not found');
    }
  }


}
