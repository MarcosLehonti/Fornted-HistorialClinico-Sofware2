import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { 
  GET_TRIAJES_POR_PACIENTE,
  CREAR_TRIAJE_MUTATION 
} from '../../graphql/operations/triaje.operations';

export interface Triaje {
  id: string;
  fecha: string;
  presionArterial: string;
  frecuenciaCardiaca: number;
  temperatura: number;
  peso: number;
  altura: number;
  observaciones?: string;
  pacienteId: string;
}

export interface TriajeInput {
  fecha: string;
  presionArterial: string;
  frecuenciaCardiaca: number;
  frecuenciaRespiratoria?: number;
  saturacionOxigeno?: number;
  temperatura: number;
  peso: number;
  altura: number;
  observaciones?: string;
  pacienteId: string;
}

@Injectable({
  providedIn: 'root'
})
export class TriajeGraphQLService {
  constructor(private apollo: Apollo) {}

  /**
   * Obtiene triajes por paciente
   */
  getTriajesPorPaciente(pacienteId: string): Observable<Triaje[]> {
    return this.apollo
      .query<{ triajesPorPaciente: Triaje[] }>({
        query: GET_TRIAJES_POR_PACIENTE,
        variables: { pacienteId }
      })
      .pipe(
        map(result => {
          if (result.errors) {
            console.error('❌ Error en query triajes por paciente:', result.errors);
            throw new Error('Error al obtener triajes por paciente');
          }
          console.log('✅ Triajes por paciente obtenidos:', result.data?.triajesPorPaciente);
          return result.data?.triajesPorPaciente || [];
        })
      );
  }

  /**
   * Crea un nuevo triaje
   */
  createTriaje(input: TriajeInput): Observable<Triaje> {
    return this.apollo
      .mutate<{ crearTriaje: Triaje }>({
        mutation: CREAR_TRIAJE_MUTATION,
        variables: { input }
      })
      .pipe(
        map(result => {
          if (result.errors) {
            console.error('❌ Error al crear triaje:', result.errors);
            throw new Error('Error al crear triaje');
          }
          console.log('✅ Triaje creado con GraphQL:', result.data?.crearTriaje);
          return result.data!.crearTriaje;
        })
      );
  }
}
