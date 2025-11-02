import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DiagnosticoService {
  //private apiUrl = 'https://backend-historialclinico-2.onrender.com/api/diagnosticos';
  private apiUrl = 'http://localhost:8080/api/diagnosticos';

  constructor(private http: HttpClient) {}

  crearDiagnostico(diagnosticoData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/crear`, diagnosticoData);
  }

  obtenerDiagnosticosPorMedicoId(medicoId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/medico/${medicoId}`);
  }

  obtenerDiagnosticosPorPacienteId(pacienteId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/paciente/${pacienteId}`);
  }
}
