// src/app/components/crear-triaje/crear-triaje.component.ts
import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MenuComponent } from '../menu/menu.component';

@Component({
  standalone: true,
  selector: 'app-crear-triaje',
  templateUrl: './crear-triaje.component.html',
  styleUrls: ['./crear-triaje.component.css'],
  providers: [UsuarioService],
  imports: [CommonModule, FormsModule,MenuComponent]
})
export class CrearTriajeComponent implements OnInit {
  usuarios: any[] = [];
  pacienteSeleccionado: any = null;

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

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    // Cargar todos los usuarios al iniciar
    this.usuarioService.obtenerUsuarios().subscribe(
      (data) => {
        // Asegúrate de acceder a `data.usuarios` si la estructura lo requiere.
        this.usuarios = Array.isArray(data) ? data : data.usuarios || [];
      },
      (error) => {
        console.error('Error al obtener usuarios:', error);
      }
    );
  }

  seleccionarPaciente(usuario: any): void {
    this.pacienteSeleccionado = usuario;
    console.log('Paciente seleccionado:', this.pacienteSeleccionado);
  }

  guardarTriaje(): void {
    if (this.pacienteSeleccionado) {
      const triajeData = {
        pacienteId: this.pacienteSeleccionado.id,
        temperatura: this.temperatura,
        fecha: this.fecha,
        hora: this.hora,
        frecuenciaCardiaca: this.frecuenciaCardiaca,
        frecuenciaRespiratoria: this.frecuenciaRespiratoria,
        saturacionOxigeno: this.saturacionOxigeno,
        peso: this.peso,
        estatura: this.estatura,
        alergias: this.alergias,
        enfermedadesCronicas: this.enfermedadesCronicas,
        motivoConsulta: this.motivoConsulta,
        enfermeraId: this.getEnfermeraId()
      };

      this.usuarioService.crearTriaje(triajeData).subscribe(
        (response) => {
          console.log('Triaje creado exitosamente:', response);
          alert('Triaje guardado exitosamente');
          // Limpia el formulario después de guardar
          this.pacienteSeleccionado = null;
          this.resetFormulario();
        },
        (error) => {
          console.error('Error al guardar triaje:', error);
          alert('Error al guardar el triaje');
        }
      );
    }
  }

  // Obtiene el ID de la enfermera logueada
  getEnfermeraId(): number | null {
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
