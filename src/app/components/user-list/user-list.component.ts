// // src/app/usuarios/user-list.component.ts
// import { Component, OnInit } from '@angular/core';
// import { UsuarioService } from '../services/user.service';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { MenuComponent } from '../components/menu/menu.component';
// @Component({
//   selector: 'app-user-list',
//   standalone: true,
//   imports: [CommonModule, FormsModule,MenuComponent],
//   templateUrl: './user-list.component.html',
//   styleUrls: ['./user-list.component.css']
// })
// export class UserListComponent implements OnInit {
//   usuarios: any[] = [];
//   roles: any[] = [];
//   selectedUser: any = null;
//   selectedRole: string = '';

//   constructor(private usuarioService: UsuarioService) {}

//   ngOnInit(): void {
//     this.obtenerUsuarios();
//     this.obtenerRoles();
//   }

//   obtenerUsuarios(): void {
//     this.usuarioService.obtenerUsuarios().subscribe(data => {
//       this.usuarios = data.usuarios; // Extrae el array de usuarios desde el objeto
//     });
//   }
  
//   obtenerRoles(): void {
//     this.usuarioService.obtenerRoles().subscribe(data => {
//       this.roles = data; // Esto ya es correcto, ya que la API de roles devuelve un array directamente
//     });
//   }
  

//   seleccionarUsuario(usuario: any): void {
//     this.selectedUser = usuario;
//   }

//   asignarRol(): void {
//     if (this.selectedUser && this.selectedRole) {
//       this.usuarioService.asignarRol(this.selectedUser.id, this.selectedRole).subscribe(() => {
//         alert(`Rol ${this.selectedRole} asignado a ${this.selectedUser.username}`);
//         this.obtenerUsuarios(); // Recargar la lista para ver los cambios
//         this.selectedUser = null;
//         this.selectedRole = '';
//       });
//     }
//   }
// }


// src/app/usuarios/user-list.component.ts
import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuComponent } from '../menu/menu.component';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, FormsModule,MenuComponent],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  usuarios: any[] = [];
  roles: any[] = [];
  selectedUser: any = null;
  selectedRole: string = '';

  constructor(private usuarioService: UsuarioService, private router: Router) {}

  ngOnInit(): void {
    this.obtenerUsuarios();
    this.obtenerRoles();
  }

  obtenerUsuarios(): void {
    this.usuarioService.obtenerUsuarios().subscribe(data => {
      this.usuarios = data.usuarios;
    });
  }

  obtenerRoles(): void {
    this.usuarioService.obtenerRoles().subscribe(data => {
      this.roles = data;
    });
  }

  seleccionarUsuario(usuario: any): void {
    this.selectedUser = usuario;
  }

  // asignarRol(): void {
  //   if (this.selectedUser && this.selectedRole) {
  //     this.usuarioService.asignarRol(this.selectedUser.id, this.selectedRole).subscribe(() => {
  //       alert(`Rol ${this.selectedRole} asignado a ${this.selectedUser.username}`);
  //       if (this.selectedRole === 'ROLE_MEDICO') {
  //         // Redirige al componente para asignar especialidades, pasando el ID del usuario como parámetro
  //         this.router.navigate(['/asignar-especialidades', this.selectedUser.id]);
  //       }
  //       this.obtenerUsuarios();
  //       this.selectedUser = null;
  //       this.selectedRole = '';
  //     });
  //   }
  // }


  asignarRol(): void {
    if (this.selectedUser && this.selectedRole) {
        this.usuarioService.asignarRol(this.selectedUser.id, this.selectedRole).subscribe({
            next: (response) => {
                // Aquí se manejan las respuestas exitosas
                Swal.fire({
                    icon: 'success',
                    title: 'Éxito',
                    text: "Rol Asignado Correctamente" // Usar la respuesta del servidor
                });
                
                if (this.selectedRole === 'ROLE_MEDICO') {
                    this.router.navigate(['/asignar-especialidades', this.selectedUser.id]);
                }
                this.obtenerUsuarios();
                this.selectedUser = null;
                this.selectedRole = '';
            },
            error: (err) => {
                console.error(err); // Agrega esta línea para depurar
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: err.error || 'No se pudo asignar el rol' // Manejo del mensaje de error
                });
            }
        });
    }
}

  
}
