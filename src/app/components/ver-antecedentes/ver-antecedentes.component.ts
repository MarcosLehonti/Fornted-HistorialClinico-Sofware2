// src/app/components/ver-antecedentes/ver-antecedentes.component.ts
import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MenuComponent } from '../menu/menu.component';

@Component({
  standalone: true,
  selector: 'app-ver-antecedentes',
  templateUrl: './ver-antecedentes.component.html',
  styleUrls: ['./ver-antecedentes.component.css'],
  imports: [CommonModule, FormsModule,MenuComponent],
  providers: [UsuarioService],
})
export class VerAntecedentesComponent implements OnInit {
  antecedentes: any[] = [];
  mostrarPor: 'usuario' | 'paciente' = 'usuario';

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.cargarAntecedentes();
  }

  // Obtener el ID del usuario logueado
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

  // Cargar los antecedentes según el modo seleccionado (usuario o paciente)
  cargarAntecedentes(): void {
    const id = this.getUsuarioId();
    if (!id) return;

    if (this.mostrarPor === 'usuario') {
      this.usuarioService.obtenerAntecedentesPorUsuarioId(id).subscribe(
        (data) => {
          this.antecedentes = data;
        },
        (error) => {
          console.error('Error al cargar antecedentes por usuario:', error);
        }
      );
    } else if (this.mostrarPor === 'paciente') {
      this.usuarioService.obtenerAntecedentesPorPacienteId(id).subscribe(
        (data) => {
          this.antecedentes = data;
        },
        (error) => {
          console.error('Error al cargar antecedentes por paciente:', error);
        }
      );
    }
  }
}
