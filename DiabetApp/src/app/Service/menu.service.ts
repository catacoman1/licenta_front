import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { menu } from "../Models/Menu/menu";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AuthService } from '../Service/authentication.service'; 

@Injectable({
    providedIn: 'root'
})
export class MenuService {
    private apiServerUrl = 'http://localhost:8080/api/menus'; 

    constructor(private http: HttpClient, private authService: AuthService) { } 

    
    private createHttpOptions() {
        const token = this.authService.getToken();
        return {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            })
        };
    }

    public getMenus(): Observable<menu[]> {
        const httpOptions = this.createHttpOptions();
        return this.http.get<menu[]>(`${this.apiServerUrl}/all`, httpOptions);
    }

    public getMenuById(menuId: number): Observable<menu> {
        const httpOptions = this.createHttpOptions();
        return this.http.get<menu>(`${this.apiServerUrl}/${menuId}`, httpOptions);
    }

    public createUser(menu: menu): Observable<menu> {
        const httpOptions = this.createHttpOptions();
        return this.http.post<menu>(this.apiServerUrl, menu, httpOptions);
    }

    public updateMenu(menuId: number, menu: menu): Observable<menu> {
        const httpOptions = this.createHttpOptions();
        return this.http.put<menu>(`${this.apiServerUrl}/${menuId}`, menu, httpOptions);
    }

    public deleteMenu(menuId: number): Observable<string> {
        const httpOptions = this.createHttpOptions();
        return this.http.delete<string>(`${this.apiServerUrl}/${menuId}`, httpOptions);
    }
}
