import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../menu/menu.component';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { EspecialidadGraphQLService } from '../../core/services/graphql/especialidad-graphql.service';

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
  especialidadSeleccionadaId: string | undefined;
  horarioSeleccionadoId: number | undefined;
  horarios: any[] = [];
  horariosAsignados: { [especialidadId: string]: { [dia: string]: any[] } } = {};
  isLoading: boolean = false;

  diasSemana: string[] = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

  constructor(
    private especialidadService: EspecialidadGraphQLService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarEspecialidades();
  }

  cargarEspecialidades(): void {
    this.isLoading = true;
    this.especialidadService.getEspecialidades().subscribe({
      next: (data) => {
        this.especialidades = data;
        this.isLoading = false;
        console.log('✅ Especialidades obtenidas con GraphQL:', this.especialidades);
      },
      error: (err) => {
        console.error('❌ Error al obtener las especialidades:', err);
        this.isLoading = false;
      }
    });
  }

  seleccionarFicha(especialidadId: string | undefined, medicoId: string | undefined): void {
    if (especialidadId && medicoId) {
      this.router.navigate([`/dias`, especialidadId, medicoId]);
    } else {
      console.error('Error: especialidadId o medicoId son undefined');
    }
  }

  seleccionarEspecialidad(especialidadId: string) {
    this.especialidadSeleccionadaId = especialidadId;
  }
  
}
