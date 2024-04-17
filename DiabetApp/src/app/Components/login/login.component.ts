import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/Service/authentication.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService]
})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage = '';
  constructor
    (
  private authService:AuthService, 
  private router:Router,
  private messageService : MessageService
    )
  {}
login(): void {
  this.authService.login({ email: this.email, password: this.password })
    .subscribe({
      next: (response) => {
       this.router.navigate(['/Home'])
      },
      error: (error) => {
        
        this.errorMessage = 'Invalid email or password';
        console.error(error);
        this.showErrorLogare();
      }
    });
}
signup():void{
  this.router.navigate(['/Signup'])
}
showErrorLogare() {
  this.messageService.add({severity:'error', summary: 'Error', detail: 'Eroare la înregistrare'});
}


}