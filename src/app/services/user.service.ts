

// // src/app/services/usuario.service.ts
// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class UsuarioService {
//   private apiUrl = 'http://localhost:8080/api/usuarios'; // Ajusta si es necesario
//   private rolesUrl = 'http://localhost:8080/api/roles'; // Endpoint para roles

//   constructor(private http: HttpClient) {}

//   registrarUsuario(usuario: any): Observable<any> {
//     return this.http.post(`${this.apiUrl}/registro`, usuario);
//   }

//   login(credentials: any): Observable<any> {
//     return this.http.post(`${this.apiUrl}/login`, credentials);
//   }

//   obtenerPerfil(): Observable<any> {
//     const headers = new HttpHeaders({
//       'Authorization': `Bearer ${localStorage.getItem('token')}`
//     });
//     return this.http.get(`${this.apiUrl}/perfil`, { headers });
//   }

//   actualizarPerfil(usuario: any): Observable<any> {
//     const headers = new HttpHeaders({
//       'Authorization': `Bearer ${localStorage.getItem('token')}`
//     });
//     return this.http.put(`${this.apiUrl}/perfil`, usuario, { headers });
//   }

//   obtenerUsuarios(): Observable<any> {
//     return this.http.get(`${this.apiUrl}`, {
//       headers: new HttpHeaders({
//         'Authorization': `Bearer ${localStorage.getItem('token')}`
//       })
//     });
//   }

//   obtenerRoles(): Observable<any> {
//     const headers = new HttpHeaders({
//       'Authorization': `Bearer ${localStorage.getItem('token')}`
//     });
//     return this.http.get(`${this.rolesUrl}`, { headers });
//   }

//   asignarRol(usuarioId: number, nombreRol: string): Observable<any> {
//     const headers = new HttpHeaders({
//       'Authorization': `Bearer ${localStorage.getItem('token')}`
//     });
//     return this.http.post(`${this.apiUrl}/${usuarioId}/roles`, { rol: nombreRol }, { headers });
//   }

//   obtenerEspecialidades(): Observable<any[]> {
//     return this.http.get<any[]>('http://localhost:8080/api/especialidades');
//   }

//   obtenerEspecialidadesMedico(medicoId: number): Observable<any[]> {
//     return this.http.get<any[]>(`${this.apiUrl}/${medicoId}/especialidades`);
//   }

//   asignarEspecialidad(medicoId: number, especialidadId: number): Observable<any> {
//     return this.http.put(`${this.apiUrl}/${medicoId}/asignar-especialidad/${especialidadId}`, {});
//   }

//   // **Nuevo método**: Obtener los horarios disponibles para una especialidad específica
//   obtenerHorariosPorEspecialidad(especialidadId: number): Observable<any[]> {
//     return this.http.get<any[]>(`http://localhost:8080/api/especialidades/${especialidadId}/horarios`);
//   }

//   // **Nuevo método**: Asignar horarios seleccionados a un médico
//   asignarHorariosAlMedico(horariosAsignados: { [key: number]: number[] }): Observable<any> {
//     const headers = new HttpHeaders({
//       'Authorization': `Bearer ${localStorage.getItem('token')}`
//     });
//     return this.http.post(`${this.apiUrl}/asignar-horarios`, horariosAsignados, { headers });
//   }

//   // // src/app/services/usuario.service.ts
//   // obtenerEspecialidadesPorMedico(medicoId: number): Observable<any[]> {
//   //   return this.http.get<any[]>(`${this.apiUrl}/${medicoId}/especialidades`);
//   // }

//   obtenerEspecialidadesPorMedico(medicoId: number): Observable<any[]> {
//     const headers = new HttpHeaders({
//         'Authorization': `Bearer ${localStorage.getItem('token')}` // Asegúrate de que el token esté aquí
//     });
//     return this.http.get<any[]>(`${this.apiUrl}/${medicoId}/especialidades`, { headers });
// }

// }



