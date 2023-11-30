import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Service/authentication.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  first_name: string = '';
  last_name: string = '';
  email: string = '';
  password: string = '';
  diabet: string = '';
  age: number = 0;
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  
  signup(): void {
    
    if (!this.email || !this.password || !this.first_name || !this.last_name) {
      this.errorMessage = 'All fields are required.';
      return;
    }
  
    const user = {
      first_name: this.first_name,
      last_name: this.last_name,
      email: this.email,
      password: this.password,
      diabet: this.diabet,
      age: this.age
    };
  
    this.authService.signUp(user).subscribe({
      next: (response) => {
      
        this.router.navigate(['/Login']);
      },
      error: (error) => {
        
        if (error && error.error && error.error.message) {
          this.errorMessage = error.error.message;
        } else if (error && error.message) {
          this.errorMessage = error.message;
        } else {
          this.errorMessage = 'An error occurred during sign-up.';
        }
      }
    });
  }
  
}
