import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  GET_DIAGNOSTICOS_POR_PACIENTE,
  CREAR_DIAGNOSTICO_MUTATION
} from '../../graphql/operations/diagnostico.operations';

export interface DiagnosticoInput {
  pacienteId: string;
  medicoId: string;
  especialidadId: string;
  descripcion: string;
  tratamiento?: string;
}

export interface Diagnostico {
  id: string;
  descripcion: string;
  tratamiento?: string;
  fecha: string;
  paciente: {
    id: string;
    username: string;
    email: string;
  };
  medico: {
    id: string;
    username: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class DiagnosticoGraphQLService {
  constructor(private apollo: Apollo) {}

  /**
   * Obtiene los diagnósticos de un paciente
   */
  getDiagnosticosPorPaciente(pacienteId: string): Observable<Diagnostico[]> {
    return this.apollo
      .query<{ diagnosticosPorPaciente: Diagnostico[] }>({
        query: GET_DIAGNOSTICOS_POR_PACIENTE,
        variables: { pacienteId },
        fetchPolicy: 'network-only'
      })
      .pipe(
        map(result => {
          if (result.errors) {
            throw new Error(result.errors[0].message);
          }
          return result.data.diagnosticosPorPaciente;
        })
      );
  }

  /**
   * Crea un nuevo diagnóstico (envía email automáticamente)
   */
  crearDiagnostico(input: DiagnosticoInput): Observable<Diagnostico> {
    return this.apollo
      .mutate<{ crearDiagnostico: Diagnostico }>({
        mutation: CREAR_DIAGNOSTICO_MUTATION,
        variables: { input }
      })
      .pipe(
        map(result => {
          if (result.errors) {
            throw new Error(result.errors[0].message);
          }
          return result.data!.crearDiagnostico;
        })
      );
  }
}
