import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { menu } from "../Models/Menu/menu";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private apiServerUrl = 'http://localhost:8080/api/menus'; 

    constructor(private http: HttpClient) { }

    public getMenus(): Observable<menu[]> {
        return this.http.get<menu[]>(`${this.apiServerUrl}/all`);
    }

    public getMenuById(menuId: number): Observable<menu> {
        return this.http.get<menu>(`${this.apiServerUrl}/${menuId}`);
    }

    public createUser(menu: menu): Observable<menu> {
        return this.http.post<menu>(this.apiServerUrl, menu);
    }

    public updateMenu(menuId: number, menu: menu): Observable<menu> {
        return this.http.put<menu>(`${this.apiServerUrl}/${menuId}`, menu);
    }

    public deleteMenu(menuId: number): Observable<string> {
        return this.http.delete<string>(`${this.apiServerUrl}/${menuId}`);
    }
}
