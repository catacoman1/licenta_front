import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Service/authentication.service';
import { UserService } from 'src/app/Service/user.service';



@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.css']
})
export class UserMenuComponent implements OnInit {

  dropdownOpen: boolean = false;
  userName: string = '';

  constructor(private authService:AuthService,private userService:UserService) {}

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
}
