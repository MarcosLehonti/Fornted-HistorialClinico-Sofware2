import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { 
  GET_HORARIOS, 
  GET_HORARIOS_POR_ESPECIALIDAD,
  CREAR_HORARIO_MUTATION 
} from '../../graphql/operations/horario.operations';

export interface Horario {
  id: string;
  fecha?: string;
  horaInicio: string;
  horaFin: string;
  disponible?: boolean;
  especialidad?: {
    id: string;
    nombre: string;
  };
  turno?: {
    id: string;
    nombre: string;
  };
  dia?: {
    id: string;
    nombre: string;
  };
}

export interface HorarioInput {
  dia: string;
  horaInicio: string;
  horaFin: string;
  especialidadId?: string;
}

@Injectable({
  providedIn: 'root'
})
export class HorarioGraphQLService {
  constructor(private apollo: Apollo) {}

  /**
   * Obtiene todos los horarios
   */
  getHorarios(): Observable<Horario[]> {
    return this.apollo
      .query<{ horarios: Horario[] }>({
        query: GET_HORARIOS
      })
      .pipe(
        map(result => {
          if (result.errors) {
            console.error('❌ Error en query horarios:', result.errors);
            throw new Error('Error al obtener horarios');
          }
          console.log('✅ Horarios obtenidos con GraphQL:', result.data?.horarios);
          return result.data?.horarios || [];
        })
      );
  }

  /**
   * Obtiene horarios por especialidad
   */
  getHorariosPorEspecialidad(especialidadId: string): Observable<Horario[]> {
    return this.apollo
      .query<{ horariosPorEspecialidad: Horario[] }>({
        query: GET_HORARIOS_POR_ESPECIALIDAD,
        variables: { especialidadId }
      })
      .pipe(
        map(result => {
          if (result.errors) {
            console.error('❌ Error en query horarios por especialidad:', result.errors);
            throw new Error('Error al obtener horarios por especialidad');
          }
          console.log('✅ Horarios por especialidad obtenidos:', result.data?.horariosPorEspecialidad);
          return result.data?.horariosPorEspecialidad || [];
        })
      );
  }

  /**
   * Crea un nuevo horario
   */
  createHorario(input: HorarioInput): Observable<Horario> {
    return this.apollo
      .mutate<{ crearHorario: Horario }>({
        mutation: CREAR_HORARIO_MUTATION,
        variables: { input }
      })
      .pipe(
        map(result => {
          if (result.errors) {
            console.error('❌ Error al crear horario:', result.errors);
            throw new Error('Error al crear horario');
          }
          console.log('✅ Horario creado con GraphQL:', result.data?.crearHorario);
          return result.data!.crearHorario;
        })
      );
  }
}
