import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service'; // Ajusta la ruta según la estructura de tu proyecto
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../components/menu/menu.component';


interface BitacoraEntry {
  id: number;
  usuario: string;
  accion: string;
  detalles: string;
  fecha: string;
}

@Component({
  standalone: true,
  selector: 'app-admin-bitacora',
  templateUrl: './admin-bitacora.component.html',
  styleUrls: ['./admin-bitacora.component.css'],
  imports: [CommonModule,MenuComponent], // Importa los módulos necesarios aquí, como HttpClientModule si es necesario
})
export class AdminBitacoraComponent implements OnInit {
  bitacora: BitacoraEntry[] = [];
  errorMessage: string | null = null;

  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    const rol = this.authService.getRolFromToken();
    if (rol !== 'ROLE_ADMIN') {
      this.errorMessage = 'Acceso denegado. Solo el rol ROLE_ADMIN puede ver esta página.';
      return;
    }
    this.cargarBitacora();
  }

  cargarBitacora(): void {
    this.http.get<BitacoraEntry[]>('https://backend-historialclinico-2.onrender.com/api/bitacora').subscribe({
      next: (data) => (this.bitacora = data),
      error: (error) => console.error('Error al cargar la bitácora:', error),
    });
  }
}
