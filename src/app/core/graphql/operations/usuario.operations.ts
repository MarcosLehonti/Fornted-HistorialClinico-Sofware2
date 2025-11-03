import { gql } from 'apollo-angular';

// ==================== QUERIES ====================

export const GET_USUARIOS = gql`
  query GetUsuarios {
    usuarios {
      id
      username
      email
      roles {
        id
        nombre
      }
    }
  }
`;

export const GET_USUARIO = gql`
  query GetUsuario($id: ID!) {
    usuario(id: $id) {
      id
      username
      email
      roles {
        id
        nombre
      }
      especialidades {
        id
        nombre
      }
    }
  }
`;

export const GET_MEDICOS = gql`
  query GetMedicos {
    medicos {
      id
      username
      email
      especialidades {
        id
        nombre
      }
    }
  }
`;

export const GET_ROLES = gql`
  query GetRoles {
    roles {
      id
      nombre
    }
  }
`;

// ==================== MUTATIONS ====================

export const ASIGNAR_ROL_MUTATION = gql`
  mutation AsignarRol($usuarioId: ID!, $rol: String!) {
    asignarRol(usuarioId: $usuarioId, rol: $rol)
  }
`;

export const ASIGNAR_ESPECIALIDADES_MUTATION = gql`
  mutation AsignarEspecialidades($usuarioId: ID!, $especialidadIds: [ID!]!) {
    asignarEspecialidades(usuarioId: $usuarioId, especialidadIds: $especialidadIds)
  }
`;

export const ACTUALIZAR_USUARIO_MUTATION = gql`
  mutation ActualizarUsuario($id: ID!, $input: UsuarioInput!) {
    actualizarUsuario(id: $id, input: $input) {
      id
      username
      email
    }
  }
`;

export const ELIMINAR_USUARIO_MUTATION = gql`
  mutation EliminarUsuario($id: ID!) {
    eliminarUsuario(id: $id)
  }
`;
