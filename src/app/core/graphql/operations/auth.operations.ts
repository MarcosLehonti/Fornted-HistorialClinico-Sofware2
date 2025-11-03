import { gql } from 'apollo-angular';

// ==================== MUTATIONS ====================

export const LOGIN_MUTATION = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      token
      usuarioId
      rol
      email
    }
  }
`;

export const REGISTRO_MUTATION = gql`
  mutation Registro($input: UsuarioInput!) {
    registro(input: $input) {
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

// ==================== QUERIES ====================

export const GET_PERFIL_QUERY = gql`
  query GetPerfil {
    perfil {
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
