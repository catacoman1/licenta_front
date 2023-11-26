import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' }) 
export class AuthService {
  private loginUrl = 'http://localhost:8080/api/auth/authenticate'; 

  constructor(private http: HttpClient) {} 

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post<any>(this.loginUrl, credentials).pipe(
      tap(response => {
        
        localStorage.setItem('token', response.token);
      })
    );
  }
  logout(): void {
    localStorage.removeItem('token');
    
  }
  getToken(): string | null {
    return localStorage.getItem('token');
  }
  
  
}
