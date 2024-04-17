import { MessageService } from 'primeng/api';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Service/authentication.service';
import { Message } from 'postcss';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [MessageService]
})
export class SignupComponent {
  first_name = '';
  last_name = '';
  email = '';
  password = '';
  diabet = '';
  age = 0;
  errorMessage = '';
  role="USER";

  constructor(private authService: AuthService, private router: Router, private messageService: MessageService) {}

  
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
      age: this.age,
      role: this.role = "USER"
    
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
          this.showErrorInregistrare()
        }
      }
    });
  }
  showErrorInregistrare() {
    this.messageService.add({severity:'error', summary: 'Error', detail: 'Eroare la înregistrare'});
  }
  
}
