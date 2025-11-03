import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  
  /**
   * Verifica si estamos en el navegador
   */
  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }

  /**
   * Obtiene un item del localStorage
   */
  getItem(key: string): string | null {
    if (!this.isBrowser()) {
      return null;
    }
    return localStorage.getItem(key);
  }

  /**
   * Guarda un item en el localStorage
   */
  setItem(key: string, value: string): void {
    if (!this.isBrowser()) {
      return;
    }
    localStorage.setItem(key, value);
  }

  /**
   * Elimina un item del localStorage
   */
  removeItem(key: string): void {
    if (!this.isBrowser()) {
      return;
    }
    localStorage.removeItem(key);
  }

  /**
   * Limpia todo el localStorage
   */
  clear(): void {
    if (!this.isBrowser()) {
      return;
    }
    localStorage.clear();
  }
}
