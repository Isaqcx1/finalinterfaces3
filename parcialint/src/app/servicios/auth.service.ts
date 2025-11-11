
import { Injectable } from '@angular/core';

export type Role = 'user' | 'admin';

export interface Usuario {
  nombre: string;
  password: string;
  role: Role;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private key = 'usuarios';
  private sessionKey = 'usuario_actual';

  constructor() {
    
    const s = localStorage.getItem(this.key);
    if (!s) {
      const admins: Usuario[] = [
        { nombre: 'Isaac', password: '123', role: 'admin' },
        
      ];
      localStorage.setItem(this.key, JSON.stringify(admins));
    }
  }

  private obtenerUsuarios(): Usuario[] {
    const raw = localStorage.getItem(this.key);
    return raw ? JSON.parse(raw) : [];
  }

  registrarUsuario(usuario: Usuario): boolean {
    const usuarios = this.obtenerUsuarios();
    const existe = usuarios.find(u => u.nombre.toLowerCase() === usuario.nombre.toLowerCase());
    if (existe) return false;
    usuarios.push(usuario);
    localStorage.setItem(this.key, JSON.stringify(usuarios));
    return true;
  }

  login(nombre: string, password: string): Usuario | null {
  const usuarios = this.obtenerUsuarios();
  const u = usuarios.find(x => x.nombre === nombre && x.password === password);
  if (!u) return null;
  localStorage.setItem(this.sessionKey, JSON.stringify(u));
  return u; 
}


  logout() {
    localStorage.removeItem(this.sessionKey);
  }

  getUsuarioActual(): Usuario | null {
    const raw = localStorage.getItem(this.sessionKey);
    return raw ? JSON.parse(raw) : null;
  }

  isLoggedIn(): boolean {
    return !!this.getUsuarioActual();
  }

  isAdmin(): boolean {
    const u = this.getUsuarioActual();
    return !!u && u.role === 'admin';
  }
}
