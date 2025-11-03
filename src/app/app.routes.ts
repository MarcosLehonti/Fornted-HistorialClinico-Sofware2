
// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistroComponent } from './components/register/register.component';
import { MenuComponent } from './components/menu/menu.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { EspecialidadesComponent } from './components/especialidades/especialidades.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { MedicosComponent } from './components/medicos/medicos.component';
import { CrearHorarioComponent } from './components/crear-horario/crear-horario.component';
import { AsignarHorarioComponent } from './components/asignar-horario/asignar-horario.component';
import { EspecialidadesHorariosComponent } from './components/especialidades-horarios/especialidades-horarios.component';
import { AsignarComponent } from './components/asignar/asignar.component';
import { EspecialidadesUsuariosComponent } from './components/especialidades-usuarios/especialidades-usuarios.component';
import { CitasUsuarioComponent } from './components/citas-usuario/citas-usuario.component';
import { CitasMedicoComponent } from './components/citas-medico/citas-medico.component';
import { CrearTriajeComponent } from './components/crear-triaje/crear-triaje.component';
import { ListarTriajesComponent } from './components/lista-triajes/lista-triajes.component';
import { CrearAntecedenteComponent } from './components/crear-antecedente/crear-antecedente.component';
import { VerAntecedentesComponent } from './components/ver-antecedentes/ver-antecedentes.component';
import { ListaTriajesPorPacienteComponent } from './components/lista-triajes-por-paciente/lista-triajes-por-paciente.component';
import { CrearDiagnosticoComponent } from './components/crear-diagnostico/crear-diagnostico.component';
import { DiagnosticosComponent } from './components/diagnosticos/diagnosticos.component';
import { PacienteDetalleComponent } from './components/paciente-detalle/paciente-detalle.component';
import { AdminBitacoraComponent } from './admin-bitacora/admin-bitacora.component';
import { BienvenidaComponent } from './bienvenida/bienvenida.component';
import { UsuariosListaComponent } from './usuarios-lista/usuarios-lista.component';



export const routes: Routes = [
  { path: 'bienvenida', component: BienvenidaComponent},

  { path: 'registro', component: RegistroComponent },
  { path: 'login', component: LoginComponent },
  { path: 'menu', component: MenuComponent, canActivate: [AuthGuard] },
  { path: 'perfil', component: PerfilComponent, canActivate: [AuthGuard] },
  { path: 'especialidades', component: EspecialidadesComponent },
  { path: 'usuarios', component: UserListComponent },
  { path: 'medicos', component: MedicosComponent },// Ruta para el componente Medicos
  { path: 'crear-horario', component: CrearHorarioComponent },
  { path:'asignar-horario',component:AsignarHorarioComponent},
  { path: 'especialidades-horarios', component: EspecialidadesHorariosComponent },
  { path: 'asignar', component: AsignarComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'verespecialidad', component: EspecialidadesUsuariosComponent},
  { path: 'citasusuario', component: CitasUsuarioComponent },
  { path: 'citasmedico', component: CitasMedicoComponent },
  { path: 'creartriaje', component: CrearTriajeComponent },
  { path: 'vertriajes', component: ListarTriajesComponent },
  { path: 'crearantecedente', component: CrearAntecedenteComponent },
  { path: 'verantecedentes', component: VerAntecedentesComponent },
  { path: 'vermitriaje', component: ListaTriajesPorPacienteComponent },
  { path: 'creardiagnostico', component: CrearDiagnosticoComponent},
  { path: 'vermisdiagnosticos', component: DiagnosticosComponent},
  { path: 'vermihistorialclinico', component: PacienteDetalleComponent},
  { path: 'bitacora', component: AdminBitacoraComponent},
  { path: 'verhistoriasclinicas', component: UsuariosListaComponent},
  
  // // Redirección a /login por defecto si no se encuentra la ruta
  // { path: '', redirectTo: '/login', pathMatch: 'full' },
  
  // // Redirección en caso de rutas no encontradas
  // { path: '**', redirectTo: '/login' },
];





@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
