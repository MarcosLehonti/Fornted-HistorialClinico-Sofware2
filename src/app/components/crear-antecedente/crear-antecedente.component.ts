import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MenuComponent } from '../menu/menu.component';
import { UsuarioGraphQLService } from '../../core/services/graphql/usuario-graphql.service';
import { AntecedenteGraphQLService, AntecedenteInput } from '../../core/services/graphql/antecedente-graphql.service';
import { StorageService } from '../../core/services/storage.service';

@Component({
  selector: 'app-crear-antecedente',
  standalone: true,
  templateUrl: './crear-antecedente.component.html',
  styleUrls: ['./crear-antecedente.component.css'],
  imports: [CommonModule, FormsModule, MenuComponent]
})
export class CrearAntecedenteComponent implements OnInit {
  usuarios: any[] = [];
  pacienteSeleccionado: any = null;
  descripcion: string = '';
  fecha: string = '';
  tipo: string = '';
  isLoading: boolean = false;

  constructor(
    private usuarioGraphQLService: UsuarioGraphQLService,
    private antecedenteGraphQLService: AntecedenteGraphQLService,
    private storage: StorageService
  ) {}

  ngOnInit(): void {
    this.obtenerUsuarios();
  }

  obtenerUsuarios(): void {
    this.isLoading = true;
    this.usuarioGraphQLService.getUsuarios().subscribe({
      next: (data) => {
        this.usuarios = data;
        this.isLoading = false;
        console.log('✅ Usuarios cargados con GraphQL:', this.usuarios);
      },
      error: (error) => {
        console.error('❌ Error al obtener usuarios:', error);
        this.isLoading = false;
      }
    });
  }

  seleccionarPaciente(usuario: any): void {
    this.pacienteSeleccionado = usuario;
  }

  getUsuarioId(): string | null {
    const token = this.storage.getItem('token');
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
    if (!this.pacienteSeleccionado) {
      alert('Por favor selecciona un paciente');
      return;
    }

    const antecedenteInput: AntecedenteInput = {
      pacienteId: this.pacienteSeleccionado.id,
      descripcion: this.descripcion,
      fecha: this.fecha,
      tipo: this.tipo || 'General'
    };

    this.isLoading = true;
    this.antecedenteGraphQLService.createAntecedente(antecedenteInput).subscribe({
      next: (response) => {
        console.log('✅ Antecedente creado con GraphQL:', response);
        alert('Antecedente creado exitosamente');
        this.resetFormulario();
        this.isLoading = false;
      },
      error: (error) => {
        console.error('❌ Error al crear antecedente:', error);
        alert('Error al crear el antecedente');
        this.isLoading = false;
      }
    });
  }

  resetFormulario(): void {
    this.pacienteSeleccionado = null;
    this.descripcion = '';
    this.fecha = '';
    this.tipo = '';
  }
}
