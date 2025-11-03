import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../menu/menu.component';
import { CitaGraphQLService } from '../../core/services/graphql/cita-graphql.service';
import { StorageService } from '../../core/services/storage.service';

@Component({
  standalone: true,
  selector: 'app-citas-usuario',
  templateUrl: './citas-usuario.component.html',
  styleUrls: ['./citas-usuario.component.css'],
  imports: [CommonModule, MenuComponent]
})
export class CitasUsuarioComponent implements OnInit {
  citas: any[] = []; // Array para almacenar las citas
  fechaActual: string = ''; // Variable para almacenar la fecha actual
  isLoading: boolean = false;

  constructor(
    private citaService: CitaGraphQLService,
    private storage: StorageService
  ) {}

  ngOnInit(): void {
    this.cargarCitas();
    this.fechaActual = this.obtenerFechaActual(); // Obtener la fecha actual al cargar el componente
  }

  // Método para cargar las citas usando el ID del usuario logueado con GraphQL
  cargarCitas(): void {
    const usuarioId = this.storage.getItem('usuarioId'); // Obtener el ID del usuario logueado
    if (usuarioId) {
      this.isLoading = true;
      this.citaService.getCitasPorUsuario(usuarioId).subscribe({
        next: (data) => {
          this.citas = data;
          this.isLoading = false;
          console.log('✅ Citas cargadas con GraphQL:', this.citas);
        },
        error: (error) => {
          console.error('❌ Error al cargar citas:', error);
          this.isLoading = false;
        }
      });
    } else {
      console.log('⚠️ Usuario ID no encontrado');
    }
  }

  // Método para obtener la fecha actual en formato legible
  obtenerFechaActual(): string {
    const hoy = new Date();
    return hoy.toLocaleDateString(); // Formato de fecha como 'dd/mm/yyyy'
  }

  // Método para obtener la ubicación de acuerdo a la especialidad
  obtenerUbicacion(especialidad: string): string {
    if (especialidad === 'Cardiología') {
      return 'Tercer piso, Sala 2';
    }


    if (especialidad === 'Pediatría') {
      return 'Tercer piso, Sala 3';
    }


    if (especialidad === 'Medicina General') {
      return 'Tercer piso, Sala 1';
    }



    if (especialidad === 'Laboratorios') {
      return 'Primer piso, Sala 1';
    }



    if (especialidad === 'Psicología') {
      return 'Primer piso, Sala 2';
    }


    if (especialidad === 'Dermatología') {
      return 'Primer piso, Sala 3';
    }


    
    // Agregar más ubicaciones específicas para otras especialidades si es necesario
    return 'Ubicación no especificada';
  }


  
}
