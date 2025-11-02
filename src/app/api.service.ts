import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
   //private apiUrl = 'https://backend-historialclinico-2.onrender.com/api';
  private apiUrl = 'http://localhost:8080/api';


  constructor(private http: HttpClient) {}

  obtenerEspecialidades(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/especialidades`);
  }

  obtenerUsuariosPorEspecialidad(especialidadId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/asignaciones/usuarios-por-especialidad/${especialidadId}`);
  }

  // Método para crear la cita
  crearCita(cita: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/citas/crear`, cita);
  }


  // Método para obtener las citas de un usuario por su ID
  obtenerCitasPorUsuario(usuarioId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/citas/usuario/${usuarioId}`);
  }


  obtenerCitasPorMedico(medicoId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/citas/medico/${medicoId}`);
  }
}
