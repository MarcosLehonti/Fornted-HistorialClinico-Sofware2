import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { ApolloClient, InMemoryCache } from '@apollo/client/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LOGIN_MUTATION, REGISTRO_MUTATION, GET_PERFIL_QUERY } from '../../graphql/operations/auth.operations';

export interface LoginResponse {
  message: string;
  idToken: string;
  Token: string;
  userId: string;
  role: string;
  email: string;
  uid: string;
  name: string;
}

export interface RegisterResponse {
  uid: string;
  email: string;
  name: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthGraphQLService {
  constructor(private apollo: Apollo, private httpLink: HttpLink) {
    // ✅ Crear cliente Apollo apuntando al backend (puerto 4000)
    this.apollo.createNamed('authClient', {
      link: this.httpLink.create({
        //uri: 'http://localhost:4000/graphql',
        uri:'https://backend-historialclinico-sofware2.onrender.com/graphql',
      }),
      cache: new InMemoryCache(),
    });
  }

  private get client() {
    return this.apollo.use('authClient');
  }

  /**
   * 🔐 Login con Firebase + Spring Boot
   */
  login(email: string, password: string): Observable<LoginResponse> {
    return this.client
      .mutate<{ loginWithEmail: LoginResponse }>({
        mutation: LOGIN_MUTATION,
        variables: { email, password },
      })
      .pipe(
        map(result => {
          if (result.errors) throw new Error(result.errors[0].message);
          const data = result.data!.loginWithEmail;

          // ✅ Guardar los datos importantes en localStorage
          localStorage.setItem('idToken', data.idToken);
          localStorage.setItem('Token', data.Token);
          localStorage.setItem('userId', data.userId);
          localStorage.setItem('role', data.role);
          localStorage.setItem('email', data.email);
          localStorage.setItem('uid', data.uid);
          localStorage.setItem('name', data.name);

          return data;
        })
      );
  }

  /**
   * 🧍 Registro de usuario con Firebase + Spring Boot
   */
  registro(name: string, email: string, password: string): Observable<RegisterResponse> {
    return this.client
      .mutate<{ registerUser: RegisterResponse }>({
        mutation: REGISTRO_MUTATION,
        variables: { name, email, password },
      })
      .pipe(
        map(result => {
          if (result.errors) throw new Error(result.errors[0].message);
          return result.data!.registerUser;
        })
      );
  }

  /**
   * 👤 Obtiene el perfil del usuario (si tu backend lo soporta)
   */
  getPerfil(): Observable<any> {
    return this.client
      .query<{ perfil: any }>({
        query: GET_PERFIL_QUERY,
        fetchPolicy: 'network-only',
      })
      .pipe(
        map(result => {
          if (result.errors) throw new Error(result.errors[0].message);
          return result.data.perfil;
        })
      );
  }

  /**
   * 🚪 Cierra sesión y limpia almacenamiento local
   */
  logout(): void {
    localStorage.clear();
  }
}
