import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/user.service';
import { DiagnosticoService } from '../../services/diagnostico.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MenuComponent } from '../menu/menu.component';

@Component({
  standalone: true,
  selector: 'app-crear-diagnostico',
  templateUrl: './crear-diagnostico.component.html',
  styleUrls: ['./crear-diagnostico.component.css'],
  imports: [CommonModule, FormsModule,MenuComponent]
})
export class CrearDiagnosticoComponent implements OnInit {
  usuarios: any[] = [];
  pacienteSeleccionado: any = null;

  // Variables para el formulario de diagnóstico
  descripcion: string = '';
  fecha: string = '';
  especialidadId: number | null = null;
  tratamiento: string ='';

  constructor(
    private usuarioService: UsuarioService,
    private diagnosticoService: DiagnosticoService
  ) {}

  ngOnInit(): void {
    this.obtenerUsuarios();
  }

  // Obtener todos los usuarios para seleccionar un paciente
  obtenerUsuarios(): void {
    this.usuarioService.obtenerUsuarios().subscribe(
      (data) => {
        this.usuarios = data.usuarios; // Ajuste para extraer `data.usuarios`
      },
      (error) => {
        console.error('Error al obtener usuarios:', error);
      }
    );
  }

  seleccionarPaciente(usuario: any): void {
    this.pacienteSeleccionado = usuario;
  }

  // Obtener ID del médico logueado
  getMedicoId(): number | null {
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

  guardarDiagnostico(): void {
    if (this.pacienteSeleccionado && this.getMedicoId()) {
      const diagnosticoData = {
        medicoId: this.getMedicoId(),
        pacienteId: this.pacienteSeleccionado.id,
        descripcion: this.descripcion,
        fecha: this.fecha,
        especialidadId: this.especialidadId,
        tratamiento: this.tratamiento
      };
      console.log('Datos a enviar:', diagnosticoData); // Imprime los datos en la consola


      this.diagnosticoService.crearDiagnostico(diagnosticoData).subscribe(
        (response) => {
          console.log('Diagnóstico creado exitosamente:', response);
          alert('Diagnóstico guardado exitosamente');
          // Limpiar el formulario después de guardar
          this.pacienteSeleccionado = null;
          this.resetFormulario();
        },
        (error) => {
          console.error('Error al guardar diagnóstico:', error);
          alert('Error al guardar el diagnóstico');
        }
      );
    } else {
      alert('Seleccione un paciente y asegúrese de estar logueado.');
    }
  }

  // Resetear el formulario de diagnóstico
  resetFormulario(): void {
    this.descripcion = '';
    this.fecha = '';
    this.especialidadId = null;
    this.tratamiento = '';
  }
}
