import { nutrient } from './../Models/Nutrient/nutrient';
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AuthService } from '../Service/authentication.service'; 

@Injectable({
    providedIn: 'root'
})
export class NutrientService {
    private apiServerUrl = 'http://localhost:8080/api/nutrients';

    constructor(private http: HttpClient, private authService: AuthService) { } 

    private getAuthHeader(): HttpHeaders {
        const token = this.authService.getToken();
        return new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    }

    public getNutrients(): Observable<nutrient[]> {
        return this.http.get<nutrient[]>(`${this.apiServerUrl}/all`, { headers: this.getAuthHeader() });
    }

    public getNutrientById(nutrientId: number): Observable<nutrient> {
        return this.http.get<nutrient>(`${this.apiServerUrl}/${nutrientId}`, { headers: this.getAuthHeader() });
    }

    public createNutrient(nutrient: nutrient): Observable<nutrient> {
        return this.http.post<nutrient>(this.apiServerUrl, nutrient, { headers: this.getAuthHeader() });
    }

    public updateNutrient(nutrientId: number, nutrient: nutrient): Observable<nutrient> {
        return this.http.put<nutrient>(`${this.apiServerUrl}/${nutrientId}`, nutrient, { headers: this.getAuthHeader() });
    }

    public deleteNutrient(nutrientId: number): Observable<string> {
        return this.http.delete<string>(`${this.apiServerUrl}/${nutrientId}`, { headers: this.getAuthHeader() });
    }
}
