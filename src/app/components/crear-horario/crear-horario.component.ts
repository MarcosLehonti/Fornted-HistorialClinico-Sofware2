// src/app/components/crear-horario/crear-horario.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MenuComponent } from '../menu/menu.component';
import { HorarioGraphQLService, Horario } from '../../core/services/graphql/horario-graphql.service';

@Component({
  selector: 'app-crear-horario',
  standalone: true,
  imports: [CommonModule, FormsModule, MenuComponent],
  templateUrl: './crear-horario.component.html',
  styleUrls: ['./crear-horario.component.css']
})
export class CrearHorarioComponent implements OnInit {
  horarios: Horario[] = [];
  isLoading: boolean = false;

  constructor(private horarioGraphQLService: HorarioGraphQLService) {}

  ngOnInit(): void {
    this.cargarHorarios();
  }

  cargarHorarios(): void {
    this.isLoading = true;
    this.horarioGraphQLService.getHorarios().subscribe({
      next: (data) => {
        this.horarios = data;
        this.isLoading = false;
        console.log('✅ Horarios cargados con GraphQL:', data);
      },
      error: (error) => {
        console.error('❌ Error al obtener los horarios', error);
        this.isLoading = false;
      }
    });
  }
}
