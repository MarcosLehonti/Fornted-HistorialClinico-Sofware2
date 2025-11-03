// src/app/components/crear-triaje/crear-triaje.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MenuComponent } from '../menu/menu.component';
import { UsuarioGraphQLService } from '../../core/services/graphql/usuario-graphql.service';
import { TriajeGraphQLService, TriajeInput } from '../../core/services/graphql/triaje-graphql.service';
import { StorageService } from '../../core/services/storage.service';

@Component({
  standalone: true,
  selector: 'app-crear-triaje',
  templateUrl: './crear-triaje.component.html',
  styleUrls: ['./crear-triaje.component.css'],
  imports: [CommonModule, FormsModule, MenuComponent]
})
export class CrearTriajeComponent implements OnInit {
  usuarios: any[] = [];
  pacienteSeleccionado: any = null;
  isLoading: boolean = false;

  // Variables para el formulario de triaje
  temperatura: number = 0;
  fecha: string = '';
  hora: string = '';
  frecuenciaCardiaca: number = 0;
  frecuenciaRespiratoria: number = 0;
  saturacionOxigeno: number = 0;
  peso: number = 0;
  estatura: number = 0;
  alergias: string = '';
  enfermedadesCronicas: string = '';
  motivoConsulta: string = '';
  presionArterial: string = '';

  constructor(
    private usuarioGraphQLService: UsuarioGraphQLService,
    private triajeGraphQLService: TriajeGraphQLService,
    private storage: StorageService
  ) {}

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios(): void {
    this.isLoading = true;
    this.usuarioGraphQLService.getUsuarios().subscribe({
      next: (data) => {
        this.usuarios = data;
        this.isLoading = false;
        console.log('✅ Usuarios cargados con GraphQL:', this.usuarios);
      },
      error: (error) => {
        console.error('❌ Error al cargar usuarios:', error);
        this.isLoading = false;
      }
    });
  }

  seleccionarPaciente(usuario: any): void {
    this.pacienteSeleccionado = usuario;
    console.log('Paciente seleccionado:', this.pacienteSeleccionado);
  }

  guardarTriaje(): void {
    if (!this.pacienteSeleccionado) {
      alert('Por favor selecciona un paciente');
      return;
    }
     
    const triajeInput: TriajeInput = {
      pacienteId: this.pacienteSeleccionado.id,
      temperatura: this.temperatura,
      fecha: `${this.fecha}T${this.hora}:00`,
      presionArterial: this.presionArterial,
      frecuenciaCardiaca: this.frecuenciaCardiaca,
      frecuenciaRespiratoria: this.frecuenciaRespiratoria,
      saturacionOxigeno: this.saturacionOxigeno,
      peso: this.peso,
      altura: this.estatura,
      observaciones: `Alergias: ${this.alergias}. Enfermedades crónicas: ${this.enfermedadesCronicas}. Motivo: ${this.motivoConsulta}`
    };

    this.isLoading = true;
    this.triajeGraphQLService.createTriaje(triajeInput).subscribe({
      next: (response) => {
        console.log('✅ Triaje creado con GraphQL:', response);
        alert('Triaje guardado exitosamente');
        this.pacienteSeleccionado = null;
        this.resetFormulario();
        this.isLoading = false;
      },
      error: (error) => {
        console.error('❌ Error al guardar triaje:', error);
        alert('Error al guardar el triaje');
        this.isLoading = false;
      }
    });
  }

  // Obtiene el ID de la enfermera logueada
  getEnfermeraId(): string | null {
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

  // Resetear formulario de triaje
  resetFormulario(): void {
    this.temperatura = 0;
    this.fecha = '';
    this.hora = '';
    this.frecuenciaCardiaca = 0;
    this.frecuenciaRespiratoria = 0;
    this.saturacionOxigeno = 0;
    this.peso = 0;
    this.estatura = 0;
    this.alergias = '';
    this.enfermedadesCronicas = '';
    this.motivoConsulta = '';
  }
}
