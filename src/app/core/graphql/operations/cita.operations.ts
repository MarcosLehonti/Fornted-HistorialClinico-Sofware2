import { gql } from 'apollo-angular';

// ==================== QUERIES ====================

export const GET_CITAS_POR_USUARIO = gql`
  query GetCitasPorUsuario($usuarioId: ID!) {
    citasPorUsuario(usuarioId: $usuarioId) {
      id
      horario
      nombreUsuarioLogeado
      fecha
      usuario {
        id
        username
        email
      }
      medico {
        id
        username
      }
      especialidad {
        id
        nombre
      }
      turno {
        id
        nombre
      }
      dia {
        id
        nombre
      }
      horarioSeleccionado {
        id
        horaInicio
        horaFin
        fecha
      }
    }
  }
`;

export const GET_CITAS_POR_MEDICO = gql`
  query GetCitasPorMedico($medicoId: ID!) {
    citasPorMedico(medicoId: $medicoId) {
      id
      horario
      nombreUsuarioLogeado
      fecha
      usuario {
        id
        username
        email
      }
      medico {
        id
        username
      }
      especialidad {
        id
        nombre
      }
      turno {
        id
        nombre
      }
      dia {
        id
        nombre
      }
      horarioSeleccionado {
        id
        horaInicio
        horaFin
        fecha
      }
    }
  }
`;

// ==================== MUTATIONS ====================

export const CREAR_CITA_MUTATION = gql`
  mutation CrearCita($input: CitaInput!) {
    crearCita(input: $input) {
      id
      horario
      nombreUsuarioLogeado
      fecha
      usuario {
        id
        username
        email
      }
      medico {
        id
        username
      }
      especialidad {
        id
        nombre
      }
      turno {
        id
        nombre
      }
      dia {
        id
        nombre
      }
    }
  }
`;