// src/app/services/usuario.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  //https://backend-historialclinico-2.onrender.com
  // private apiUrl = 'https://backend-historialclinico-2.onrender.com/api/usuarios'; // Ajusta si es necesario
  // private rolesUrl = 'https://backend-historialclinico-2.onrender.com/api/roles'; // Endpoint para roles
  // private triajeUrl = 'https://backend-historialclinico-2.onrender.com/api/triajes'; // Endpoint específico para triaje

    private apiUrl = 'http://localhost:8080/api/usuarios'; // Ajusta si es necesario
  private rolesUrl = 'http://localhost:8080/api/roles'; // Endpoint para roles
  private triajeUrl = 'http://localhost:8080/api/triajes'; // Endpoint específico para triaje



  constructor(private http: HttpClient) {}

  registrarUsuario(usuario: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/registro`, usuario);
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }

  obtenerPerfil(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.get(`${this.apiUrl}/perfil`, { headers });
  }

  actualizarPerfil(usuario: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.put(`${this.apiUrl}/perfil`, usuario, { headers });
  }

  obtenerUsuarios(): Observable<any> {
    return this.http.get(`${this.apiUrl}`, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    });
  }

  obtenerRoles(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.get(`${this.rolesUrl}`, { headers });
  }

  asignarRol(usuarioId: number, nombreRol: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.post(`${this.apiUrl}/${usuarioId}/roles`, { rol: nombreRol }, { headers });
  }

  // Método para obtener todas las especialidades
  obtenerEspecialidades(): Observable<any[]> {
    // return this.http.get<any[]>('https://backend-historialclinico-2.onrender.com/api/especialidades');
    return this.http.get<any[]>('http://localhost:8080/api/especialidades');

  }

  // Método para obtener especialidades del médico logueado
  obtenerEspecialidadesDelMedico(): Observable<any[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.get<any[]>(`${this.apiUrl}/especialidades`, { headers });
  }

  obtenerEspecialidadesMedico(medicoId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${medicoId}/especialidades`);
  }

  asignarEspecialidad(medicoId: number, especialidadId: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/${medicoId}/asignar-especialidad/${especialidadId}`, {});
  }

  // Obtener los horarios disponibles para una especialidad específica
  obtenerHorariosPorEspecialidad(especialidadId: number): Observable<any[]> {
    
    // return this.http.get<any[]>(`https://backend-historialclinico-2.onrender.com/api/especialidades/${especialidadId}/horarios`);
    return this.http.get<any[]>(`http://localhost:8080/api/especialidades/${especialidadId}/horarios`);

  }

  // Asignar horarios seleccionados a un médico
  asignarHorariosAlMedico(horariosAsignados: { [key: number]: number[] }): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.post(`${this.apiUrl}/asignar-horarios`, horariosAsignados, { headers });
  }

  obtenerEspecialidadesPorMedico(medicoId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${medicoId}/especialidades`);
  }


  //PARA CREAR UN TRIAJE
  crearTriaje(triajeData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
    });
    return this.http.post(`${this.triajeUrl}/crear`, triajeData, { headers });
  }

  
    // src/app/services/user.service.ts
  obtenerTriajes(): Observable<any[]> {
    // return this.http.get<any[]>('https://backend-historialclinico-2.onrender.com/api/triajes/todos');
    return this.http.get<any[]>('http://localhost:8080/api/triajes/todos');

  }


  // src/app/services/user.service.ts

  // Obtener antecedentes por ID del usuario
  obtenerAntecedentesPorUsuarioId(usuarioId: number): Observable<any[]> {
    //return this.http.get<any[]>(`https://backend-historialclinico-2.onrender.com/api/antecedentes/usuario/${usuarioId}`);
    return this.http.get<any[]>(`http://localhost:8080/api/antecedentes/usuario/${usuarioId}`);

  }

  // Obtener antecedentes por ID del paciente
  obtenerAntecedentesPorPacienteId(pacienteId: number): Observable<any[]> {
    //return this.http.get<any[]>(`https://backend-historialclinico-2.onrender.com/api/antecedentes/paciente/${pacienteId}`);
    return this.http.get<any[]>(`http://localhost:8080/api/antecedentes/paciente/${pacienteId}`);

  }


}

