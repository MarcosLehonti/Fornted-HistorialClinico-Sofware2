import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {
  //private apiUrl = 'https://backend-historialclinico-2.onrender.com/api';
  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  obtenerMedicos() {
    return this.http.get(`${this.apiUrl}/usuarios/medicos`);
  }

  obtenerEspecialidades() {
    return this.http.get(`${this.apiUrl}/especialidades`);
  }

  asignarEspecialidad(usuarioId: number, especialidadId: number) {
    return this.http.post(`${this.apiUrl}/usuarios/${usuarioId}/especialidades`, {
      especialidadId: especialidadId
    });
  }
}
