// src/app/components/citas-medico/citas-medico.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../menu/menu.component';
import { CitaGraphQLService } from '../../core/services/graphql/cita-graphql.service';

@Component({
  standalone: true,
  selector: 'app-citas-medico',
  templateUrl: './citas-medico.component.html',
  styleUrls: ['./citas-medico.component.css'],
  imports: [CommonModule, MenuComponent],
})
export class CitasMedicoComponent implements OnInit {
  citas: any[] = []; // Almacena las citas asignadas al médico
  isLoading: boolean = false;

  constructor(private citaService: CitaGraphQLService) {}

  ngOnInit(): void {
    this.cargarCitasMedico();
  }

  // Método para cargar las citas del médico logueado con GraphQL
  cargarCitasMedico(): void {
    const medicoId = localStorage.getItem('usuarioId'); // Obtener el ID del médico logueado
    if (medicoId) {
      this.isLoading = true;
      this.citaService.getCitasPorMedico(medicoId).subscribe({
        next: (data) => {
          this.citas = data;
          this.isLoading = false;
          console.log('✅ Citas del médico cargadas con GraphQL:', this.citas);
        },
        error: (error) => {
          console.error('❌ Error al cargar citas del médico:', error);
          this.isLoading = false;
        }
      });
    } else {
      console.error('ID del médico no encontrado en localStorage');
    }
  }
}
