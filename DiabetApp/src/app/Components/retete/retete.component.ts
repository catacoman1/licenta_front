import { Component, OnInit } from '@angular/core';
import { menu } from 'src/app/Models/Menu/menu';
import { AuthService } from 'src/app/Service/authentication.service';
import { MenuService } from 'src/app/Service/menu.service';
@Component({
  selector: 'app-retete',
  templateUrl: './retete.component.html',
  styleUrls: ['./retete.component.css']
})
export class ReteteComponent implements OnInit {
  menus: menu[] = [];
  favorites: menu[] = [];
  userEmail: string | null = null;

  constructor(
    private menuService: MenuService,
    private authService: AuthService  
  ) { }

  ngOnInit(): void {
    this.menuService.getMenus().subscribe(data => {
      this.menus = data;
    });

    
    this.userEmail = this.authService.getUserEmail();
  }

 

  
}
