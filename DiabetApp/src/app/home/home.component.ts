import { Component, OnInit } from '@angular/core';
import { UserService } from '../Service/user.service'
import { User } from '../Models/User/user'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  users: User[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe((data) => {
      this.users = data;
    }, error => {
      console.error('Error fetching users', error);
    });
  }
}
