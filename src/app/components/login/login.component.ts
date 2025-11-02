// src/app/components/login/login.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], // Agregar ReactiveFormsModule aquí
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  mensajeError: string | null = null;

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      this.usuarioService.login(this.loginForm.value).subscribe(
        response => {
          localStorage.setItem('token', response.token);
          this.router.navigate(['/bienvenida']);
        },
        error => {
          this.mensajeError = 'Credenciales incorrectas.';
        }
      );
    }
  }

  irARegistro(): void {
    this.router.navigate(['/registro']); // Redirige a la vista de registro
  }
}

