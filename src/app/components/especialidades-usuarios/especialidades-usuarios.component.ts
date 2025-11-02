// src/app/components/especialidades-usuarios/especialidades-usuarios.component.ts
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../menu/menu.component';

@Component({
  standalone: true,
  selector: 'app-especialidades-usuarios',
  templateUrl: './especialidades-usuarios.component.html',
  styleUrls: ['./especialidades-usuarios.component.css'],
  providers: [ApiService],
  imports: [CommonModule, MenuComponent],
})
export class EspecialidadesUsuariosComponent implements OnInit {
  especialidades: any[] = [];
  usuarios: any[] = [];
  selectedEspecialidadId: number | null = null;
  usuarioId: number | null;
  usuarioNombre: string | null;

  // Define turnos y días
  turnos = [
    { nombre: 'Mañana', id: 1 },
    { nombre: 'Tarde', id: 2 },
    { nombre: 'Noche', id: 3 },
  ];

  dias = [
    { nombre: 'Lunes', id: 1 },
    { nombre: 'Martes', id: 2 },
    { nombre: 'Miércoles', id: 3 },
    { nombre: 'Jueves', id: 4 },
    { nombre: 'Viernes', id: 5 },
    { nombre: 'Sábado', id: 6 },
    { nombre: 'Domingo', id: 7 },
  ];

  constructor(private apiService: ApiService, private authService: AuthService) {
    this.usuarioId = this.authService.getUsuarioId(); // Obtener el ID del usuario desde el token
    this.usuarioNombre = this.authService.getUsuarioNombre(); // Obtener el nombre del usuario desde el token
    console.log(`ID del usuario logueado: ${this.usuarioId}`); // Para verificar en la consola
    console.log(`Nombre del usuario logueado: ${this.usuarioNombre}`); // Para verificar en la consola
  }

  ngOnInit(): void {
    this.cargarEspecialidades();
  }

  cargarEspecialidades(): void {
    this.apiService.obtenerEspecialidades().subscribe(
      (data) => {
        this.especialidades = data;
      },
      (error) => {
        console.error('Error al obtener especialidades:', error);
      }
    );
  }

  cargarUsuariosPorEspecialidad(id: number): void {
    this.selectedEspecialidadId = id;
    this.apiService.obtenerUsuariosPorEspecialidad(id).subscribe(
      (data) => {
        this.usuarios = data;
      },
      (error) => {
        console.error('Error al obtener usuarios:', error);
      }
    );
  }

  seleccionarFicha(usuario: any): void {
    console.log('Datos del usuario seleccionado:', usuario);
  
    // Convertir los nombres de turno y día a sus respectivos IDs
    const turnoId = this.turnos.find(turno => turno.nombre === usuario.turno)?.id;
    const diaId = this.dias.find(dia => dia.nombre === usuario.dia)?.id;
  
    // Crear el objeto cita con los datos necesarios, incluyendo la fecha y horarioId
    const cita = {
      usuarioId: this.usuarioId, // ID del usuario logueado (paciente)
      medicoId: usuario.usuarioId, // ID del médico seleccionado
      especialidadId: this.selectedEspecialidadId,
      turnoId: turnoId,
      diaId: diaId,
      horario: usuario.horario,
      nombreUsuarioLogeado: this.usuarioNombre,
      fecha: usuario.fecha, // Agrega la fecha de la entidad Horario
      horarioId: usuario.horarioId // ID del horario seleccionado (asegúrate de que este valor esté en `usuario`)
    };
  
    console.log('Datos enviados a crearCita:', cita);
  
    this.apiService.crearCita(cita).subscribe(
      (response) => {
        console.log('Cita creada:', response);
        alert('Ficha seleccionada y cita creada exitosamente');
      },
      (error) => {
        console.error('Error al crear cita:', error);
        alert('Hubo un error al crear la cita.');
      }
    );
  }
  
  
  
}
