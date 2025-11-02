import { Component, Input, OnInit } from '@angular/core';
import { TriajeService } from '../services/triaje.service';
import { UsuarioService } from '../services/user.service';
import { DiagnosticoService } from '../services/diagnostico.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-historial-clinico',
  templateUrl: './historial-clinico.component.html',
  styleUrls: ['./historial-clinico.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class HistorialClinicoComponent implements OnInit {
  @Input() pacienteId!: number;
  triajes: any[] = [];
  antecedentes: any[] = [];
  diagnosticos: any[] = [];

  constructor(
    private triajeService: TriajeService,
    private userService: UsuarioService,
    private diagnosticoService: DiagnosticoService
  ) {}

  ngOnInit(): void {
    this.obtenerTriajes();
    this.obtenerAntecedentes();
    this.obtenerDiagnosticos();
  }

  obtenerTriajes(): void {
    this.triajeService.obtenerTriajesPorPacienteId(this.pacienteId).subscribe(
      (data) => {
        this.triajes = data;
      },
      (error) => {
        console.error('Error al obtener triajes:', error);
      }
    );
  }

  obtenerAntecedentes(): void {
    this.userService.obtenerAntecedentesPorPacienteId(this.pacienteId).subscribe(
      (data) => {
        this.antecedentes = data;
      },
      (error) => {
        console.error('Error al obtener antecedentes:', error);
      }
    );
  }

  obtenerDiagnosticos(): void {
    this.diagnosticoService.obtenerDiagnosticosPorPacienteId(this.pacienteId).subscribe(
      (data) => {
        this.diagnosticos = data;
      },
      (error) => {
        console.error('Error al obtener diagnósticos:', error);
      }
    );
  }
}
