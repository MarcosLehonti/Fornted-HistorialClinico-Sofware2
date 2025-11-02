// src/app/components/diagnosticos/diagnosticos.component.ts
import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/user.service';
import { DiagnosticoService } from '../../services/diagnostico.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MenuComponent } from '../menu/menu.component';

@Component({
  selector: 'app-diagnosticos',
  standalone: true,
  imports: [CommonModule, FormsModule,MenuComponent],
  templateUrl: './diagnosticos.component.html',
  styleUrls: ['./diagnosticos.component.css'],
  providers: [UsuarioService, DiagnosticoService]
})
export class DiagnosticosComponent implements OnInit {
  diagnosticosMedico: any[] = [];
  diagnosticosPaciente: any[] = [];
  usuarioId: number | null = null;

  constructor(
    private usuarioService: UsuarioService,
    private diagnosticoService: DiagnosticoService
  ) {}

  ngOnInit(): void {
    this.usuarioId = this.getUsuarioId();
    if (this.usuarioId) {
      this.obtenerDiagnosticosPorMedico(this.usuarioId);
      this.obtenerDiagnosticosPorPaciente(this.usuarioId);
    }
  }

  // Obtener el ID del usuario logueado
  getUsuarioId(): number | null {
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

  // Obtener los diagnósticos hechos por el médico logueado
  obtenerDiagnosticosPorMedico(medicoId: number): void {
    this.diagnosticoService.obtenerDiagnosticosPorMedicoId(medicoId).subscribe(
      (data) => {
        this.diagnosticosMedico = data;
      },
      (error) => {
        console.error('Error al obtener diagnósticos por médico:', error);
      }
    );
  }

  // Obtener los diagnósticos para el paciente logueado
  obtenerDiagnosticosPorPaciente(pacienteId: number): void {
    this.diagnosticoService.obtenerDiagnosticosPorPacienteId(pacienteId).subscribe(
      (data) => {
        this.diagnosticosPaciente = data;
      },
      (error) => {
        console.error('Error al obtener diagnósticos por paciente:', error);
      }
    );
  }
}
