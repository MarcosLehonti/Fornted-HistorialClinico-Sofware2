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
    console.log("Intentando login con GraphQL...");
    
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.mensajeError = null;

      const { email, password } = this.loginForm.value;

      this.authService.login({ email, password }).subscribe({
        next: (response) => {
          console.log('✅ Login exitoso:', response);
          
          // Guardar datos en localStorage
          localStorage.setItem('token', response.token);
          localStorage.setItem('usuarioId', response.usuarioId);
          localStorage.setItem('rol', response.rol);
          localStorage.setItem('email', response.email);
          
          this.isLoading = false;
          
          // Redirigir según el rol
          if (response.rol === 'ROLE_ADMIN') {
            this.router.navigate(['/bienvenida']);
          } else if (response.rol === 'ROLE_MEDICO') {
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
    } else {
      this.mensajeError = 'Por favor, completa todos los campos correctamente.';
    }
  }

  irARegistro(): void {
    this.router.navigate(['/registro']);
  }
}

