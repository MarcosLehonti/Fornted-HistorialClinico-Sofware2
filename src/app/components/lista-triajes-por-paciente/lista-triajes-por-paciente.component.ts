// src/app/components/lista-triajes-por-paciente/lista-triajes-por-paciente.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TriajeService } from '../../services/triaje.service'; // Servicio de triaje
import { FormsModule } from '@angular/forms';
import { MenuComponent } from '../menu/menu.component';

@Component({
  standalone: true,
  selector: 'app-lista-triajes-por-paciente',
  templateUrl: './lista-triajes-por-paciente.component.html',
  styleUrls: ['./lista-triajes-por-paciente.component.css'],
  imports: [CommonModule, FormsModule,MenuComponent],
  providers: [TriajeService]
})
export class ListaTriajesPorPacienteComponent implements OnInit {
  triajes: any[] = [];

  constructor(private triajeService: TriajeService) {}

  ngOnInit(): void {
    const pacienteId = this.getPacienteId();
    if (pacienteId !== null) {
      this.obtenerTriajesPorPaciente(pacienteId);
    }
  }

  // Método para obtener el pacienteId desde el token
  getPacienteId(): number | null {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const payloadBase64 = token.split('.')[1];
        const decodedPayload = JSON.parse(atob(payloadBase64));
        return decodedPayload.usuarioId || null;
      } catch (error) {
        console.error('Error al decodificar el token:', error);
        return null;
      }
    }
    return null;
  }

  obtenerTriajesPorPaciente(pacienteId: number): void {
    this.triajeService.obtenerTriajesPorPacienteId(pacienteId).subscribe({
      next: (data) => (this.triajes = data),
      error: (error) => console.error('Error al obtener triajes:', error),
    });
  }
}
