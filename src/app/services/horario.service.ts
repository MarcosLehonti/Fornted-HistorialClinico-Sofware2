import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Horario {
  id: number;
  timeSlot: string;
  turnoId: number;
}

@Injectable({
  providedIn: 'root',
})
export class HorarioService {
  // private apiUrl = 'http://localhost:8080/api';
  //private apiUrl = 'https://backend-historialclinico-2.onrender.com/api/horarios';
  private apiUrl = 'http://localhost:8080/api/horarios';


  constructor(private http: HttpClient) {}

  crearHorario(horarioData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/horarios`, horarioData);
  }

  // obtenerHorarios(): Observable<any[]> {
  //   return this.http.get<any[]>(`${this.apiUrl}/horarios`);
  // }

  obtenerHorarios(): Observable<Horario[]> {
    return this.http.get<Horario[]>(this.apiUrl);
  }

  
  obtenerMedicos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/usuarios/medicos`);
  }

  asignarHorariosAMedico(medicoId: number, horarioData: { horarioIds: number[] }): Observable<any> {
    const token = localStorage.getItem('token'); 
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.post(`${this.apiUrl}/usuarios/${medicoId}/horarios`, horarioData, { headers });
  }


//   asignarHorariosAMedico(medicoId: number, horarioData: { horarioIds: number[]; }): Observable<any> {
//     const token = localStorage.getItem('token');
//     const headers = new HttpHeaders({
//       Authorization: `Bearer ${token}`,
//     });
  
//     return this.http.post(`${this.apiUrl}/usuarios/${medicoId}/horarios`, horarioData, { headers });
//   }
  

  obtenerMedicosConDetalles(): Observable<any[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get<any[]>(`${this.apiUrl}/usuarios/medicos/detalles`, { headers });
  }

  obtenerHorariosPorMedico(medicoId: number): Observable<any[]> {
    const headers = new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.get<any[]>(`${this.apiUrl}/horarios/medico/${medicoId}`, { headers });
}


}
