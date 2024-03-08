import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { FoodItem } from "../Models/FoodItem/fooditem";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AuthService } from '../Service/authentication.service'; 

@Injectable({
    providedIn: 'root'
})
export class FoodItemService {
    private apiServerUrl = 'http://localhost:8080/api/fooditems'; 

    constructor(private http: HttpClient, private authService: AuthService) { } 

    private getAuthHeader(): HttpHeaders {
        const token = this.authService.getToken();
        return new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    }

    public getFoodItems(): Observable<FoodItem[]> {
        return this.http.get<FoodItem[]>(`${this.apiServerUrl}/all`, { headers: this.getAuthHeader() });
    }

    public getFoodItemById(FoodItemId: number): Observable<FoodItem> {
        return this.http.get<FoodItem>(`${this.apiServerUrl}/${FoodItemId}`, { headers: this.getAuthHeader() });
    }

    public createFoodItem(FoodItem: FoodItem): Observable<FoodItem> {
        return this.http.post<FoodItem>(this.apiServerUrl, FoodItem, { headers: this.getAuthHeader() });
    }

    public updateFoodItem(FoodItemId: number, FoodItem: FoodItem): Observable<FoodItem> {
        return this.http.put<FoodItem>(`${this.apiServerUrl}/${FoodItemId}`, FoodItem, { headers: this.getAuthHeader() });
    }

    public deleteFoodItem(FoodItemId: number): Observable<string> {
        return this.http.delete<string>(`${this.apiServerUrl}/${FoodItemId}`, { headers: this.getAuthHeader() });
    }

    public getFoodItemByCategory(Category: string):Observable<FoodItem[]>{
        return this.http.get<FoodItem[]>(`${this.apiServerUrl}/category/${Category}`, { headers: this.getAuthHeader() });
    }
}
