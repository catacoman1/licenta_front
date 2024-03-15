import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Token } from '@angular/compiler';
import { jwtDecode } from 'jwt-decode';


@Injectable({ providedIn: 'root' }) 
export class AuthService {
  private loginUrl = 'http://localhost:8080/api/auth/authenticate'; 
  private signupUrl = 'http://localhost:8080/api/auth/register';
  constructor(private http: HttpClient) {} 

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post<any>(this.loginUrl, credentials).pipe(
      tap(response => {
        
        localStorage.setItem('token', response.token);
        const decodedToken= jwtDecode<any>(response.token);
        localStorage.setItem('userEmail',decodedToken.sub);
        localStorage.setItem('userRoles', decodedToken.roles);
        // console.log(response.token);
        
        
      })
    );
  }
  signUp(userDetails: { email: string; password: string; first_name: string; last_name: string; diabet: string; age: number }): Observable<any> {
    return this.http.post<any>(this.signupUrl, userDetails);
  }
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userRoles');
    
  }
  getToken(): string | null {
    return localStorage.getItem('token');
    
  }
  getUserEmail() : string | null {
    return localStorage.getItem('userEmail');
  }

  hasRole(requiredRole: string): boolean {
    const roles = localStorage.getItem('userRoles');
    // Assuming roles are stored as a single string, you might need to adjust based on how you store them
    return roles ? roles.split(',').includes(requiredRole) : false;
  }
  
  
}
