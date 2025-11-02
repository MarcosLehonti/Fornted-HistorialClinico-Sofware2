// src/app/components/perfil/perfil.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MenuComponent } from '../menu/menu.component';


@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,MenuComponent],
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  perfilForm: FormGroup;
  mensajeExito: string | null = null;
  mensajeError: string | null = null;

  constructor(private fb: FormBuilder, private usuarioService: UsuarioService) {
    this.perfilForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit() {
    this.cargarPerfil();
  }

  cargarPerfil() {
    this.usuarioService.obtenerPerfil().subscribe({
      next: (response) => {
        this.perfilForm.patchValue(response.usuario);
      },
      error: () => {
        this.mensajeError = 'Error al cargar los datos del perfil.';
      }
    });
  }

  onActualizarPerfil() {
    if (this.perfilForm.valid) {
      this.usuarioService.actualizarPerfil(this.perfilForm.value).subscribe({
        next: () => {
          this.mensajeExito = 'Perfil actualizado exitosamente.';
          this.mensajeError = null;
        },
        error: () => {
          this.mensajeError = 'Error al actualizar el perfil.';
          this.mensajeExito = null;
        }
      });
    }
  }
}
