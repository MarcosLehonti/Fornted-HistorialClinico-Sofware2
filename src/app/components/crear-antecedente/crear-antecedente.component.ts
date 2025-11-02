import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsuarioService } from '../../services/user.service';
import { AntecedenteService } from '../../services/antecedente.service';
import { MenuComponent } from '../menu/menu.component';

@Component({
  selector: 'app-crear-antecedente',
  standalone: true,
  templateUrl: './crear-antecedente.component.html',
  styleUrls: ['./crear-antecedente.component.css'],
  imports: [CommonModule, FormsModule,MenuComponent],
  providers: [UsuarioService, AntecedenteService]
})
export class CrearAntecedenteComponent implements OnInit {
  usuarios: any[] = [];
  pacienteSeleccionado: any = null;
  descripcion: string = '';
  fecha: string = '';
  especialidadId: number | null = null;

  constructor(private usuarioService: UsuarioService, private antecedenteService: AntecedenteService) {}

  ngOnInit(): void {
    this.obtenerUsuarios();
  }

  obtenerUsuarios(): void {
    this.usuarioService.obtenerUsuarios().subscribe(
      (data) => {
        this.usuarios = data.usuarios; // Asegura que estás extrayendo `data.usuarios`
      },
      (error) => {
        console.error('Error al obtener usuarios:', error);
      }
    );
  }

  seleccionarPaciente(usuario: any): void {
    this.pacienteSeleccionado = usuario;
  }

  getUsuarioId(): number | null {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const payloadBase64 = token.split('.')[1];
        const decodedPayload = JSON.parse(atob(payloadBase64));
        return decodedPayload.usuarioId || null;
      } catch (error) {
        console.error('Error al decodificar el token:', error);
        return null;
      }
    }
    return null;
  }

  crearAntecedente(): void {
    if (this.pacienteSeleccionado) {
      const antecedenteData = {
        usuarioId: this.getUsuarioId(),
        pacienteId: this.pacienteSeleccionado.id,
        descripcion: this.descripcion,
        fecha: this.fecha,
        especialidadId: this.especialidadId
      };

      this.antecedenteService.crearAntecedente(antecedenteData).subscribe(
        (response) => {
          console.log('Antecedente creado exitosamente:', response);
          alert('Antecedente creado exitosamente');
          this.resetFormulario();
        },
        (error) => {
          console.error('Error al crear antecedente:', error);
          alert('Error al crear el antecedente');
        }
      );
    }
  }

  resetFormulario(): void {
    this.pacienteSeleccionado = null;
    this.descripcion = '';
    this.fecha = '';
    this.especialidadId = null;
  }
}
