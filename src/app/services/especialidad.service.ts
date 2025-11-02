import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EspecialidadService {
  //private apiUrl = 'https://backend-historialclinico-2.onrender.com/api/especialidades'; // URL del backend

  private apiUrl = 'http://localhost:8080/api/especialidades';
  constructor(private http: HttpClient) {}

  obtenerEspecialidades(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  obtenerMedicosPorEspecialidad(especialidadId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${especialidadId}/medicos`);
  }

  asignarHorarioAEspecialidad(especialidadId: number, horarioId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/${especialidadId}/asignar-horario?horarioId=${horarioId}`, {});
  }

  // Método para obtener los horarios asignados a una especialidad específica
  obtenerHorariosPorEspecialidad(especialidadId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${especialidadId}/horarios`);
  }

  obtenerDiagnosticosPorMedicoId(medicoId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/medico/${medicoId}`);
  }

  obtenerDiagnosticosPorPacienteId(pacienteId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/paciente/${pacienteId}`);
  }
}
