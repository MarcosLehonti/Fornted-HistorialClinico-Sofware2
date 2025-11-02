// src/app/components/asignar/asignar.component.ts
import { Component, inject, OnInit } from '@angular/core';
import { AsignacionService } from '../../services/asignacion.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MenuComponent } from '../menu/menu.component';

@Component({
  selector: 'app-asignar',
  standalone: true,
  imports: [CommonModule, FormsModule,MenuComponent],
  templateUrl: './asignar.component.html',
  styleUrls: ['./asignar.component.css']
})
export class AsignarComponent implements OnInit {
  asignacionService = inject(AsignacionService);

  usuarioId: number | null = null;
  especialidadId: number | null = null;
  turnoId: number | null = null;
  diaIds: number[] = [];

  usuarios: any[] = [];
  especialidades: any[] = [];
  turnos: any[] = [];
  dias: any[] = [];

  ngOnInit() {
    // Cargar usuarios, especialidades, turnos y días desde el backend
    this.asignacionService.obtenerUsuarios().subscribe(data => this.usuarios = data);
    this.asignacionService.obtenerEspecialidades().subscribe(data => this.especialidades = data);
    this.asignacionService.obtenerTurnos().subscribe(data => this.turnos = data);
    this.asignacionService.obtenerDias().subscribe(data => this.dias = data);
  }

  // Método para enviar la asignación al backend
  // asignar() {
  //   if (this.usuarioId && this.especialidadId && this.turnoId && this.diaIds.length > 0) {
  //     const data = {
  //       usuarioId: this.usuarioId,
  //       especialidadId: this.especialidadId,
  //       turnoId: this.turnoId,
  //       diaIds: this.diaIds
  //     };
  //     this.asignacionService.asignarEspecialidad(data).subscribe(
  //       response => {
  //         console.log('Asignación exitosa:', response);
  //         alert('Asignación realizada con éxito');
  //       },
  //       error => {
  //         console.error('Error en la asignación:', error);
  //         alert('Error al realizar la asignación');
  //       }
  //     );
  //   } else {
  //     alert('Por favor selecciona todos los campos');
  //   }
  // }

  asignar() {
    if (this.usuarioId && this.especialidadId && this.turnoId && this.diaIds.length > 0) {
        const data = {
            usuarioId: this.usuarioId,
            especialidadId: this.especialidadId,
            turnoId: this.turnoId,
            diaIds: this.diaIds
        };

        this.asignacionService.asignarEspecialidad(data).subscribe(
            response => {
                console.log('Asignación exitosa:', response);
                alert('Asignación realizada con éxito');
            },
            error => {
                console.error('Error en la asignación:', error);
                alert(`Error al realizar la asignación: ${error.message}`);
            }
        );
    } else {
        alert('Por favor selecciona todos los campos');
    }
}

  

  // Método para manejar la selección de días
  toggleDia(diaId: number) {
    const index = this.diaIds.indexOf(diaId);
    if (index > -1) {
      this.diaIds.splice(index, 1); // Remover si ya está seleccionado
    } else {
      this.diaIds.push(diaId); // Agregar si no está seleccionado
    }
  }
}
