// src/app/components/register/register.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], // Asegúrate de importar ReactiveFormsModule aquí
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegistroComponent {
  registroForm: FormGroup;
  mensajeExito: string | null = null; // Definir mensajeExito
  mensajeError: string | null = null; // Definir mensajeError

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.registroForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    console.log("Intentando enviar el formulario..."); // Log para verificar
    if (this.registroForm.valid) {
      alert('Enviando datos...'); // Alert al enviar

      this.http.post('http://localhost:8080/api/usuarios/registro', this.registroForm.value)
        .subscribe(
          response => {
            this.mensajeExito = 'Registro exitoso.';
            this.mensajeError = null;
            this.registroForm.reset();
          },
          error => {
            this.mensajeError = 'Error en el registro.';
            this.mensajeExito = null;
          }
        );
    } else {
      this.mensajeError = 'Formulario inválido. Por favor, revisa los campos.';
      this.mensajeExito = null;
    }
  }
}
