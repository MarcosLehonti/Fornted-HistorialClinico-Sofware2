import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HistorialClinicoComponent } from '../historial-clinico/historial-clinico.component';
import { MenuComponent } from '../components/menu/menu.component';
@Component({
  selector: 'app-usuarios-lista',
  templateUrl: './usuarios-lista.component.html',
  styleUrls: ['./usuarios-lista.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, HistorialClinicoComponent,MenuComponent]
})
export class UsuariosListaComponent implements OnInit {
  usuarios: any[] = [];
  pacienteSeleccionado: number | null = null;

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.obtenerUsuarios();
  }

  obtenerUsuarios(): void {
    this.usuarioService.obtenerUsuarios().subscribe(
      (data) => {
        this.usuarios = data.usuarios;
      },
      (error) => {
        console.error('Error al obtener usuarios:', error);
      }
    );
  }

  verHistorialClinico(id: number): void {
    this.pacienteSeleccionado = id;
  }
}
