

// import { Component, OnInit } from '@angular/core';
// import { EspecialidadService } from '../../services/especialidad.service';
// import { UsuarioService } from '../../services/user.service';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';

// @Component({
//   selector: 'app-especialidades-horarios',
//   standalone: true,
//   imports: [CommonModule, FormsModule],
//   templateUrl: './especialidades-horarios.component.html',
//   styleUrls: ['./especialidades-horarios.component.css'],
// })
// export class EspecialidadesHorariosComponent implements OnInit {
//   especialidades: any[] = [];
//   horariosPorEspecialidad: { [key: number]: any[] } = {};
//   selectedHorarios: { [key: number]: number[] } = {}; // Para almacenar horarios seleccionados

//   constructor(
//     private especialidadService: EspecialidadService,
//     private usuarioService: UsuarioService
//   ) {}

//   ngOnInit(): void {
//     // Llama al método para obtener especialidades del médico logueado
//     this.usuarioService.obtenerEspecialidadesDelMedico().subscribe(
//       (especialidades) => {
//         this.especialidades = especialidades; // Asigna las especialidades a una variable en el componente

//         // Obtener horarios para cada especialidad
//         this.especialidades.forEach((especialidad) => {
//           this.especialidadService.obtenerHorariosPorEspecialidad(especialidad.id).subscribe((horarios) => {
//             this.horariosPorEspecialidad[especialidad.id] = horarios;
//           });
//         });
//       },
//       (error) => {
//         console.error('Error al obtener especialidades', error);
//       }
//     );
//   }

//   // Método para seleccionar horarios
//   seleccionarHorario(especialidadId: number, horarioId: number) {
//     if (!this.selectedHorarios[especialidadId]) {
//       this.selectedHorarios[especialidadId] = [];
//     }
//     const index = this.selectedHorarios[especialidadId].indexOf(horarioId);
//     if (index > -1) {
//       this.selectedHorarios[especialidadId].splice(index, 1); // Desmarcar
//     } else {
//       this.selectedHorarios[especialidadId].push(horarioId); // Marcar
//     }
//   }

//   // Método para enviar los horarios seleccionados al servidor
//   guardarHorariosSeleccionados(): void {
//     // Aquí puedes manejar la lógica para guardar los horarios seleccionados
//     console.log('Horarios seleccionados:', this.selectedHorarios);
//     // Implementa la lógica para enviar los horarios seleccionados al backend
//     // this.usuarioService.asignarHorariosAlMedico(this.selectedHorarios).subscribe(response => {
//     //   console.log('Horarios guardados exitosamente', response);
//     // }, error => {
//     //   console.error('Error al guardar horarios', error);
//     // });
//   }
// }

import { Component, OnInit } from '@angular/core';
import { EspecialidadService } from '../../services/especialidad.service';
import { UsuarioService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HorarioService } from '../../services/horario.service';
import { MenuComponent } from '../menu/menu.component';

@Component({
  selector: 'app-especialidades-horarios',
  standalone: true,
  imports: [CommonModule, FormsModule, MenuComponent],
  templateUrl: './especialidades-horarios.component.html',
  styleUrls: ['./especialidades-horarios.component.css'],
})
export class EspecialidadesHorariosComponent implements OnInit {
  especialidades: any[] = [];
  horariosPorEspecialidad: { [key: number]: any[] } = {};
  selectedHorarios: { [key: number]: number[] } = {};
  medicoId!: number; // ID del médico logueado
  horariosAsignados: any[] = []; // Para almacenar los horarios asignados al médico

  constructor(
    private especialidadService: EspecialidadService,
    private usuarioService: UsuarioService,
    private horarioService: HorarioService
  ) {}

  ngOnInit(): void {
    this.medicoId = this.getMedicoId(); // Obtén el ID del médico logueado

    this.usuarioService.obtenerEspecialidadesDelMedico().subscribe(
      (especialidades) => {
        this.especialidades = especialidades; // Almacena las especialidades

        // Obtener horarios para cada especialidad
        this.especialidades.forEach((especialidad) => {
          this.especialidadService.obtenerHorariosPorEspecialidad(especialidad.id).subscribe((horarios) => {
            this.horariosPorEspecialidad[especialidad.id] = horarios;
          });
        });

        // Cargar los horarios asignados
        this.cargarHorariosAsignados();
      },
      (error) => {
        console.error('Error al obtener especialidades', error);
      }
    );
  }

  getMedicoId(): number {
    const token = localStorage.getItem('token');
    if (token) {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const decodedData = JSON.parse(window.atob(base64));
      return decodedData.usuarioId;
    } else {
      console.error('Token no encontrado');
      return -1; 
    }
  }

  seleccionarHorario(especialidadId: number, horarioId: number) {
    if (!this.selectedHorarios[especialidadId]) {
      this.selectedHorarios[especialidadId] = [];
    }
    const index = this.selectedHorarios[especialidadId].indexOf(horarioId);
    if (index > -1) {
      this.selectedHorarios[especialidadId].splice(index, 1); // Desmarcar
    } else {
      this.selectedHorarios[especialidadId].push(horarioId); // Marcar
    }
  }

  guardarHorariosSeleccionados(): void {
    const horarioIds: number[] = []; // Definir el tipo como number[]
    const especialidadIds: number[] = []; // También definir especialidadIds como number[]
  
    // Recorre las especialidades y asigna los horarios
    Object.entries(this.selectedHorarios).forEach(([especialidadId, horarioIdsArray]) => {
      horarioIdsArray.forEach(horarioId => {
        horarioIds.push(horarioId); // Agrega el ID del horario
        especialidadIds.push(Number(especialidadId)); // Agrega el ID de la especialidad
      });
    });
  
    // Prepara el objeto para enviar al backend
    const horariosAsignados = {
      horarioIds: horarioIds, // Incluye el arreglo de IDs de horarios
      especialidadIds: especialidadIds // Opcional, si necesitas enviar también especialidadIds
    };
  
    this.horarioService.asignarHorariosAMedico(this.medicoId, horariosAsignados).subscribe(
      response => {
        console.log('Horarios guardados exitosamente', response);
        this.cargarHorariosAsignados(); 
      },
      (error: any) => {
        console.error('Error al guardar horarios', error);
      }
    );
  }
  

  cargarHorariosAsignados(): void {
    this.horarioService.obtenerHorariosPorMedico(this.medicoId).subscribe(
      horarios => {
        this.horariosAsignados = horarios; // Asigna los horarios obtenidos a la variable
        this.horariosAsignados.forEach(horario => {
          // Asegúrate de que tu objeto horario tiene la propiedad especialidadId
          horario.especialidadNombre = this.obtenerNombreEspecialidad(horario.especialidadId); // Asigna el nombre de la especialidad
        });
      },
      (error: any) => {
        console.error('Error al obtener horarios asignados', error);
      }
    );
  }

  obtenerNombreEspecialidad(especialidadId: number): string {
    const especialidad = this.especialidades.find(e => e.id === especialidadId);
    return especialidad ? especialidad.nombre : 'Desconocida'; // Devuelve 'Desconocida' si no se encuentra
  }
}
