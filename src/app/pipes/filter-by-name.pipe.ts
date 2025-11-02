// src/app/pipes/filter-by-name.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByName',
  standalone: true
})
export class FilterByNamePipe implements PipeTransform {
  transform(usuarios: any[], searchTerm: string): any[] {
    if (!usuarios || !searchTerm) {
      return usuarios;
    }
    return usuarios.filter(usuario =>
      usuario.username.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
}
