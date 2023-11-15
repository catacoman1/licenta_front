import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { FoodItem } from "../Models/FoodItem/fooditem";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private apiServerUrl = 'http://localhost:8080/api/fooditems'; 

    constructor(private http: HttpClient) { }

    public getFoodItems(): Observable<FoodItem[]> {
        return this.http.get<FoodItem[]>(`${this.apiServerUrl}/all`);
    }

    public getFoodItemById(FoodItemId: number): Observable<FoodItem> {
        return this.http.get<FoodItem>(`${this.apiServerUrl}/${FoodItemId}`);
    }

    public createFoodItem(FoodItem: FoodItem): Observable<FoodItem> {
        return this.http.post<FoodItem>(this.apiServerUrl, FoodItem);
    }

    public updateFoodItem(FoodItemId: number, FoodItem: FoodItem): Observable<FoodItem> {
        return this.http.put<FoodItem>(`${this.apiServerUrl}/${FoodItemId}`, FoodItem);
    }

    public deleteFoodItem(FoodItemId: number): Observable<string> {
        return this.http.delete<string>(`${this.apiServerUrl}/${FoodItemId}`);
    }
}
