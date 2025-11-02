// src/app/components/citas-medico/citas-medico.component.ts
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../menu/menu.component';

@Component({
  standalone: true,
  selector: 'app-citas-medico',
  templateUrl: './citas-medico.component.html',
  styleUrls: ['./citas-medico.component.css'],
  providers: [ApiService],
  imports: [CommonModule, MenuComponent],
})
export class CitasMedicoComponent implements OnInit {
  citas: any[] = []; // Almacena las citas asignadas al médico

  constructor(private apiService: ApiService, private authService: AuthService) {}

  ngOnInit(): void {
    this.cargarCitasMedico();
  }

  // Método para cargar las citas del médico logueado
  cargarCitasMedico(): void {
    const medicoId = this.authService.getUsuarioId(); // Obtener el ID del médico logueado
    if (medicoId) {
      this.apiService.obtenerCitasPorMedico(medicoId).subscribe(
        (data) => {
          this.citas = data;
          console.log('Citas asignadas al médico:', this.citas); // Verifica en la consola
        },
        (error) => {
          console.error('Error al cargar citas del médico:', error);
        }
      );
    } else {
      console.error('ID del médico no encontrado');
    }
  }
}
