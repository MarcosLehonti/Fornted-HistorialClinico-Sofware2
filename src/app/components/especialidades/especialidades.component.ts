import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EspecialidadService } from '../../services/especialidad.service';
import { MenuComponent } from '../menu/menu.component';
import { RouterModule, Router } from '@angular/router';
import { HorarioService } from '../../services/horario.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-especialidades',
  standalone: true,
  imports: [CommonModule, MenuComponent, RouterModule, FormsModule],
  templateUrl: './especialidades.component.html',
  styleUrls: ['./especialidades.component.css']
})
export class EspecialidadesComponent implements OnInit {
  especialidades: any[] = [];
  medicos: any[] = [];
  especialidadSeleccionadaId: number | undefined;
  horarioSeleccionadoId: number | undefined;
  horarios: any[] = [];
  horariosAsignados: { [especialidadId: number]: { [dia: string]: any[] } } = {};

  diasSemana: string[] = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

  constructor(
    private especialidadService: EspecialidadService,
    private router: Router,
    private horarioService: HorarioService
  ) {}

  ngOnInit(): void {
    this.cargarEspecialidades();
    this.cargarHorarios();
  }

  cargarEspecialidades(): void {
    this.especialidadService.obtenerEspecialidades().subscribe({
      next: (data) => {
        this.especialidades = data;
        // Inicializa los horarios asignados para cada especialidad
        this.especialidades.forEach((especialidad) => {
          this.horariosAsignados[especialidad.id] = {};
          this.diasSemana.forEach((dia) => {
            this.horariosAsignados[especialidad.id][this.convertirDiaAEspanolADiaIngles(dia)] = [];
          });
          this.cargarHorariosPorEspecialidad(especialidad.id);
        });
      },
      error: (err) => console.error('Error al obtener las especialidades', err)
    });
  }

  cargarHorarios(): void {
    this.horarioService.obtenerHorarios().subscribe({
      next: (data) => this.horarios = data,
      error: (err) => console.error('Error al obtener los horarios', err)
    });
  }

  mostrarMedicos(especialidadId: number): void {
    this.especialidadSeleccionadaId = especialidadId;
    this.especialidadService.obtenerMedicosPorEspecialidad(especialidadId).subscribe({
      next: (data) => this.medicos = data || [],
      error: (err) => console.error('Error al obtener los médicos de la especialidad', err)
    });
  }

  seleccionarFicha(especialidadId: number | undefined, medicoId: number | undefined): void {
    if (especialidadId && medicoId) {
      this.router.navigate([`/dias`, especialidadId, medicoId]);
    } else {
      console.error('Error: especialidadId o medicoId son undefined');
    }
  }

  asignarHorario(): void {
    if (this.horarioSeleccionadoId && this.especialidadSeleccionadaId !== undefined) {
      this.especialidadService.asignarHorarioAEspecialidad(this.especialidadSeleccionadaId!, this.horarioSeleccionadoId).subscribe({
        next: () => {
          alert('Horario asignado correctamente a la especialidad.');
          this.cargarHorariosPorEspecialidad(this.especialidadSeleccionadaId!);
        },
        error: (err) => console.error('Error al asignar el horario a la especialidad', err)
      });
    } else {
      alert('Por favor, selecciona un horario y una especialidad.');
    }
  }
  
  
  cargarHorariosPorEspecialidad(especialidadId: number): void {
    this.especialidadService.obtenerHorariosPorEspecialidad(especialidadId).subscribe({
      next: (data) => {
        this.diasSemana.forEach((dia) => {
          const diaIngles = this.convertirDiaAEspanolADiaIngles(dia);
          this.horariosAsignados[especialidadId][diaIngles] = data.filter(horario => horario.dia === diaIngles);
        });
      },
      error: (err) => console.error('Error al cargar los horarios de la especialidad', err)
    });
  }

  public convertirDiaAEspanolADiaIngles(dia: string): string {
    const diasMap: { [key: string]: string } = {
      'Lunes': 'MONDAY',
      'Martes': 'TUESDAY',
      'Miércoles': 'WEDNESDAY',
      'Jueves': 'THURSDAY',
      'Viernes': 'FRIDAY',
      'Sábado': 'SATURDAY',
      'Domingo': 'SUNDAY'
    };

    return diasMap[dia] || '';
  }
  seleccionarEspecialidad(especialidadId: number) {
    this.especialidadSeleccionadaId = especialidadId;
  }
  
}
