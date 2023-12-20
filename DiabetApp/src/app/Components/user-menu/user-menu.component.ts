import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/Service/user.service';


@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.css']
})
export class UserMenuComponent implements OnInit {

  dropdownOpen: boolean = false;

  constructor(private userService: UserService) {}

  ngOnInit() {
    // this.userEmail= this.userService.getUserEmail();

  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }
}
