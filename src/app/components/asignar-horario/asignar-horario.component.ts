import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MenuComponent } from '../menu/menu.component';
import { UsuarioGraphQLService } from '../../core/services/graphql/usuario-graphql.service';
import { HorarioGraphQLService } from '../../core/services/graphql/horario-graphql.service';

@Component({
  selector: 'app-asignar-horario',
  standalone: true,
  imports: [CommonModule, FormsModule, MenuComponent],
  templateUrl: './asignar-horario.component.html',
  styleUrls: ['./asignar-horario.component.css']
})
export class AsignarHorarioComponent implements OnInit {
  medicosConDetalles: any[] = [];
  medicos: any[] = [];
  horarios: any[] = [];
  medicoSeleccionado: string | null = null;
  horarioSeleccionado: string | null = null;
  isLoading: boolean = false;

  constructor(
    private usuarioGraphQLService: UsuarioGraphQLService,
    private horarioGraphQLService: HorarioGraphQLService
  ) {}

  ngOnInit(): void {
    this.cargarMedicos();
    this.cargarHorarios();
    this.cargarMedicosConDetalles();
  }

  cargarMedicos(): void {
    this.usuarioGraphQLService.getMedicos().subscribe({
      next: (medicos) => {
        this.medicos = medicos;
        console.log('✅ Médicos cargados con GraphQL:', medicos);
      },
      error: (error) => console.error('❌ Error al cargar médicos:', error),
    });
  }

  cargarHorarios(): void {
    this.horarioGraphQLService.getHorarios().subscribe({
      next: (horarios) => {
        this.horarios = horarios;
        console.log('✅ Horarios cargados con GraphQL:', horarios);
      },
      error: (error) => console.error('❌ Error al cargar horarios:', error),
    });
  }

  cargarMedicosConDetalles(): void {
    this.usuarioGraphQLService.getMedicos().subscribe({
      next: (medicos) => {
        this.medicosConDetalles = medicos.map(medico => ({
          ...medico,
          especialidadesNombres: medico.especialidades?.map((e: any) => e.nombre).join(', ') || 'Sin especialidad'
        }));
        console.log('✅ Médicos con detalles cargados:', this.medicosConDetalles);
      },
      error: (error) => console.error('❌ Error al cargar detalles de médicos:', error),
    });
  }

  asignarHorario(): void {
    if (!this.medicoSeleccionado || !this.horarioSeleccionado) {
      alert('Por favor, selecciona un médico y un horario.');
      return;
    }

    // Nota: Esta funcionalidad requiere una mutation en el backend
    // Por ahora solo mostramos un mensaje
    console.log('✅ Asignando horario:', {
      medicoId: this.medicoSeleccionado,
      horarioId: this.horarioSeleccionado
    });
    alert('Funcionalidad de asignación de horario pendiente de implementar en el backend GraphQL');
  }
}
