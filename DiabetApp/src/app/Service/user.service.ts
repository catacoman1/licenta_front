import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "../User/user";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private apiServerUrl = 'http://localhost:8080/api/users'; 

    constructor(private http: HttpClient) { }

    public getUsers(): Observable<User[]> {
        return this.http.get<User[]>(`${this.apiServerUrl}/all`);
    }

    public getUserById(userId: number): Observable<User> {
        return this.http.get<User>(`${this.apiServerUrl}/${userId}`);
    }

    public createUser(user: User): Observable<User> {
        return this.http.post<User>(this.apiServerUrl, user);
    }

    public updateUser(userId: number, user: User): Observable<User> {
        return this.http.put<User>(`${this.apiServerUrl}/${userId}`, user);
    }

    public deleteUser(userId: number): Observable<string> {
        return this.http.delete<string>(`${this.apiServerUrl}/${userId}`);
    }
}
