// src/app/services/asignacion.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AsignacionService {
  private http = inject(HttpClient);
  //private apiUrl = 'https://backend-historialclinico-2.onrender.com/api';
  private apiUrl = 'http://localhost:8080/api';


  constructor() {}

  // Obtener todos los usuarios
  obtenerUsuarios(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/asignaciones/usuarios`);
  }

  // Obtener todas las especialidades
  obtenerEspecialidades(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/especialidades`);
  }

  // Obtener todos los turnos
  obtenerTurnos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/asignaciones/turnos`);
  }

  // Obtener todos los días
  obtenerDias(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/asignaciones/dias`);
  }

  // // Asignar especialidad, turno y días al usuario
  // asignarEspecialidad(data: { usuarioId: number; especialidadId: number; turnoId: number; diaIds: number[] }): Observable<any> {
  //   return this.http.post(`${this.apiUrl}/asignaciones/asignar`, data);
  // }

  // Asignar especialidad, turno y días al usuario
asignarEspecialidad(data: { usuarioId: number; especialidadId: number; turnoId: number; diaIds: number[] }): Observable<any> {
  const headers = new HttpHeaders({
      'Content-Type': 'application/json', // Asegura que el formato sea JSON
      'Accept': 'application/json'        // Acepta la respuesta en JSON
  });
  return this.http.post(`${this.apiUrl}/asignaciones/asignar`, data, { headers });
}

}
