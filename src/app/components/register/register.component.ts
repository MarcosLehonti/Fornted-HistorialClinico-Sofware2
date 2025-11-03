// src/app/components/register/register.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthGraphQLService } from '../../core/services/graphql/auth-graphql.service';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegistroComponent {
  registroForm: FormGroup;
  mensajeExito: string | null = null;
  mensajeError: string | null = null;
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder, 
    private authService: AuthGraphQLService,
    private router: Router
  ) {
    this.registroForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    console.log("Intentando enviar el formulario con GraphQL...");
    
    if (this.registroForm.valid) {
      this.isLoading = true;
      this.mensajeError = null;
      this.mensajeExito = null;

      const { username, email, password } = this.registroForm.value;

      this.authService.registro({ username, email, password })
        .subscribe({
          next: (usuario) => {
            console.log('✅ Registro exitoso:', usuario);
            this.mensajeExito = `¡Registro exitoso! Bienvenido ${usuario.username}`;
            this.mensajeError = null;
            this.registroForm.reset();
            this.isLoading = false;
            
            // Redirigir al login después de 2 segundos
            setTimeout(() => {
              this.router.navigate(['/login']);
            }, 2000);
          },
          error: (error) => {
            console.error('❌ Error en el registro:', error);
            this.mensajeError = error.message || 'Error en el registro. Por favor, intenta nuevamente.';
            this.mensajeExito = null;
            this.isLoading = false;
          }
        });
    } else {
      this.mensajeError = 'Formulario inválido. Por favor, revisa los campos.';
      this.mensajeExito = null;
    }
  }
}
