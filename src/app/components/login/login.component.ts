// src/app/components/login/login.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthGraphQLService } from '../../core/services/graphql/auth-graphql.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  mensajeError: string | null = null;
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthGraphQLService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onLogin() {
    console.log('Intentando login con GraphQL...');

    if (!this.loginForm.valid) {
      this.mensajeError = 'Por favor, completa todos los campos correctamente.';
      return;
    }

    this.isLoading = true;
    this.mensajeError = null;

    const { email, password } = this.loginForm.value;

    // <-- AQUI: pasar dos argumentos separados, conforme al servicio
    this.authService.login(email, password).subscribe({
      next: (response) => {
        console.log('✅ Login exitoso:', response);

        // Guardar los tokens y datos en localStorage (según la respuesta real)
        if (response.idToken) {
          localStorage.setItem('idToken', response.idToken); // token de Firebase
        }
        if (response.Token) {
          localStorage.setItem('token', response.Token); // token del backend (si lo usas con ese key)
        }
        if (response.userId) {
          localStorage.setItem('userId', response.userId);
        }
        if (response.role) {
          localStorage.setItem('role', response.role);
        }
        if (response.email) {
          localStorage.setItem('email', response.email);
        }
        if (response.uid) {
          localStorage.setItem('uid', response.uid);
        }
        if (response.name) {
          localStorage.setItem('name', response.name);
        }

        this.isLoading = false;

        // Redirigir según el rol (asegúrate que 'role' coincide con lo que retorna el backend)
        const role = response.role || localStorage.getItem('role');
        if (role === 'ROLE_ADMIN') {
          this.router.navigate(['/bienvenida']);
        } else if (role === 'ROLE_MEDICO') {
          this.router.navigate(['/medicos']);
        } else {
          this.router.navigate(['/bienvenida']);
        }
      },
      error: (error) => {
        console.error('❌ Error en login:', error);
        this.mensajeError = 'Credenciales incorrectas. Por favor, verifica tu email y contraseña.';
        this.isLoading = false;
      }
    });
  }

  irARegistro(): void {
    this.router.navigate(['/registro']);
  }
}
