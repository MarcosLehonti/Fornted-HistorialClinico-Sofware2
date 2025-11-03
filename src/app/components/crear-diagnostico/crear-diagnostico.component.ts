import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MenuComponent } from '../menu/menu.component';
import { UsuarioGraphQLService } from '../../core/services/graphql/usuario-graphql.service';
import { DiagnosticoGraphQLService } from '../../core/services/graphql/diagnostico-graphql.service';

@Component({
  standalone: true,
  selector: 'app-crear-diagnostico',
  templateUrl: './crear-diagnostico.component.html',
  styleUrls: ['./crear-diagnostico.component.css'],
  imports: [CommonModule, FormsModule, MenuComponent]
})
export class CrearDiagnosticoComponent implements OnInit {
  usuarios: any[] = [];
  pacienteSeleccionado: any = null;
  isLoading: boolean = false;

  // Variables para el formulario de diagnóstico
  descripcion: string = '';
  fecha: string = '';
  especialidadId: string = '';
  tratamiento: string = '';

  constructor(
    private usuarioService: UsuarioGraphQLService,
    private diagnosticoService: DiagnosticoGraphQLService
  ) {}

  ngOnInit(): void {
    this.obtenerUsuarios();
  }

  // Obtener todos los usuarios para seleccionar un paciente con GraphQL
  obtenerUsuarios(): void {
    this.usuarioService.getUsuarios().subscribe({
      next: (data) => {
        this.usuarios = data;
        console.log('✅ Usuarios obtenidos con GraphQL:', this.usuarios);
      },
      error: (error) => {
        console.error('❌ Error al obtener usuarios:', error);
      }
    });
  }

  seleccionarPaciente(usuario: any): void {
    this.pacienteSeleccionado = usuario;
  }

  // Obtener ID del médico logueado desde localStorage
  getMedicoId(): string | null {
    return localStorage.getItem('usuarioId');
  }

  guardarDiagnostico(): void {
    const medicoId = this.getMedicoId();
    
    if (this.pacienteSeleccionado && medicoId) {
      this.isLoading = true;
      
      const diagnosticoData = {
        medicoId: medicoId,
        pacienteId: this.pacienteSeleccionado.id,
        descripcion: this.descripcion,
        especialidadId: this.especialidadId,
        tratamiento: this.tratamiento
      };
      
      console.log('📤 Enviando diagnóstico con GraphQL:', diagnosticoData);

      this.diagnosticoService.crearDiagnostico(diagnosticoData).subscribe({
        next: (response) => {
          console.log('✅ Diagnóstico creado exitosamente (email enviado al paciente):', response);
          alert('✅ Diagnóstico guardado exitosamente. Se ha enviado una notificación al paciente.');
          this.pacienteSeleccionado = null;
          this.resetFormulario();
          this.isLoading = false;
        },
        error: (error) => {
          console.error('❌ Error al guardar diagnóstico:', error);
          alert('❌ Error al guardar el diagnóstico: ' + error.message);
          this.isLoading = false;
        }
      });
    } else {
      alert('⚠️ Seleccione un paciente y asegúrese de estar logueado.');
    }
  }

  // Resetear el formulario de diagnóstico
  resetFormulario(): void {
    this.descripcion = '';
    this.fecha = '';
    this.especialidadId = '';
    this.tratamiento = '';
  }
}
