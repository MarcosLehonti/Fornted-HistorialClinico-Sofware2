import { gql } from 'apollo-angular';

// ==================== QUERIES ====================

export const GET_DIAGNOSTICOS_POR_PACIENTE = gql`
  query GetDiagnosticosPorPaciente($pacienteId: ID!) {
    diagnosticosPorPaciente(pacienteId: $pacienteId) {
      id
      descripcion
      tratamiento
      fecha
      paciente {
        id
        username
        email
      }
      medico {
        id
        username
      }
    }
  }
`;

// ==================== MUTATIONS ====================

export const CREAR_DIAGNOSTICO_MUTATION = gql`
  mutation CrearDiagnostico($input: DiagnosticoInput!) {
    crearDiagnostico(input: $input) {
      id
      descripcion
      tratamiento
      fecha
      paciente {
        id
        username
      }
      medico {
        id
        username
      }
    }
  }
`;
