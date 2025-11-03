# 📊 Estado de Migración REST → GraphQL

## ✅ Componentes Migrados (COMPLETADOS)

### 1. **Login Component** ✅
- **Archivo:** `components/login/login.component.ts`
- **Estado:** Migrado y funcionando
- **Servicio:** `AuthGraphQLService`
- **Cambios:**
  - Usa email en lugar de username
  - GraphQL mutation `login`
  - Guarda token, usuarioId, rol, email en localStorage
  - Redirección según rol

### 2. **Register Component** ✅
- **Archivo:** `components/register/register.component.ts`
- **Estado:** Migrado y funcionando
- **Servicio:** `AuthGraphQLService`
- **Cambios:**
  - GraphQL mutation `registro`
  - Redirección automática al login
  - Validación mejorada

### 3. **Citas Usuario Component** ✅
- **Archivo:** `components/citas-usuario/citas-usuario.component.ts`
- **Estado:** Migrado y funcionando
- **Servicio:** `CitaGraphQLService`
- **Cambios:**
  - GraphQL query `citasPorUsuario`
  - Loading state
  - Mejor manejo de errores

### 4. **Citas Médico Component** ✅
- **Archivo:** `components/citas-medico/citas-medico.component.ts`
- **Estado:** Migrado y funcionando
- **Servicio:** `CitaGraphQLService`
- **Cambios:**
  - GraphQL query `citasPorMedico`
  - Loading state
  - Mejor manejo de errores

---

## 🔄 Componentes Pendientes de Migración

### 5. **Crear Diagnóstico Component** 🔄
- **Archivo:** `components/crear-diagnostico/crear-diagnostico.component.ts`
- **Servicio a usar:** `DiagnosticoGraphQLService`
- **Operación:** `crearDiagnostico` mutation
- **Beneficio:** Email automático al paciente

**Código de ejemplo:**
```typescript
import { DiagnosticoGraphQLService } from '../../core/services/graphql/diagnostico-graphql.service';
import { HttpClientModule } from '@angular/common/http';
import { GraphQLModule } from '../../core/graphql/graphql.module';

@Component({
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule, GraphQLModule, ...]
})
export class CrearDiagnosticoComponent {
  constructor(private diagnosticoService: DiagnosticoGraphQLService) {}
  
  crearDiagnostico() {
    this.diagnosticoService.crearDiagnostico({
      pacienteId: this.pacienteId,
      medicoId: localStorage.getItem('usuarioId')!,
      especialidadId: this.especialidadId,
      descripcion: this.descripcion,
      tratamiento: this.tratamiento
    }).subscribe({
      next: (diagnostico) => {
        console.log('✅ Diagnóstico creado (email enviado):', diagnostico);
        Swal.fire('Éxito', 'Diagnóstico creado', 'success');
      }
    });
  }
}
```

---

### 6. **Diagnósticos Component** 🔄
- **Archivo:** `components/diagnosticos/diagnosticos.component.ts`
- **Servicio a usar:** `DiagnosticoGraphQLService`
- **Operación:** `diagnosticosPorPaciente` query

**Código de ejemplo:**
```typescript
import { DiagnosticoGraphQLService } from '../../core/services/graphql/diagnostico-graphql.service';

obtenerDiagnosticos() {
  const pacienteId = localStorage.getItem('usuarioId')!;
  this.diagnosticoService.getDiagnosticosPorPaciente(pacienteId).subscribe({
    next: (diagnosticos) => {
      this.diagnosticos = diagnosticos;
      console.log('✅ Diagnósticos obtenidos:', diagnosticos);
    }
  });
}
```

---

### 7. **Especialidades Component** 🔄
- **Archivo:** `components/especialidades/especialidades.component.ts`
- **Servicio a usar:** `EspecialidadGraphQLService`
- **Operaciones:** `especialidades` query, `crearEspecialidad` mutation

