import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpLink } from 'apollo-angular/http';
import { ApolloClientOptions, InMemoryCache, ApolloLink } from '@apollo/client/core';
import { setContext } from '@apollo/client/link/context';
import { APOLLO_OPTIONS, ApolloModule } from 'apollo-angular';

const uri = 'http://localhost:8080/graphql'; // URL del backend GraphQL

export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {
  // Configurar el contexto para incluir el token JWT en cada petición
  const auth = setContext((operation, context) => {
    const token = localStorage.getItem('token');
    
    if (token === null) {
      return {};
    }

    return {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
  });

  // Crear el link HTTP
  const http = httpLink.create({ uri });

  return {
    link: ApolloLink.from([auth, http]),
    cache: new InMemoryCache({
      addTypename: true,
      typePolicies: {
        Query: {
          fields: {
            // Configurar políticas de caché si es necesario
          }
        }
      }
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

@NgModule({
  imports: [HttpClientModule, ApolloModule],
  exports: [HttpClientModule, ApolloModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink]
    }
  ]
})
export class GraphQLModule {}
