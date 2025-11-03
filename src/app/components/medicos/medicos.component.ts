// import { HttpClient } from '@angular/common/http';
// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { MenuComponent } from '../components/menu/menu.component';

// @Component({
//   selector: 'app-medicos',
//   standalone: true,
//   imports: [CommonModule, FormsModule, MenuComponent],
//   templateUrl: './medicos.component.html',
//   styleUrls: ['./medicos.component.css']
// })
// export class MedicosComponent implements OnInit {
//   medicos: any[] = [];
//   especialidades: any[] = [];
//   medicoSeleccionado: any;
//   especialidadSeleccionada: number | null = null;


//   constructor(private http: HttpClient) { }

//   ngOnInit(): void {
//     this.obtenerMedicos();
//     this.obtenerEspecialidades();
//   }

//   obtenerMedicos(): void {
//     this.http.get<any[]>('http://localhost:8080/api/usuarios/medicos')
//       .subscribe(
//         (data) => {
//           this.medicos = data;
//         },
//         (error) => {
//           console.error('Error al obtener los médicos:', error);
//         }
//       );
//   }

//   obtenerEspecialidades(): void {
//     this.http.get<any[]>('http://localhost:8080/api/especialidades')
//       .subscribe(
//         (data) => {
//           this.especialidades = data;
//         },
//         (error) => {
//           console.error('Error al obtener las especialidades:', error);
//         }
//       );
//   }

//   abrirFormularioEspecialidad(medico: any): void {
//     this.medicoSeleccionado = medico;
//   }

//   asignarEspecialidad(): void {
//     if (this.medicoSeleccionado && this.especialidadSeleccionada) {
//       this.http.post(`http://localhost:8080/api/usuarios/${this.medicoSeleccionado.id}/especialidades`, {
//         especialidadId: this.especialidadSeleccionada
//       }).subscribe(
//         () => {
//           this.obtenerMedicos();
//           this.medicoSeleccionado = null;
//           this.especialidadSeleccionada = null;
//         },
//         (error) => {
//           console.error('Error al asignar especialidad:', error);
//         }
//       );
//     }
//   }
// }



import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MenuComponent } from '../menu/menu.component';
import { Router } from '@angular/router';
import { UsuarioGraphQLService } from '../../core/services/graphql/usuario-graphql.service';
import { EspecialidadGraphQLService } from '../../core/services/graphql/especialidad-graphql.service';

@Component({
  selector: 'app-medicos',
  standalone: true,
  imports: [CommonModule, FormsModule, MenuComponent],
  templateUrl: './medicos.component.html',
  styleUrls: ['./medicos.component.css']
})
export class MedicosComponent implements OnInit {
  medicos: any[] = [];
  especialidades: any[] = [];
  medicoSeleccionado: any;
  especialidadesSeleccionadas: number[] = []; // Lista de IDs de especialidades seleccionadas

  constructor(
    private usuarioService: UsuarioGraphQLService,
    private especialidadService: EspecialidadGraphQLService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.obtenerMedicos();
    this.obtenerEspecialidades();
  }

  obtenerMedicos(): void {
    this.usuarioService.getMedicos().subscribe({
      next: (data) => {
        this.medicos = data;
        console.log(' Médicos obtenidos con GraphQL:', this.medicos);
      },
      error: (error) => {
        console.error(' Error al obtener médicos:', error);
      }
    });
  }

  obtenerEspecialidades(): void {
    this.especialidadService.getEspecialidades().subscribe({
      next: (data) => {
        this.especialidades = data;
        console.log(' Especialidades obtenidas con GraphQL:', this.especialidades);
      },
      error: (error) => {
        console.error(' Error al obtener especialidades:', error);
      }
    });
  }

  abrirFormularioEspecialidad(medico: any): void {
    this.medicoSeleccionado = medico;
    this.especialidadesSeleccionadas = []; // Reiniciar selección
  }

  onEspecialidadChange(event: any): void {
    const especialidadId = +event.target.value;
    if (event.target.checked) {
      // Añadir a la lista si está seleccionado
      this.especialidadesSeleccionadas.push(especialidadId);
    } else {
      // Quitar de la lista si se desmarca
      this.especialidadesSeleccionadas = this.especialidadesSeleccionadas.filter(id => id !== especialidadId);
    }
  }

  asignarEspecialidades(): void {
    if (this.medicoSeleccionado && this.especialidadesSeleccionadas.length > 0) {
      const especialidadIdsString = this.especialidadesSeleccionadas.map(id => id.toString());
      
      this.usuarioService.asignarEspecialidades(
        this.medicoSeleccionado.id,
        especialidadIdsString
      ).subscribe({
        next: (success) => {
          if (success) {
            console.log('✅ Especialidades asignadas exitosamente');
            alert('✅ Especialidades asignadas correctamente');
            this.obtenerMedicos();
            this.medicoSeleccionado = null;
            this.especialidadesSeleccionadas = [];
          }
        },
        error: (error) => {
          console.error('❌ Error al asignar especialidades:', error);
          alert('❌ Error al asignar especialidades: ' + error.message);
        }
      });
    } else {
      alert('⚠️ Seleccione un médico y al menos una especialidad');
    }
  }

  seleccionarFicha(medicoId: number): void {
    this.router.navigate(['/ficha', medicoId]);
  }
}
