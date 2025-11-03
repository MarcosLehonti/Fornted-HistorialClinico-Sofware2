// import { ApplicationConfig, provideZoneChangeDetection, importProvidersFrom } from '@angular/core';
// import { provideRouter } from '@angular/router';
// import { routes } from './app.routes';
// import { provideClientHydration } from '@angular/platform-browser';
// import { provideHttpClient } from '@angular/common/http';
// import { ReactiveFormsModule } from '@angular/forms';

// export const appConfig: ApplicationConfig = {
//   providers: [
//     provideZoneChangeDetection({ eventCoalescing: true }),
//     provideRouter(routes),
//     provideClientHydration(),
//     provideHttpClient(),
//     importProvidersFrom(ReactiveFormsModule) // Agregado sin modificar el resto
//   ]
// };


import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { AuthGuard } from './guards/auth.guard';
import { Apollo, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache, ApolloLink } from '@apollo/client/core';
import { setContext } from '@apollo/client/link/context';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding()),
    provideClientHydration(),
    provideHttpClient(withFetch()),
    Apollo,
    HttpLink,
    {
      provide: APOLLO_OPTIONS,
      useFactory: (httpLink: HttpLink) => {
        const uri = 'http://localhost:8080/graphql';
        
        const auth = setContext((operation, context) => {
          // SSR-safe: Verificar si estamos en el navegador
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

        const http = httpLink.create({ uri });

        return {
          link: ApolloLink.from([auth, http]),
          cache: new InMemoryCache(),
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
      },
      deps: [HttpLink]
    },
    AuthGuard
  ]
};
