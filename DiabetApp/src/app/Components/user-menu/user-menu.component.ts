import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Service/authentication.service';
import { UserService } from 'src/app/Service/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.css'],
  animations:[
    trigger('dropdown', [
      state('closed', style({
        height: '0',
        overflow: 'hidden',
        opacity: '0',
      })),
      state('open', style({
        height: '*',
        overflow: 'hidden',
        opacity: '1',
      })),
      transition('closed <=> open', animate('300ms ease-in')), 
    ])
  ]
})
export class UserMenuComponent implements OnInit {

  dropdownOpen: boolean = false;
  userName: string = '';

  constructor(private authService:AuthService,private userService:UserService, private router:Router) {}

  ngOnInit() {
    
    this.loadUserDetails();

  }
  loadUserDetails(){
    const userEmail = this.authService.getUserEmail();
    if(userEmail)
    {
      this.userService.getUserByEmail(userEmail).subscribe(user=>{
        this.userName=user.first_name;
      })
    }
  }
  get userEmail(): string|null{
    return this.authService.getUserEmail();
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }
  logout() {
    this.authService.logout();
    this.router.navigate(['/Login']); 
  }
}
