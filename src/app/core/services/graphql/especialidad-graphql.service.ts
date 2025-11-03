import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  GET_ESPECIALIDADES,
  GET_ESPECIALIDADES_POR_USUARIO,
  CREAR_ESPECIALIDAD_MUTATION
} from '../../graphql/operations/especialidad.operations';

export interface Especialidad {
  id: string;
  nombre: string;
}

@Injectable({
  providedIn: 'root'
})
export class EspecialidadGraphQLService {
  constructor(private apollo: Apollo) {}

  /**
   * Obtiene todas las especialidades
   */
  getEspecialidades(): Observable<Especialidad[]> {
    return this.apollo
      .query<{ especialidades: Especialidad[] }>({
        query: GET_ESPECIALIDADES,
        fetchPolicy: 'network-only'
      })
      .pipe(
        map(result => {
          if (result.errors) {
            throw new Error(result.errors[0].message);
          }
          return result.data.especialidades;
        })
      );
  }

  /**
   * Obtiene las especialidades de un usuario (médico)
   */
  getEspecialidadesPorUsuario(usuarioId: string): Observable<Especialidad[]> {
    return this.apollo
      .query<{ especialidadesPorUsuario: Especialidad[] }>({
        query: GET_ESPECIALIDADES_POR_USUARIO,
        variables: { usuarioId },
        fetchPolicy: 'network-only'
      })
      .pipe(
        map(result => {
          if (result.errors) {
            throw new Error(result.errors[0].message);
          }
          return result.data.especialidadesPorUsuario;
        })
      );
  }

  /**
   * Crea una nueva especialidad
   */
  crearEspecialidad(nombre: string): Observable<Especialidad> {
    return this.apollo
      .mutate<{ crearEspecialidad: Especialidad }>({
        mutation: CREAR_ESPECIALIDAD_MUTATION,
        variables: { nombre }
      })
      .pipe(
        map(result => {
          if (result.errors) {
            throw new Error(result.errors[0].message);
          }
          return result.data!.crearEspecialidad;
        })
      );
  }
}
