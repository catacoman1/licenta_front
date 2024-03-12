import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { User } from "../Models/User/user";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AuthService } from '../Service/authentication.service'; 
import { glicemie } from "../Models/Menu/glicemie";

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private apiServerUrl = 'http://localhost:8080/api/users'; 

    constructor(private http: HttpClient, private authService: AuthService) { } 

    private getAuthHeader(): HttpHeaders {
        const token = this.authService.getToken();
        return new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    }

    public getUsers(): Observable<User[]> {
        return this.http.get<User[]>(`${this.apiServerUrl}/all`, { headers: this.getAuthHeader() });
    }

    public getUserById(userId: number): Observable<User> {
        return this.http.get<User>(`${this.apiServerUrl}/${userId}`, { headers: this.getAuthHeader() });
    }

    public createUser(user: User): Observable<User> {
        return this.http.post<User>(this.apiServerUrl, user, { headers: this.getAuthHeader() });
    }

    public updateUser(userId: number, user: User): Observable<User> {
        return this.http.put<User>(`${this.apiServerUrl}/${userId}`, user, { headers: this.getAuthHeader() });
    }

    public deleteUser(userId: number): Observable<string> {
        return this.http.delete<string>(`${this.apiServerUrl}/${userId}`, { headers: this.getAuthHeader() });
    }

    public getUserEmail(userId: number): Observable<string> {
        return this.http.get<string>(`${this.apiServerUrl}/${userId}/email`, { headers: this.getAuthHeader() });
    }

    public getUserByEmail(email: string): Observable<User> {
        return this.http.get<User>(`${this.apiServerUrl}/email/${email}`, { headers: this.getAuthHeader() });
    }

    public getUserDiabetByEMail(email: string):Observable<string>{
        return this.http.get<User>(`${this.apiServerUrl}/email/${email}`, { headers: this.getAuthHeader() })
        .pipe(
            map(user=> user.diabet)
        );
    }
    public getGlicemieByUserId(userId: number):Observable<glicemie[]>{
        return this.http.get<glicemie[]>(`${this.apiServerUrl}/${userId}/glicemie`, { headers: this.getAuthHeader() });
    }
    public createGlicemie(userId: number, glicemie: glicemie): Observable<glicemie> {
        return this.http.post<glicemie>(`${this.apiServerUrl}/${userId}/glicemie`, glicemie, { headers: this.getAuthHeader() });
      }
}
