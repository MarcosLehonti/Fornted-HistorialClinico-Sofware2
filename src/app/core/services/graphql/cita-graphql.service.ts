import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  GET_CITAS_POR_USUARIO,
  GET_CITAS_POR_MEDICO,
  CREAR_CITA_MUTATION
} from '../../graphql/operations/cita.operations';

export interface CitaInput {
  usuarioId: string;
  medicoId: string;
  especialidadId: string;
  turnoId: string;
  diaId: string;
  horario: string;
  nombreUsuarioLogeado: string;
  horarioId: string;
}

export interface Cita {
  id: string;
  horario: string;
  nombreUsuarioLogeado: string;
  fecha?: string;
  usuario: {
    id: string;
    username: string;
    email: string;
  };
  medico: {
    id: string;
    username: string;
  };
  especialidad: {
    id: string;
    nombre: string;
  };
  turno: {
    id: string;
    nombre: string;
  };
  dia: {
    id: string;
    nombre: string;
  };
  horarioSeleccionado?: {
    id: string;
    horaInicio: string;
    horaFin: string;
    fecha: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class CitaGraphQLService {
  constructor(private apollo: Apollo) {}

  /**
   * Obtiene las citas de un usuario (paciente)
   */
  getCitasPorUsuario(usuarioId: string): Observable<Cita[]> {
    return this.apollo
      .query<{ citasPorUsuario: Cita[] }>({
        query: GET_CITAS_POR_USUARIO,
        variables: { usuarioId },
        fetchPolicy: 'network-only'
      })
      .pipe(
        map(result => {
          if (result.errors) {
            throw new Error(result.errors[0].message);
          }
          return result.data.citasPorUsuario;
        })
      );
  }

  /**
   * Obtiene las citas de un médico
   */
  getCitasPorMedico(medicoId: string): Observable<Cita[]> {
    return this.apollo
      .query<{ citasPorMedico: Cita[] }>({
        query: GET_CITAS_POR_MEDICO,
        variables: { medicoId },
        fetchPolicy: 'network-only'
      })
      .pipe(
        map(result => {
          if (result.errors) {
            throw new Error(result.errors[0].message);
          }
          return result.data.citasPorMedico;
        })
      );
  }

  /**
   * Crea una nueva cita
   */
  crearCita(input: CitaInput): Observable<Cita> {
    return this.apollo
      .mutate<{ crearCita: Cita }>({
        mutation: CREAR_CITA_MUTATION,
        variables: { input }
      })
      .pipe(
        map(result => {
          if (result.errors) {
            throw new Error(result.errors[0].message);
          }
          return result.data!.crearCita;
        })
      );
  }
}
