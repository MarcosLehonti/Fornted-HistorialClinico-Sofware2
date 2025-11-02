// src/app/components/listar-triajes/listar-triajes.component.ts
import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../menu/menu.component';
@Component({
  selector: 'app-listar-triajes',
  standalone: true,
  imports: [CommonModule,MenuComponent],
  templateUrl: './lista-triajes.component.html',
  styleUrls: ['./lista-triajes.component.css'],
})
export class ListarTriajesComponent implements OnInit {
  triajes: any[] = [];

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.usuarioService.obtenerTriajes().subscribe(
      (data) => {
        this.triajes = data;
      },
      (error) => {
        console.error('Error al obtener triajes:', error);
      }
    );
  }
}
