import { HttpLink } from 'apollo-angular/http';
import { ApolloClientOptions, InMemoryCache, ApolloLink } from '@apollo/client/core';
import { setContext } from '@apollo/client/link/context';

//const uri = 'http://localhost:8080/graphql';
const uri = 'https://backend-historialclinico-sofware2.onrender.com/graphql';



export function apolloOptionsFactory(httpLink: HttpLink): ApolloClientOptions<any> {
  // Configurar autenticación JWT
  const auth = setContext((operation, context) => {
    // Verificar si estamos en el navegador
    if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
      return {};
    }
    
    const token = localStorage.getItem('token');
    if (!token) {
      return {};
    }
    return {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
  });

  // Crear link HTTP
  const http = httpLink.create({ uri });

  return {
    link: ApolloLink.from([auth, http]),
    cache: new InMemoryCache({
      addTypename: true
    }),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'cache-and-network',
        errorPolicy: 'all'
      },
      query: {
        fetchPolicy: 'network-only',
        errorPolicy: 'all'
      },
      mutate: {
        errorPolicy: 'all'
      }
    }
  };
}
