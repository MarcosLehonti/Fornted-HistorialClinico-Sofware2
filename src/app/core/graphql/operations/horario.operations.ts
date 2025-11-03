import { gql } from 'apollo-angular';

// ==================== QUERIES ====================

export const GET_HORARIOS = gql`
  query GetHorarios {
    horarios {
      id
      fecha
      horaInicio
      horaFin
      disponible
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

export const GET_HORARIOS_POR_ESPECIALIDAD = gql`
  query GetHorariosPorEspecialidad($especialidadId: ID!) {
    horariosPorEspecialidad(especialidadId: $especialidadId) {
      id
      fecha
      horaInicio
      horaFin
      disponible
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

export const GET_HORARIOS_DISPONIBLES = gql`
  query GetHorariosDisponibles($especialidadId: ID!, $fecha: Date!) {
    horariosDisponibles(especialidadId: $especialidadId, fecha: $fecha) {
      id
      fecha
      horaInicio
      horaFin
      disponible
    }
  }
`;

// ==================== MUTATIONS ====================

export const CREAR_HORARIO_MUTATION = gql`
  mutation CrearHorario(
    $fecha: Date!
    $horaInicio: String!
    $horaFin: String!
    $especialidadId: ID!
    $turnoId: ID!
    $diaId: ID!
  ) {
    crearHorario(
      fecha: $fecha
      horaInicio: $horaInicio
      horaFin: $horaFin
      especialidadId: $especialidadId
      turnoId: $turnoId
      diaId: $diaId
    ) {
      id
      fecha
      horaInicio
      horaFin
      disponible
    }
  }
`;
