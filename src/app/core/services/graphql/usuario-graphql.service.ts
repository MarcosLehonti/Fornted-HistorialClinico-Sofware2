import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  GET_USUARIOS,
  GET_USUARIO,
  GET_MEDICOS,
  GET_ROLES,
  ASIGNAR_ROL_MUTATION,
  ASIGNAR_ESPECIALIDADES_MUTATION
} from '../../graphql/operations/usuario.operations';

export interface Usuario {
  id: string;
  username: string;
  email: string;
  roles: Array<{ id: string; nombre: string }>;
  especialidades?: Array<{ id: string; nombre: string }>;
}

export interface Rol {
  id: string;
  nombre: string;
}

@Injectable({
  providedIn: 'root'
})
export class UsuarioGraphQLService {
  constructor(private apollo: Apollo) {}

  /**
   * Obtiene todos los usuarios
   */
  getUsuarios(): Observable<Usuario[]> {
    return this.apollo
      .query<{ usuarios: Usuario[] }>({
        query: GET_USUARIOS,
        fetchPolicy: 'network-only'
      })
      .pipe(
        map(result => {
          if (result.errors) {
            throw new Error(result.errors[0].message);
          }
          return result.data.usuarios;
        })
      );
  }

  /**
   * Obtiene un usuario por ID
   */
  getUsuario(id: string): Observable<Usuario> {
    return this.apollo
      .query<{ usuario: Usuario }>({
        query: GET_USUARIO,
        variables: { id },
        fetchPolicy: 'network-only'
      })
      .pipe(
        map(result => {
          if (result.errors) {
            throw new Error(result.errors[0].message);
          }
          return result.data.usuario;
        })
      );
  }

  /**
   * Obtiene todos los médicos
   */
  getMedicos(): Observable<Usuario[]> {
    return this.apollo
      .query<{ medicos: Usuario[] }>({
        query: GET_MEDICOS,
        fetchPolicy: 'network-only'
      })
      .pipe(
        map(result => {
          if (result.errors) {
            throw new Error(result.errors[0].message);
          }
          return result.data.medicos;
        })
      );
  }

  /**
   * Obtiene todos los roles
   */
  getRoles(): Observable<Rol[]> {
    return this.apollo
      .query<{ roles: Rol[] }>({
        query: GET_ROLES,
        fetchPolicy: 'network-only'
      })
      .pipe(
        map(result => {
          if (result.errors) {
            throw new Error(result.errors[0].message);
          }
          return result.data.roles;
        })
      );
  }

  /**
   * Asigna un rol a un usuario
   */
  asignarRol(usuarioId: string, rol: string): Observable<boolean> {
    return this.apollo
      .mutate<{ asignarRol: boolean }>({
        mutation: ASIGNAR_ROL_MUTATION,
        variables: { usuarioId, rol }
      })
      .pipe(
        map(result => {
          if (result.errors) {
            throw new Error(result.errors[0].message);
          }
          return result.data!.asignarRol;
        })
      );
  }

  /**
   * Asigna especialidades a un usuario (médico)
   */
  asignarEspecialidades(usuarioId: string, especialidadIds: string[]): Observable<boolean> {
    return this.apollo
      .mutate<{ asignarEspecialidades: boolean }>({
        mutation: ASIGNAR_ESPECIALIDADES_MUTATION,
        variables: { usuarioId, especialidadIds }
      })
      .pipe(
        map(result => {
          if (result.errors) {
            throw new Error(result.errors[0].message);
          }
          return result.data!.asignarEspecialidades;
        })
      );
  }
}
