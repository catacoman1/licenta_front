import { UserService } from 'src/app/Service/user.service';
import { Component, OnInit } from '@angular/core';
import { menu } from 'src/app/Models/Menu/menu';
import { AuthService } from 'src/app/Service/authentication.service';
import { MenuService } from 'src/app/Service/menu.service';
import { CarouselModule, CarouselResponsiveOptions } from 'primeng/carousel';
@Component({
  selector: 'app-retete',
  templateUrl: './retete.component.html',
  styleUrls: ['./retete.component.css'],
 

})
export class ReteteComponent implements OnInit {
  menus: menu[] = [];
  favorites: menu[] = [];
  userEmail: string | null = null;
  userDiabetType: string | null = null;
  userId : any
responsiveOptions: CarouselResponsiveOptions[]|undefined;

  constructor(
    private menuService: MenuService,
    private authService: AuthService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.menuService.getMenus().subscribe(data => {
      this.menus = data;
    });

    
    this.userEmail = this.authService.getUserEmail();
    const userEmail = this.authService.getUserEmail();
    this.userId = Number(this.authService.getUserId());
    if(userEmail)
    {
      this.userService.getUserDiabetByEMail(userEmail).subscribe(diabetType => {
        this.userDiabetType = diabetType;
      });
    }
    
  }

}
