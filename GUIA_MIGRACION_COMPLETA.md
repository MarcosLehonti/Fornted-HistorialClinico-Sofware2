# 🚀 Guía Completa de Migración REST → GraphQL

## 📋 Índice
1. [Servicios GraphQL Necesarios](#servicios-graphql)
2. [Migraciones por Componente](#migraciones-por-componente)
3. [Pasos de Implementación](#pasos-de-implementación)

---

## 🔧 Servicios GraphQL Necesarios

Ya tienes creados:
- ✅ `AuthGraphQLService` - Login, Registro, Perfil
- ✅ `CitaGraphQLService` - Citas
- ✅ `EspecialidadGraphQLService` - Especialidades
- ✅ `UsuarioGraphQLService` - Usuarios, Médicos, Roles
- ✅ `DiagnosticoGraphQLService` - Diagnósticos

### Servicios que necesitas usar directamente:

Los servicios ya creados cubren todas las operaciones principales. Para componentes específicos, usa los servicios existentes.

---

## 📝 Migraciones por Componente

### 1. ✅ Login Component (YA MIGRADO)
**Archivo:** `components/login/login.component.ts`

```typescript
import { AuthGraphQLService } from '../../core/services/graphql/auth-graphql.service';
import { HttpClientModule } from '@angular/common/http';
import { GraphQLModule } from '../../core/graphql/graphql.module';

@Component({
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule, GraphQLModule]
})
export class LoginComponent {
  constructor(private authService: AuthGraphQLService) {}
  
  onLogin() {
    this.authService.login({ email, password }).subscribe({
      next: (response) => {
        localStorage.setItem('token', response.token);
        // ... resto del código
      }
    });
  }
}
```

---

### 2. ✅ Register Component (YA MIGRADO)
**Archivo:** `components/register/register.component.ts`

```typescript
import { AuthGraphQLService } from '../../core/services/graphql/auth-graphql.service';
import { HttpClientModule } from '@angular/common/http';
import { GraphQLModule } from '../../core/graphql/graphql.module';

@Component({
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule, GraphQLModule]
})
export class RegistroComponent {
  constructor(private authService: AuthGraphQLService) {}
  
  onSubmit() {
    this.authService.registro({ username, email, password }).subscribe({
      next: (usuario) => {
        console.log('✅ Registro exitoso');
        this.router.navigate(['/login']);
      }
    });
  }
}
```

---

### 3. 🔄 Citas Usuario Component
**Archivo:** `components/citas-usuario/citas-usuario.component.ts`

**ANTES (REST):**
```typescript
import { ApiService } from '../../api.service';

obtenerCitas() {
  this.apiService.obtenerCitasPorUsuario(usuarioId).subscribe(...)
}
```

**DESPUÉS (GraphQL):**
```typescript
import { CitaGraphQLService } from '../../core/services/graphql/cita-graphql.service';
import { HttpClientModule } from '@angular/common/http';
import { GraphQLModule } from '../../core/graphql/graphql.module';

@Component({
  standalone: true,
  imports: [CommonModule, HttpClientModule, GraphQLModule, ...]
})
export class CitasUsuarioComponent {
  constructor(private citaService: CitaGraphQLService) {}
  
  obtenerCitas() {
    const usuarioId = localStorage.getItem('usuarioId')!;
    this.citaService.getCitasPorUsuario(usuarioId).subscribe({
      next: (citas) => {
        this.citas = citas;
        console.log('✅ Citas obtenidas:', citas);
      },
      error: (error) => console.error('Error:', error)
    });
  }
}
```

---

### 4. 🔄 Citas Médico Component
**Archivo:** `components/citas-medico/citas-medico.component.ts`

**DESPUÉS (GraphQL):**
```typescript
import { CitaGraphQLService } from '../../core/services/graphql/cita-graphql.service';
import { HttpClientModule } from '@angular/common/http';
import { GraphQLModule } from '../../core/graphql/graphql.module';

@Component({
  standalone: true,
  imports: [CommonModule, HttpClientModule, GraphQLModule, ...]
})
export class CitasMedicoComponent {
  constructor(private citaService: CitaGraphQLService) {}
  
  obtenerCitas() {
    const medicoId = localStorage.getItem('usuarioId')!;
    this.citaService.getCitasPorMedico(medicoId).subscribe({
      next: (citas) => {
        this.citas = citas;
        console.log('✅ Citas del médico obtenidas:', citas);
      },
      error: (error) => console.error('Error:', error)
    });
  }
}
```

---

### 5. 🔄 Crear Diagnóstico Component
**Archivo:** `components/crear-diagnostico/crear-diagnostico.component.ts`

**DESPUÉS (GraphQL):**
```typescript
import { DiagnosticoGraphQLService } from '../../core/services/graphql/diagnostico-graphql.service';
import { HttpClientModule } from '@angular/common/http';
import { GraphQLModule } from '../../core/graphql/graphql.module';

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule, GraphQLModule, ...]
})
export class CrearDiagnosticoComponent {
  constructor(private diagnosticoService: DiagnosticoGraphQLService) {}
  
  crearDiagnostico() {
    const medicoId = localStorage.getItem('usuarioId')!;
    
    this.diagnosticoService.crearDiagnostico({
      pacienteId: this.pacienteId,
      medicoId: medicoId,
      especialidadId: this.especialidadId,
      descripcion: this.descripcion,
      tratamiento: this.tratamiento
    }).subscribe({
      next: (diagnostico) => {
        console.log('✅ Diagnóstico creado (email enviado automáticamente):', diagnostico);
        Swal.fire('Éxito', 'Diagnóstico creado y notificación enviada al paciente', 'success');
      },
      error: (error) => {
        console.error('Error:', error);
        Swal.fire('Error', error.message, 'error');
      }
    });
  }
}
```

---

### 6. 🔄 Diagnósticos Component (Ver diagnósticos)
**Archivo:** `components/diagnosticos/diagnosticos.component.ts`

**DESPUÉS (GraphQL):**
```typescript
import { DiagnosticoGraphQLService } from '../../core/services/graphql/diagnostico-graphql.service';
import { HttpClientModule } from '@angular/common/http';
import { GraphQLModule } from '../../core/graphql/graphql.module';

@Component({
  standalone: true,
  imports: [CommonModule, HttpClientModule, GraphQLModule, ...]
})
export class DiagnosticosComponent {
  constructor(private diagnosticoService: DiagnosticoGraphQLService) {}
  
  obtenerDiagnosticos() {
    const pacienteId = localStorage.getItem('usuarioId')!;
    
    this.diagnosticoService.getDiagnosticosPorPaciente(pacienteId).subscribe({
      next: (diagnosticos) => {
        this.diagnosticos = diagnosticos;
        console.log('✅ Diagnósticos obtenidos:', diagnosticos);
      },
      error: (error) => console.error('Error:', error)
    });
  }
}
```

---

### 7. 🔄 Especialidades Component
**Archivo:** `components/especialidades/especialidades.component.ts`

**DESPUÉS (GraphQL):**
```typescript
import { EspecialidadGraphQLService } from '../../core/services/graphql/especialidad-graphql.service';
import { HttpClientModule } from '@angular/common/http';
import { GraphQLModule } from '../../core/graphql/graphql.module';

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule, GraphQLModule, ...]
})
export class EspecialidadesComponent {
  constructor(private especialidadService: EspecialidadGraphQLService) {}
  
  obtenerEspecialidades() {
    this.especialidadService.getEspecialidades().subscribe({
      next: (especialidades) => {
        this.especialidades = especialidades;
        console.log('✅ Especialidades obtenidas:', especialidades);
      },
      error: (error) => console.error('Error:', error)
    });
  }
  
  crearEspecialidad(nombre: string) {
    this.especialidadService.crearEspecialidad(nombre).subscribe({
      next: (especialidad) => {
        console.log('✅ Especialidad creada:', especialidad);
        this.obtenerEspecialidades(); // Recargar lista
      },
      error: (error) => console.error('Error:', error)
    });
  }
}
```

---

### 8. 🔄 Médicos Component (Asignar especialidades)
**Archivo:** `components/medicos/medicos.component.ts`

**DESPUÉS (GraphQL):**
```typescript
import { UsuarioGraphQLService } from '../../core/services/graphql/usuario-graphql.service';
import { EspecialidadGraphQLService } from '../../core/services/graphql/especialidad-graphql.service';
import { HttpClientModule } from '@angular/common/http';
import { GraphQLModule } from '../../core/graphql/graphql.module';

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule, GraphQLModule, ...]
})
export class MedicosComponent {
  constructor(
    private usuarioService: UsuarioGraphQLService,
    private especialidadService: EspecialidadGraphQLService
  ) {}
  
  obtenerMedicos() {
    this.usuarioService.getMedicos().subscribe({
      next: (medicos) => {
        this.medicos = medicos;
        console.log('✅ Médicos obtenidos:', medicos);
      },
      error: (error) => console.error('Error:', error)
    });
  }
  
  obtenerEspecialidades() {
    this.especialidadService.getEspecialidades().subscribe({
      next: (especialidades) => {
        this.especialidades = especialidades;
      },
      error: (error) => console.error('Error:', error)
    });
  }
  
  asignarEspecialidades() {
    if (this.medicoSeleccionado && this.especialidadesSeleccionadas.length > 0) {
      this.usuarioService.asignarEspecialidades(
        this.medicoSeleccionado.id,
        this.especialidadesSeleccionadas
      ).subscribe({
        next: (success) => {
          if (success) {
            console.log('✅ Especialidades asignadas');
            Swal.fire('Éxito', 'Especialidades asignadas correctamente', 'success');
          }
        },
        error: (error) => {
          console.error('Error:', error);
          Swal.fire('Error', error.message, 'error');
        }
      });
    }
  }
}
```

---

### 9. 🔄 User List Component
**Archivo:** `components/user-list/user-list.component.ts`

**DESPUÉS (GraphQL):**
```typescript
import { UsuarioGraphQLService } from '../../core/services/graphql/usuario-graphql.service';
import { HttpClientModule } from '@angular/common/http';
import { GraphQLModule } from '../../core/graphql/graphql.module';

@Component({
  standalone: true,
  imports: [CommonModule, HttpClientModule, GraphQLModule, ...]
})
export class UserListComponent {
  constructor(private usuarioService: UsuarioGraphQLService) {}
  
  obtenerUsuarios() {
    this.usuarioService.getUsuarios().subscribe({
      next: (usuarios) => {
        this.usuarios = usuarios;
        console.log('✅ Usuarios obtenidos:', usuarios);
      },
      error: (error) => console.error('Error:', error)
    });
  }
  
  obtenerRoles() {
    this.usuarioService.getRoles().subscribe({
      next: (roles) => {
        this.roles = roles;
      },
      error: (error) => console.error('Error:', error)
    });
  }
  
  asignarRol(usuarioId: string, rol: string) {
    this.usuarioService.asignarRol(usuarioId, rol).subscribe({
      next: (success) => {
        if (success) {
          console.log('✅ Rol asignado');
          Swal.fire('Éxito', 'Rol asignado correctamente', 'success');
          this.obtenerUsuarios(); // Recargar lista
        }
      },
      error: (error) => {
        console.error('Error:', error);
        Swal.fire('Error', error.message, 'error');
      }
    });
  }
}
```

---

### 10. 🔄 Perfil Component
**Archivo:** `components/perfil/perfil.component.ts`

**DESPUÉS (GraphQL):**
```typescript
import { AuthGraphQLService } from '../../core/services/graphql/auth-graphql.service';
import { HttpClientModule } from '@angular/common/http';
import { GraphQLModule } from '../../core/graphql/graphql.module';

@Component({
  standalone: true,
  imports: [CommonModule, HttpClientModule, GraphQLModule, ...]
})
export class PerfilComponent {
  constructor(private authService: AuthGraphQLService) {}
  
  obtenerPerfil() {
    this.authService.getPerfil().subscribe({
      next: (usuario) => {
        this.usuario = usuario;
        console.log('✅ Perfil obtenido:', usuario);
      },
      error: (error) => {
        console.error('Error:', error);
        // Si el token expiró, redirigir al login
        if (error.message.includes('Unauthorized')) {
          localStorage.clear();
          this.router.navigate(['/login']);
        }
      }
    });
  }
}
```

---

## 🎯 Patrón General de Migración

Para CUALQUIER componente, sigue este patrón:

### 1. **Imports necesarios:**
```typescript
import { HttpClientModule } from '@angular/common/http';
import { GraphQLModule } from '../../core/graphql/graphql.module';
import { [Servicio]GraphQLService } from '../../core/services/graphql/[servicio]-graphql.service';
```

### 2. **Agregar a imports del componente:**
```typescript
@Component({
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule, // Si usa formularios
    HttpClientModule,    // ← IMPORTANTE
    GraphQLModule,       // ← IMPORTANTE
    // ... otros imports
  ]
})
```

### 3. **Inyectar servicio GraphQL:**
```typescript
constructor(
  private [servicio]Service: [Servicio]GraphQLService,
  // ... otros servicios
) {}
```

### 4. **Usar el servicio:**
```typescript
this.[servicio]Service.metodo(parametros).subscribe({
  next: (data) => {
    console.log('✅ Éxito:', data);
    // Procesar datos
  },
  error: (error) => {
    console.error('❌ Error:', error);
    // Manejar error
  }
});
```

---

## 📦 Servicios GraphQL Disponibles

### AuthGraphQLService
- `login(email, password)` - Login
- `registro(username, email, password)` - Registro
- `getPerfil()` - Obtener perfil del usuario autenticado

### CitaGraphQLService
- `getCitasPorUsuario(usuarioId)` - Citas del paciente
- `getCitasPorMedico(medicoId)` - Citas del médico
- `crearCita(input)` - Crear cita (envía email automático)

### DiagnosticoGraphQLService
- `getDiagnosticosPorPaciente(pacienteId)` - Diagnósticos del paciente
- `crearDiagnostico(input)` - Crear diagnóstico (envía email automático)

### EspecialidadGraphQLService
- `getEspecialidades()` - Todas las especialidades
- `getEspecialidadesPorUsuario(usuarioId)` - Especialidades de un médico
- `crearEspecialidad(nombre)` - Crear especialidad

### UsuarioGraphQLService
- `getUsuarios()` - Todos los usuarios
- `getUsuario(id)` - Usuario por ID
- `getMedicos()` - Solo médicos
- `getRoles()` - Todos los roles
- `asignarRol(usuarioId, rol)` - Asignar rol
- `asignarEspecialidades(usuarioId, especialidadIds)` - Asignar especialidades

---

## ⚠️ Notas Importantes

### 1. **Componentes Standalone**
Todos los componentes deben incluir:
```typescript
imports: [CommonModule, HttpClientModule, GraphQLModule, ...]
```

### 2. **IDs como String**
GraphQL usa IDs como strings, no numbers:
```typescript
// ❌ ANTES (REST)
const usuarioId = 1;

// ✅ AHORA (GraphQL)
const usuarioId = localStorage.getItem('usuarioId')!;
// o
const usuarioId = '1';
```

### 3. **Emails Automáticos**
Al crear citas o diagnósticos, los emails se envían automáticamente desde el backend. No necesitas hacer nada adicional.

### 4. **Manejo de Errores**
```typescript
.subscribe({
  next: (data) => { /* éxito */ },
  error: (error) => {
    console.error('Error:', error);
    Swal.fire('Error', error.message || 'Ocurrió un error', 'error');
  }
});
```

### 5. **Token JWT**
El token se incluye automáticamente en todas las peticiones GraphQL gracias a la configuración en `graphql.module.ts`.

---

## 🚀 Pasos de Implementación

### 1. **Instalar Dependencias** (Ya hecho)
```bash
npm install apollo-angular@7.0.2 @apollo/client@3.11.0 graphql@16.9.0
```

### 2. **Migrar Componentes Uno por Uno**
Empieza con los más críticos:
1. ✅ Login (Ya migrado)
2. ✅ Register (Ya migrado)
3. Citas Usuario
4. Citas Médico
5. Crear Diagnóstico
6. Ver Diagnósticos
7. Especialidades
8. Médicos
9. User List
10. Perfil

### 3. **Probar Cada Componente**
Después de migrar cada componente:
- Abre la consola del navegador (F12)
- Verifica que veas logs como: `✅ [Operación] exitosa`
- Verifica que no haya errores de CORS
- Verifica que los datos se muestren correctamente

### 4. **Eliminar Servicios REST Antiguos**
Una vez que todos los componentes estén migrados, puedes eliminar:
- `api.service.ts`
- `user.service.ts`
- `diagnostico.service.ts`
- `triaje.service.ts`
- etc.

---

## ✅ Checklist de Migración

- [x] Login Component
- [x] Register Component
- [ ] Citas Usuario Component
- [ ] Citas Médico Component
- [ ] Crear Diagnóstico Component
- [ ] Diagnósticos Component
- [ ] Especialidades Component
- [ ] Médicos Component
- [ ] User List Component
- [ ] Perfil Component
- [ ] Crear Triaje Component (opcional)
- [ ] Lista Triajes Component (opcional)
- [ ] Asignar Horario Component (opcional)

---

## 🎉 Beneficios de GraphQL

1. **Sin problemas de CORS** - Configuración centralizada
2. **Consultas eficientes** - Solo los datos necesarios
3. **Tipado fuerte** - TypeScript + GraphQL
4. **Emails automáticos** - Backend maneja notificaciones
5. **Mejor manejo de errores** - Mensajes claros
6. **Código más limpio** - Menos boilerplate

---

## 📞 Soporte

Si tienes dudas sobre alguna migración específica, revisa:
1. Los ejemplos en este documento
2. Los servicios GraphQL en `src/app/core/services/graphql/`
3. Las operaciones en `src/app/core/graphql/operations/`
4. La documentación en `MIGRACION_GRAPHQL.md`

---

**¡Listo para migrar! 🚀**
