import { gql } from 'apollo-angular';

// ==================== QUERIES ====================

export const GET_TRIAJES_POR_PACIENTE = gql`
  query GetTriajesPorPaciente($pacienteId: ID!) {
    triajesPorPaciente(pacienteId: $pacienteId) {
      id
      presionArterial
      temperatura
      peso
      altura
      frecuenciaCardiaca
      frecuenciaRespiratoria
      saturacionOxigeno
      observaciones
      fecha
      paciente {
        id
        username
      }
      enfermera {
        id
        username
      }
    }
  }
`;

// ==================== MUTATIONS ====================

export const CREAR_TRIAJE_MUTATION = gql`
  mutation CrearTriaje($input: TriajeInput!) {
    crearTriaje(input: $input) {
      id
      presionArterial
      temperatura
      peso
      altura
      frecuenciaCardiaca
      frecuenciaRespiratoria
      saturacionOxigeno
      observaciones
      fecha
      paciente {
        id
        username
      }
      enfermera {
        id
        username
      }
    }
  }
`;
