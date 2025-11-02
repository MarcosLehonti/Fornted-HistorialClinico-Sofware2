// src/app/components/menu/menu.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service'; // Importa el AuthService

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, RouterModule], // Asegúrate de importar RouterModule aquí
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  userRole: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.userRole = this.authService.getRolFromToken();
  }

  // Método para verificar si el rol del usuario permite acceder a Recursos
  canAccessRecursos(): boolean {
    return this.userRole === 'ROLE_ADMIN' || this.userRole === 'ROLE_ENFERMERA' || this.userRole === 'ROLE_MEDICO';
  }

  logout() {
    localStorage.removeItem('token'); // o sessionStorage.removeItem('token') si estás usando sessionStorage
    localStorage.removeItem('rol'); // Asegúrate de remover el rol también
    console.log("Sesión cerrada");
    this.router.navigate(['/login']);
  }
}
