import { nutrient } from './../Models/Nutrient/nutrient';
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient} from "@angular/common/http";

@Injectable(
    {
        providedIn: 'root'

    }
)
export class NutrientService{
    private apiServerUrl = 'http://localhost:8080/api/nutrients';

    constructor (private http:HttpClient) { }

    public getNutrients(): Observable <nutrient[]> {
        return this.http.get<nutrient[]>(`${this.apiServerUrl}/all`)

    }
    public getNutrientById(nutrientId: number): Observable<nutrient> {
        return this.http.get<nutrient>(`${this.apiServerUrl}/${nutrientId}`);
    }

    public createNutrient(nutrient: nutrient): Observable<nutrient> {
        return this.http.post<nutrient>(this.apiServerUrl, nutrient);
    }

    public updateNutrient(nutrientId: number, nutrient: nutrient): Observable<nutrient> {
        return this.http.put<nutrient>(`${this.apiServerUrl}/${nutrientId}`, nutrient);
    }

    public deleteNutrient(nutrientId: number): Observable<string> {
        return this.http.delete<string>(`${this.apiServerUrl}/${nutrientId}`);
    }
}