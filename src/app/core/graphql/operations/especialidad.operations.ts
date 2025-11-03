import { gql } from 'apollo-angular';

// ==================== QUERIES ====================

export const GET_ESPECIALIDADES = gql`
  query GetEspecialidades {
    especialidades {
      id
      nombre
    }
  }
`;

export const GET_ESPECIALIDADES_POR_USUARIO = gql`
  query GetEspecialidadesPorUsuario($usuarioId: ID!) {
    especialidadesPorUsuario(usuarioId: $usuarioId) {
      id
      nombre
    }
  }
`;

// ==================== MUTATIONS ====================

export const CREAR_ESPECIALIDAD_MUTATION = gql`
  mutation CrearEspecialidad($nombre: String!) {
    crearEspecialidad(nombre: $nombre) {
      id
      nombre
    }
  }
`;
