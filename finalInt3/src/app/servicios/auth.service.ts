import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

export type Role = 'usuario' | 'admin';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private api = 'http://localhost:3000/api';
  private tokenKey = 'token';

  constructor(private http: HttpClient, private router: Router) {}

  // ✅ LOGIN REAL CON JWT DESDE EL BACKEND
  login(nombre: string, password: string) {
    return this.http.post(`${this.api}/login`, { nombre, password });
  }

  // ✅ GUARDAR TOKEN
  guardarToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
  }

  // ✅ OBTENER TOKEN
  obtenerToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  // ✅ LOGOUT
  logout() {
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/login']);
  }

  // ✅ USUARIO LOGUEADO
  isLoggedIn(): boolean {
    return !!this.obtenerToken();
  }

  // ✅ OBTENER ROL DESDE EL TOKEN JWT
  getRole(): Role | null {
    const token = this.obtenerToken();
    if (!token) return null;

    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.role || null;
  }

  // ✅ ES ADMIN
  isAdmin(): boolean {
    return this.getRole() === 'admin';
  }

  // ✅ OBTENER USUARIO DESDE TOKEN
  getUsuarioActual(): any {
    const token = this.obtenerToken();
    if (!token) return null;

    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload;
  }
}
