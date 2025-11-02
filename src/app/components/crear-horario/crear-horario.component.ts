// src/app/components/horario-table/horario-table.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HorarioService, Horario } from '../../services/horario.service';
import { MenuComponent } from '../menu/menu.component';

@Component({
  selector: 'app-crear-horario',
  standalone: true,
  imports: [CommonModule, MenuComponent],
  templateUrl: './crear-horario.component.html',
  styleUrls: ['./crear-horario.component.css']
})
export class CrearHorarioComponent implements OnInit {
  horarios: Horario[] = [];

  constructor(private horarioService: HorarioService) {}

  ngOnInit(): void {
    this.horarioService.obtenerHorarios().subscribe(
      (data) => (this.horarios = data),
      (error) => console.error('Error al obtener los horarios', error)
    );
  }
}
