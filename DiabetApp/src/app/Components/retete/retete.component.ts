import { Component, OnInit } from '@angular/core';
import { menu } from 'src/app/Models/Menu/menu';
import { MenuService } from 'src/app/Service/menu.service';
@Component({
  selector: 'app-retete',
  templateUrl: './retete.component.html',
  styleUrls: ['./retete.component.css']
})
export class ReteteComponent implements OnInit {
  menus: menu[] = [];
  favorites: menu[] = [];

  constructor(private menuService: MenuService) { }

  ngOnInit(): void {
    this.menuService.getMenus().subscribe(data => {
      this.menus = data;
    });
  }

 

  
}