**Código de ejemplo:**
```typescript
import { EspecialidadGraphQLService } from '../../core/services/graphql/especialidad-graphql.service';

obtenerEspecialidades() {
  this.especialidadService.getEspecialidades().subscribe({
    next: (especialidades) => {
      this.especialidades = especialidades;
    }
  });
}

crearEspecialidad(nombre: string) {
  this.especialidadService.crearEspecialidad(nombre).subscribe({
    next: (especialidad) => {
      console.log('✅ Especialidad creada:', especialidad);
      this.obtenerEspecialidades();
    }
  });
}
```

---

### 8. **Médicos Component** 🔄
- **Archivo:** `components/medicos/medicos.component.ts`
- **Servicios a usar:** `UsuarioGraphQLService`, `EspecialidadGraphQLService`
- **Operaciones:** `medicos` query, `asignarEspecialidades` mutation

**Código de ejemplo:**
```typescript
import { UsuarioGraphQLService } from '../../core/services/graphql/usuario-graphql.service';
import { EspecialidadGraphQLService } from '../../core/services/graphql/especialidad-graphql.service';

obtenerMedicos() {
  this.usuarioService.getMedicos().subscribe({
    next: (medicos) => {
      this.medicos = medicos;
    }
  });
}

asignarEspecialidades() {
  this.usuarioService.asignarEspecialidades(
    this.medicoSeleccionado.id,
    this.especialidadesSeleccionadas
  ).subscribe({
    next: (success) => {
      if (success) {
        Swal.fire('Éxito', 'Especialidades asignadas', 'success');
      }
    }
  });
}
```

---

### 9. **User List Component** 🔄
- **Archivo:** `components/user-list/user-list.component.ts`
- **Servicio a usar:** `UsuarioGraphQLService`
- **Operaciones:** `usuarios` query, `roles` query, `asignarRol` mutation

**Código de ejemplo:**
```typescript
import { UsuarioGraphQLService } from '../../core/services/graphql/usuario-graphql.service';

obtenerUsuarios() {
  this.usuarioService.getUsuarios().subscribe({
    next: (usuarios) => {
      this.usuarios = usuarios;
    }
  });
}

asignarRol(usuarioId: string, rol: string) {
  this.usuarioService.asignarRol(usuarioId, rol).subscribe({
    next: (success) => {
      if (success) {
        Swal.fire('Éxito', 'Rol asignado', 'success');
        this.obtenerUsuarios();
      }
    }
  });
}
```

---

### 10. **Perfil Component** 🔄
- **Archivo:** `components/perfil/perfil.component.ts`
- **Servicio a usar:** `AuthGraphQLService`
- **Operación:** `perfil` query

**Código de ejemplo:**
```typescript
import { AuthGraphQLService } from '../../core/services/graphql/auth-graphql.service';

obtenerPerfil() {
  this.authService.getPerfil().subscribe({
    next: (usuario) => {
      this.usuario = usuario;
      console.log('✅ Perfil obtenido:', usuario);
    },
    error: (error) => {
      if (error.message.includes('Unauthorized')) {
        localStorage.clear();
        this.router.navigate(['/login']);
      }
    }
  });
}
```

---

## 📦 Servicios GraphQL Disponibles

### ✅ AuthGraphQLService
```typescript
- login(email, password): Observable<LoginResponse>
- registro(username, email, password): Observable<Usuario>
- getPerfil(): Observable<Usuario>
```

### ✅ CitaGraphQLService
```typescript
- getCitasPorUsuario(usuarioId): Observable<Cita[]>
- getCitasPorMedico(medicoId): Observable<Cita[]>
- crearCita(input): Observable<Cita>
```

### ✅ DiagnosticoGraphQLService
```typescript
- getDiagnosticosPorPaciente(pacienteId): Observable<Diagnostico[]>
- crearDiagnostico(input): Observable<Diagnostico>
```

### ✅ EspecialidadGraphQLService
```typescript
- getEspecialidades(): Observable<Especialidad[]>
- getEspecialidadesPorUsuario(usuarioId): Observable<Especialidad[]>
- crearEspecialidad(nombre): Observable<Especialidad>
```

