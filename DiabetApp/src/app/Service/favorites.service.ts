import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { FoodItem } from "../Models/FoodItem/fooditem";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { AuthService } from '../Service/authentication.service'; 
import { menu } from "../Models/Menu/menu";


@Injectable({
    providedIn: 'root'
})
export class FavoriteService {
    private apiServerUrl = 'http://localhost:8080/api/users'; 

    constructor(private http: HttpClient, private authService: AuthService) { } 

    private getAuthHeader(): HttpHeaders {
        const token = this.authService.getToken();
        return new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    }

    public getFavMenuByUserId(userId: number): Observable<menu[]>{
        return this.http.get<menu[]>(`${this.apiServerUrl}/${userId}/favoriteMenus`, { headers: this.getAuthHeader() });
    }


    public addFavoriteMenu(userId: number, menuId: number): Observable<menu[]> {
        const params = new HttpParams().set('menuId', menuId.toString());
        return this.http.post<menu[]>(`${this.apiServerUrl}/${userId}/fav`, null, {
            headers: this.getAuthHeader(),
            params: params
        });
    }
    
}
