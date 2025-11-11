import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MachineLearningGraphQLService } from '../../core/services/graphql/machinelearning-graphql.service';
import { MenuComponent } from '../menu/menu.component'; // 👈 agregado

@Component({
  selector: 'app-machinelearning',
  standalone: true,
  imports: [CommonModule, MenuComponent], // 👈 agregado aquí
  templateUrl: './machinelearning.component.html',
  styleUrls: ['./machinelearning.component.css']
})
export class MachineLearningComponent {
  resultado: string | null = null;
  clusters: any[] = [];
  triajesRiesgo: any[] = [];
  loading: boolean = false;

  // 👇 Diccionario de nombres legibles para los clusters
  nombres_clusters: { [key: number]: string } = {
    0: 'Grupo estable',
    1: 'Grupo en riesgo moderado',
    2: 'Grupo crítico'
  };

  constructor(private mlService: MachineLearningGraphQLService) {}

  entrenarClusters() {
    this.loading = true;
    this.mlService.entrenarClusters(3).subscribe({
      next: (res) => {
        this.resultado = res?.message ?? 'Modelo entrenado correctamente.';
        this.loading = false;
      },
      error: (err) => {
        this.resultado = 'Error entrenando clusters.';
        console.error(err);
        this.loading = false;
      }
    });
  }

  obtenerClusters() {
    this.loading = true;
    this.mlService.obtenerClusters().subscribe({
      next: (res) => {
        // Asegurar formato correcto
        if (Array.isArray(res)) {
          // 👇 Convertir el número del cluster a su nombre legible
          this.clusters = res.map((c: any) => ({
            ...c,
            cluster: this.nombres_clusters[c.cluster] ?? `Cluster ${c.cluster}`
          }));
        } else {
          this.clusters = [];
        }
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });
  }

  entrenarModelo() {
    this.loading = true;
    this.mlService.entrenarModelo().subscribe({
      next: (res) => {
        this.resultado = res?.message ?? 'Modelo supervisado entrenado.';
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });
  }

  obtenerTriajesRiesgo() {
    this.loading = true;
    this.mlService.obtenerTriajesRiesgo().subscribe({
      next: (res) => {
        // Los datos vienen como strings JSON, los parseamos:
        if (Array.isArray(res)) {
          this.triajesRiesgo = res.map((item) => {
            try {
              return JSON.parse(item);
            } catch {
              return item;
            }
          });
        } else if (res?.triajes) {
          this.triajesRiesgo = res.triajes.map((t: any) =>
            typeof t === 'string' ? JSON.parse(t) : t
          );
        } else {
          this.triajesRiesgo = [];
        }
        this.resultado = res?.message ?? null;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });
  }
}
