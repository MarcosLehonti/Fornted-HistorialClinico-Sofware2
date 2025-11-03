# 🚀 Migración a GraphQL - Frontend Historial Clínico

## 📋 Tabla de Contenidos
- [Descripción](#descripción)
- [Instalación de Dependencias](#instalación-de-dependencias)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Configuración](#configuración)
- [Uso de Servicios GraphQL](#uso-de-servicios-graphql)
- [Migración de Componentes](#migración-de-componentes)
- [Ejemplos de Uso](#ejemplos-de-uso)

## 📖 Descripción

Este proyecto ha sido migrado de REST API a GraphQL para mejorar la eficiencia de las consultas y reducir el over-fetching de datos. Se utiliza **Apollo Client** para Angular.

## 📦 Instalación de Dependencias

Ejecuta el siguiente comando en la raíz del proyecto frontend:

```bash
npm install apollo-angular @apollo/client graphql
```

O si prefieres usar las versiones específicas:

```bash
npm install apollo-angular@7.0.2 @apollo/client@3.11.0 graphql@16.9.0
```

## 🏗️ Estructura del Proyecto

```
src/app/
├── core/
│   ├── graphql/
│   │   ├── graphql.module.ts              # Configuración de Apollo Client
│   │   └── operations/                     # Queries y Mutations
│   │       ├── auth.operations.ts
│   │       ├── cita.operations.ts
│   │       ├── diagnostico.operations.ts
│   │       ├── especialidad.operations.ts
│   │       ├── horario.operations.ts
│   │       ├── triaje.operations.ts
│   │       └── usuario.operations.ts
│   └── services/
│       └── graphql/                        # Servicios GraphQL
│           ├── auth-graphql.service.ts
│           ├── cita-graphql.service.ts
│           ├── especialidad-graphql.service.ts
│           └── usuario-graphql.service.ts
└── components/                             # Componentes de la aplicación
```

## ⚙️ Configuración

### 1. GraphQL Module

El módulo GraphQL ya está configurado en `src/app/core/graphql/graphql.module.ts` con:
- URL del backend: `http://localhost:8080/graphql`
- Autenticación JWT automática desde localStorage
- Políticas de caché configuradas

### 2. App Config

El módulo GraphQL está importado en `app.config.ts`:

```typescript
import { GraphQLModule } from './core/graphql/graphql.module';

export const appConfig: ApplicationConfig = {
  providers: [
    // ... otros providers
    importProvidersFrom(ReactiveFormsModule, GraphQLModule),
  ]
};
```

## 🔧 Uso de Servicios GraphQL

### Autenticación

```typescript
import { AuthGraphQLService } from './core/services/graphql/auth-graphql.service';

constructor(private authService: AuthGraphQLService) {}

// Login
login() {
  this.authService.login({
    email: 'usuario@example.com',
    password: 'password123'
  }).subscribe({
    next: (response) => {
      localStorage.setItem('token', response.token);
      localStorage.setItem('usuarioId', response.usuarioId);
      localStorage.setItem('rol', response.rol);
      console.log('Login exitoso:', response);
    },
    error: (error) => console.error('Error en login:', error)
  });
}

// Registro
registro() {
  this.authService.registro({
    username: 'nuevoUsuario',
    email: 'nuevo@example.com',
    password: 'password123'
  }).subscribe({
    next: (usuario) => console.log('Usuario registrado:', usuario),
    error: (error) => console.error('Error en registro:', error)
  });
}
```

### Citas

```typescript
import { CitaGraphQLService } from './core/services/graphql/cita-graphql.service';

constructor(private citaService: CitaGraphQLService) {}

// Obtener citas de un paciente
obtenerCitasPaciente(usuarioId: string) {
  this.citaService.getCitasPorUsuario(usuarioId).subscribe({
    next: (citas) => {
      this.citas = citas;
      console.log('Citas del paciente:', citas);
    },
    error: (error) => console.error('Error:', error)
  });
}

// Crear una cita
crearCita() {
  this.citaService.crearCita({
    usuarioId: '1',
    medicoId: '2',
    especialidadId: '1',
    turnoId: '1',
    diaId: '1',
    horario: '09:00 - 10:00',
    nombreUsuarioLogeado: 'Juan Pérez',
    horarioId: '5'
  }).subscribe({
    next: (cita) => console.log('Cita creada:', cita),
    error: (error) => console.error('Error:', error)
  });
}
```

### Especialidades

```typescript
import { EspecialidadGraphQLService } from './core/services/graphql/especialidad-graphql.service';

constructor(private especialidadService: EspecialidadGraphQLService) {}

// Obtener todas las especialidades
obtenerEspecialidades() {
  this.especialidadService.getEspecialidades().subscribe({
    next: (especialidades) => {
      this.especialidades = especialidades;
    },
    error: (error) => console.error('Error:', error)
  });
}
```

### Usuarios

```typescript
import { UsuarioGraphQLService } from './core/services/graphql/usuario-graphql.service';

constructor(private usuarioService: UsuarioGraphQLService) {}

// Obtener médicos
obtenerMedicos() {
  this.usuarioService.getMedicos().subscribe({
    next: (medicos) => {
      this.medicos = medicos;
    },
    error: (error) => console.error('Error:', error)
  });
}

// Asignar rol a usuario
asignarRol(usuarioId: string, rol: string) {
  this.usuarioService.asignarRol(usuarioId, rol).subscribe({
    next: (success) => {
      if (success) {
        console.log('Rol asignado correctamente');
      }
    },
    error: (error) => console.error('Error:', error)
  });
}
```

## 🔄 Migración de Componentes

### Ejemplo: Migrar Login Component

**ANTES (REST):**
```typescript
import { HttpClient } from '@angular/common/http';

export class LoginComponent {
  private apiUrl = 'http://localhost:8080/api/usuarios';
  
  constructor(private http: HttpClient) {}
  
  login(credentials: any) {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }
}
```

**DESPUÉS (GraphQL):**
```typescript
import { AuthGraphQLService } from './core/services/graphql/auth-graphql.service';

export class LoginComponent {
  constructor(private authService: AuthGraphQLService) {}
  
  login(email: string, password: string) {
    this.authService.login({ email, password }).subscribe({
      next: (response) => {
        // Guardar token y datos del usuario
        localStorage.setItem('token', response.token);
        localStorage.setItem('usuarioId', response.usuarioId);
        localStorage.setItem('rol', response.rol);
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        Swal.fire('Error', error.message, 'error');
      }
    });
  }
}
```

### Ejemplo: Migrar Citas Component

**ANTES (REST):**
```typescript
obtenerCitas() {
  const usuarioId = localStorage.getItem('usuarioId');
  this.http.get(`${this.apiUrl}/citas/usuario/${usuarioId}`)
    .subscribe(response => {
      this.citas = response;
    });
}
```

**DESPUÉS (GraphQL):**
```typescript
obtenerCitas() {
  const usuarioId = localStorage.getItem('usuarioId')!;
  this.citaService.getCitasPorUsuario(usuarioId)
    .subscribe({
      next: (citas) => {
        this.citas = citas;
      },
      error: (error) => {
        console.error('Error al obtener citas:', error);
      }
    });
}
```

## 📝 Ejemplos de Uso Completos

### Login y Registro

```typescript
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGraphQLService } from './core/services/graphql/auth-graphql.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(
    private authService: AuthGraphQLService,
    private router: Router
  ) {}

  onLogin() {
    this.authService.login({
      email: this.email,
      password: this.password
    }).subscribe({
      next: (response) => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('usuarioId', response.usuarioId);
        localStorage.setItem('rol', response.rol);
        
        Swal.fire('Éxito', 'Inicio de sesión exitoso', 'success');
        
        // Redirigir según el rol
        if (response.rol === 'ROLE_ADMIN') {
          this.router.navigate(['/admin']);
        } else if (response.rol === 'ROLE_MEDICO') {
          this.router.navigate(['/medico']);
        } else {
          this.router.navigate(['/paciente']);
        }
      },
      error: (error) => {
        Swal.fire('Error', 'Credenciales incorrectas', 'error');
      }
    });
  }
}
```

### Crear Cita

```typescript
import { Component, OnInit } from '@angular/core';
import { CitaGraphQLService } from './core/services/graphql/cita-graphql.service';
import { EspecialidadGraphQLService } from './core/services/graphql/especialidad-graphql.service';
import { UsuarioGraphQLService } from './core/services/graphql/usuario-graphql.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-cita',
  templateUrl: './crear-cita.component.html'
})
export class CrearCitaComponent implements OnInit {
  especialidades: any[] = [];
  medicos: any[] = [];
  
  citaForm = {
    especialidadId: '',
    medicoId: '',
    turnoId: '',
    diaId: '',
    horarioId: ''
  };

  constructor(
    private citaService: CitaGraphQLService,
    private especialidadService: EspecialidadGraphQLService,
    private usuarioService: UsuarioGraphQLService
  ) {}

  ngOnInit() {
    this.cargarEspecialidades();
  }

  cargarEspecialidades() {
    this.especialidadService.getEspecialidades().subscribe({
      next: (especialidades) => {
        this.especialidades = especialidades;
      }
    });
  }

  cargarMedicos() {
    this.usuarioService.getMedicos().subscribe({
      next: (medicos) => {
        this.medicos = medicos;
      }
    });
  }

  crearCita() {
    const usuarioId = localStorage.getItem('usuarioId')!;
    const nombreUsuario = localStorage.getItem('username') || 'Usuario';

    this.citaService.crearCita({
      usuarioId,
      medicoId: this.citaForm.medicoId,
      especialidadId: this.citaForm.especialidadId,
      turnoId: this.citaForm.turnoId,
      diaId: this.citaForm.diaId,
      horario: '09:00 - 10:00',
      nombreUsuarioLogeado: nombreUsuario,
      horarioId: this.citaForm.horarioId
    }).subscribe({
      next: (cita) => {
        Swal.fire('Éxito', 'Cita creada exitosamente', 'success');
        // El email se envía automáticamente desde el backend
      },
      error: (error) => {
        Swal.fire('Error', error.message, 'error');
      }
    });
  }
}
```

## 🎯 Ventajas de GraphQL

1. **Consultas Precisas**: Solo solicitas los datos que necesitas
2. **Menos Peticiones**: Puedes obtener datos relacionados en una sola consulta
3. **Tipado Fuerte**: TypeScript + GraphQL = Código más seguro
4. **Mejor Performance**: Reduce el over-fetching y under-fetching
5. **Documentación Automática**: El schema GraphQL documenta la API

## 🔗 Integración con Microservicio de Emails

El backend ya está configurado para enviar emails automáticamente cuando:
- Se crea una cita → Email de confirmación al paciente
- Se crea un diagnóstico → Email de notificación al paciente

No necesitas hacer nada adicional en el frontend, el backend maneja esto automáticamente.

## 🚨 Notas Importantes

1. **Token JWT**: Se incluye automáticamente en todas las peticiones GraphQL
2. **Manejo de Errores**: Todos los servicios incluyen manejo de errores
3. **Caché**: Apollo Client cachea automáticamente las consultas
4. **Network-Only**: Las queries usan `fetchPolicy: 'network-only'` para datos frescos

## 📚 Recursos Adicionales

- [Documentación de Apollo Angular](https://apollo-angular.com/)
- [GraphQL Official Docs](https://graphql.org/)
- [Spring GraphQL Docs](https://docs.spring.io/spring-graphql/reference/)
