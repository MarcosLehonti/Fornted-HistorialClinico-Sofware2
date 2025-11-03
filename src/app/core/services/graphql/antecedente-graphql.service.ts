import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { gql } from 'apollo-angular';

export interface Antecedente {
  id: string;
  descripcion: string;
  tipo: string;
  fecha: string;
  pacienteId: string;
}

export interface AntecedenteInput {
  descripcion: string;
  tipo: string;
  fecha: string;
  pacienteId: string;
}

const GET_ANTECEDENTES_POR_PACIENTE = gql`
  query GetAntecedentesPorPaciente($pacienteId: ID!) {
    antecedentesPorPaciente(pacienteId: $pacienteId) {
      id
      descripcion
      tipo
      fecha
      paciente {
        id
        username
      }
    }
  }
`;

const CREAR_ANTECEDENTE_MUTATION = gql`
  mutation CrearAntecedente($input: AntecedenteInput!) {
    crearAntecedente(input: $input) {
      id
      descripcion
      tipo
      fecha
      paciente {
        id
        username
      }
    }
  }
`;

@Injectable({
  providedIn: 'root'
})
export class AntecedenteGraphQLService {
  constructor(private apollo: Apollo) {}

  /**
   * Obtiene antecedentes por paciente
   */
  getAntecedentesPorPaciente(pacienteId: string): Observable<Antecedente[]> {
    return this.apollo
      .query<{ antecedentesPorPaciente: Antecedente[] }>({
        query: GET_ANTECEDENTES_POR_PACIENTE,
        variables: { pacienteId }
      })
      .pipe(
        map(result => {
          if (result.errors) {
            console.error('❌ Error en query antecedentes:', result.errors);
            throw new Error('Error al obtener antecedentes');
          }
          console.log('✅ Antecedentes obtenidos con GraphQL:', result.data?.antecedentesPorPaciente);
          return result.data?.antecedentesPorPaciente || [];
        })
      );
  }

  /**
   * Crea un nuevo antecedente
   */
  createAntecedente(input: AntecedenteInput): Observable<Antecedente> {
    return this.apollo
      .mutate<{ crearAntecedente: Antecedente }>({
        mutation: CREAR_ANTECEDENTE_MUTATION,
        variables: { input }
      })
      .pipe(
        map(result => {
          if (result.errors) {
            console.error('❌ Error al crear antecedente:', result.errors);
            throw new Error('Error al crear antecedente');
          }
          console.log('✅ Antecedente creado con GraphQL:', result.data?.crearAntecedente);
          return result.data!.crearAntecedente;
        })
      );
  }
}
