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


import { ApplicationConfig, provideZoneChangeDetection, importProvidersFrom } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from './guards/auth.guard'; // Importa el AuthGuard

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding()), // Agrega withComponentInputBinding aquí
    provideClientHydration(),
    provideHttpClient(),
    importProvidersFrom(ReactiveFormsModule),
    AuthGuard // Agrega AuthGuard a los proveedores
  ]
};
