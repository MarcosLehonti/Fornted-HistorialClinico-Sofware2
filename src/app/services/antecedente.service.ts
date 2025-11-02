import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AntecedenteService {
  //private apiUrl = 'https://backend-historialclinico-2.onrender.com/api/antecedentes';
  private apiUrl = 'http://localhost:8080/api/antecedentes';


  constructor(private http: HttpClient) {}

  crearAntecedente(antecedenteData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/crear`, antecedenteData);
  }
}
