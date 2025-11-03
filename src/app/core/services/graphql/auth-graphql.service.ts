import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LOGIN_MUTATION, REGISTRO_MUTATION, GET_PERFIL_QUERY } from '../../graphql/operations/auth.operations';

export interface LoginInput {
  email: string;
  password: string;
}

export interface RegistroInput {
  username: string;
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  usuarioId: string;
  rol: string;
  email: string;
}

export interface Usuario {
  id: string;
  username: string;
  email: string;
  roles: Array<{ id: string; nombre: string }>;
  especialidades?: Array<{ id: string; nombre: string }>;
}

@Injectable({
  providedIn: 'root'
})
export class AuthGraphQLService {
  constructor(private apollo: Apollo) {}

  /**
   * Realiza el login del usuario
   */
  login(input: LoginInput): Observable<LoginResponse> {
    return this.apollo
      .mutate<{ login: LoginResponse }>({
        mutation: LOGIN_MUTATION,
        variables: { input }
      })
      .pipe(
        map(result => {
          if (result.errors) {
            throw new Error(result.errors[0].message);
          }
          return result.data!.login;
        })
      );
  }

  /**
   * Registra un nuevo usuario
   */
  registro(input: RegistroInput): Observable<Usuario> {
    return this.apollo
      .mutate<{ registro: Usuario }>({
        mutation: REGISTRO_MUTATION,
        variables: { input }
      })
      .pipe(
        map(result => {
          if (result.errors) {
            throw new Error(result.errors[0].message);
          }
          return result.data!.registro;
        })
      );
  }

  /**
   * Obtiene el perfil del usuario autenticado
   */
  getPerfil(): Observable<Usuario> {
    return this.apollo
      .query<{ perfil: Usuario }>({
        query: GET_PERFIL_QUERY,
        fetchPolicy: 'network-only'
      })
      .pipe(
        map(result => {
          if (result.errors) {
            throw new Error(result.errors[0].message);
          }
          return result.data.perfil;
        })
      );
  }
}
