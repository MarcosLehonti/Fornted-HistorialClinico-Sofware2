import { gql } from 'apollo-angular';

// ==================== MUTATIONS ====================

// 🔑 LOGIN (usa loginWithEmail)
export const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    loginWithEmail(email: $email, password: $password) {
      message
      idToken
      Token
      userId
      role
      email
      uid
      name
    }
  }
`;

// 🧍 REGISTRO (usa registerUser)
export const REGISTRO_MUTATION = gql`
  mutation RegisterUser($name: String!, $email: String!, $password: String!) {
    registerUser(name: $name, email: $email, password: $password) {
      uid
      email
      name
      message
    }
  }
`;

// ==================== QUERIES ====================

// 👤 PERFIL (por ahora sin cambios, depende del backend)
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
