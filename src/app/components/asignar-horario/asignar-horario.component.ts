import { Component, OnInit } from '@angular/core';
import { HorarioService } from '../../services/horario.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-asignar-horario',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './asignar-horario.component.html',
  styleUrls: ['./asignar-horario.component.css']
})
export class AsignarHorarioComponent implements OnInit {
  medicosConDetalles: any[] = [];
  medicos: any[] = [];
  horarios: any[] = [];
  medicoSeleccionado: number | null = null;
  horarioSeleccionado: number | null = null;

  constructor(private horarioService: HorarioService) {}

  ngOnInit(): void {
    this.cargarMedicos();
    this.cargarHorarios();
    this.cargarMedicosConDetalles();
  }

  cargarMedicos(): void {
    this.horarioService.obtenerMedicos().subscribe({
      next: (medicos) => (this.medicos = medicos),
      error: (error) => console.error('Error al cargar médicos:', error),
    });
  }

  cargarHorarios(): void {
    this.horarioService.obtenerHorarios().subscribe({
      next: (horarios) => (this.horarios = horarios),
      error: (error) => console.error('Error al cargar horarios:', error),
    });
  }

  cargarMedicosConDetalles(): void {
    this.horarioService.obtenerMedicosConDetalles().subscribe({
      next: (medicos) => {
        this.medicosConDetalles = medicos.map(medico => ({
          ...medico,
          especialidadesNombres: medico.especialidades.map((e: any) => e.nombre).join(', ')
        }));
      },
      error: (error) => console.error('Error al cargar detalles de médicos:', error),
    });
  }

  asignarHorario(): void {
    if (this.medicoSeleccionado && this.horarioSeleccionado) {
      this.horarioService.asignarHorariosAMedico(this.medicoSeleccionado, { horarioIds: [this.horarioSeleccionado] }).subscribe({
        next: () => alert('Horario asignado correctamente al médico.'),
        error: (error: any) => alert('Error al asignar el horario: ' + error.message),
      });
    } else {
      alert('Por favor, selecciona un médico y un horario.');
    }
  }
}