### ✅ UsuarioGraphQLService
```typescript
- getUsuarios(): Observable<Usuario[]>
- getUsuario(id): Observable<Usuario>
- getMedicos(): Observable<Usuario[]>
- getRoles(): Observable<Rol[]>
- asignarRol(usuarioId, rol): Observable<boolean>
- asignarEspecialidades(usuarioId, especialidadIds): Observable<boolean>
```

---

## 🎯 Patrón de Migración

Para migrar cualquier componente, sigue estos pasos:

### 1. Actualizar Imports
```typescript
import { HttpClientModule } from '@angular/common/http';
import { GraphQLModule } from '../../core/graphql/graphql.module';
import { [Servicio]GraphQLService } from '../../core/services/graphql/[servicio]-graphql.service';
```

### 2. Actualizar @Component
```typescript
@Component({
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule, // si usa formularios
    HttpClientModule,    // ← IMPORTANTE
    GraphQLModule,       // ← IMPORTANTE
    // ... otros imports
  ]
})
```

### 3. Inyectar Servicio
```typescript
constructor(
  private [servicio]Service: [Servicio]GraphQLService
) {}
```

### 4. Usar el Servicio
```typescript
this.[servicio]Service.metodo(params).subscribe({
  next: (data) => {
    console.log('✅ Éxito:', data);
    // procesar datos
  },
  error: (error) => {
    console.error('❌ Error:', error);
    // manejar error
  }
});
```

---

## 📊 Progreso General

```
Componentes Migrados: 4/22 (18%)
█████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░

Componentes Críticos Migrados: 4/10 (40%)
████████████░░░░░░░░░░░░░░░░░░░░░░

Servicios GraphQL Creados: 5/5 (100%)
██████████████████████████████████
```

---

## 🚀 Próximos Pasos

### Prioridad Alta
1. ✅ Login Component (COMPLETADO)
2. ✅ Register Component (COMPLETADO)
3. ✅ Citas Usuario Component (COMPLETADO)
4. ✅ Citas Médico Component (COMPLETADO)
5. 🔄 Crear Diagnóstico Component
6. 🔄 Diagnósticos Component

### Prioridad Media
7. 🔄 Especialidades Component
8. 🔄 Médicos Component
9. 🔄 User List Component
10. 🔄 Perfil Component

### Prioridad Baja (Opcionales)
- Crear Triaje Component
- Lista Triajes Component
- Asignar Horario Component
- Ver Antecedentes Component
- Crear Antecedente Component

---

## ✅ Checklist de Verificación

Después de migrar cada componente, verifica:

- [ ] El componente compila sin errores
- [ ] Los imports incluyen `HttpClientModule` y `GraphQLModule`
- [ ] El servicio GraphQL está inyectado correctamente
- [ ] Los métodos usan `.subscribe({ next, error })`
- [ ] Los IDs son strings (no numbers)
- [ ] Los logs muestran `✅` para éxito y `❌` para errores
- [ ] No hay errores de CORS en la consola
- [ ] Los datos se muestran correctamente en la UI

---

## 🎉 Beneficios Obtenidos

### Ya Implementados
- ✅ Sin problemas de CORS
- ✅ Autenticación JWT automática
- ✅ Mejor manejo de errores
- ✅ Loading states
- ✅ Logs descriptivos
- ✅ Emails automáticos (citas y diagnósticos)

### Por Implementar
- 🔄 Consultas más eficientes
- 🔄 Menos peticiones al servidor
- 🔄 Código más limpio y mantenible
- 🔄 Tipado fuerte con TypeScript

---

## 📚 Documentación

- **Guía Completa:** `GUIA_MIGRACION_COMPLETA.md`
- **Instalación:** `INSTALL.md`
- **Inicio Rápido:** `INICIO_RAPIDO.md`
- **Resumen de Cambios:** `RESUMEN_CAMBIOS_IMPLEMENTADOS.md`
- **README General:** `README_COMPLETO.md`

---

**Última actualización:** Noviembre 2, 2025
**Estado:** 🟢 En progreso - 4 componentes migrados exitosamente
