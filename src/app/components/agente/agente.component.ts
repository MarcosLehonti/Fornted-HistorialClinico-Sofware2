import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AgenteGraphQLService } from '../../core/services/graphql/agente-graphql.service';
import { MenuComponent } from '../menu/menu.component';

@Component({
  standalone: true,
  selector: 'app-agente',
  templateUrl: './agente.component.html',
  styleUrls: ['./agente.component.css'],
  imports: [CommonModule, FormsModule, MenuComponent],
  providers: [AgenteGraphQLService],
})
export class AgenteComponent {
  idPaciente: number | null = null;
  archivoImagen: string = '';
  resultado: any = null;
  historico: any[] = [];
  entrenando = false;

  constructor(private agenteService: AgenteGraphQLService) {}

  analizarECG(): void {
    if (!this.idPaciente || !this.archivoImagen) {
      alert('Debe ingresar ID de paciente y archivo de imagen.');
      return;
    }

    this.agenteService.analizarECG(this.archivoImagen, this.idPaciente).subscribe({
      next: (res) => {
        this.resultado = res?.analisis;
        alert(res?.message || 'Análisis completado.');
      },
      error: () => alert('❌ Error al analizar ECG'),
    });
  }

  verHistorico(): void {
    if (!this.idPaciente) {
      alert('Ingrese el ID del paciente.');
      return;
    }

    this.agenteService.obtenerHistoricoECG(this.idPaciente).subscribe({
      next: (res) => {
        this.historico = res?.historico || [];
        alert(res?.message || 'Historial cargado.');
      },
      error: () => alert('❌ Error al obtener historial'),
    });
  }

  entrenarModelo(): void {
    this.entrenando = true;
    this.agenteService.entrenarModeloECG().subscribe({
      next: (res) => {
        alert(res?.message || 'Modelo entrenado correctamente.');
        this.entrenando = false;
      },
      error: () => {
        alert('❌ Error al entrenar modelo ECG');
        this.entrenando = false;
      },
    });
  }
}
