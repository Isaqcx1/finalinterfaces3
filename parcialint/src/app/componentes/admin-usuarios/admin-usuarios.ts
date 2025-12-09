import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../servicios/auth.service';

@Component({
  selector: 'app-admin-usuarios',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './admin-usuarios.html',
  styleUrls: ['./admin-usuarios.css']
})
export class AdminUsuariosComponent implements OnInit {

  usuarios: any[] = [];
  cursosInscritosPorUsuario: any[] = [];
  usuarioSeleccionado: any = null;

  constructor(
    public auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const todos = JSON.parse(localStorage.getItem('usuarios') || '[]');

    // ✅ NO mostrar admin
    this.usuarios = todos.filter((u: any) => u.role !== 'admin');
  }

  // ✅ VER CURSOS DEL USUARIO
  verDetalle(usuario: any) {
    this.usuarioSeleccionado = usuario;

    const key = `mis_cursos_${usuario.nombre}`;
    const raw = localStorage.getItem(key);
    this.cursosInscritosPorUsuario = raw ? JSON.parse(raw) : [];
  }

  cerrarDetalle() {
    this.usuarioSeleccionado = null;
    this.cursosInscritosPorUsuario = [];
  }

  // ✅ ELIMINAR CURSO DEL USUARIO
  eliminarCursoUsuario(curso: any) {
    if (!confirm(`¿Eliminar el curso "${curso.nombre}" de este usuario?`)) return;

    const key = `mis_cursos_${this.usuarioSeleccionado.nombre}`;
    this.cursosInscritosPorUsuario = this.cursosInscritosPorUsuario.filter(
      c => c.nombre !== curso.nombre
    );

    localStorage.setItem(
      key,
      JSON.stringify(this.cursosInscritosPorUsuario)
    );
  }

  // ✅ ELIMINAR USUARIO COMPLETO + SUS CURSOS
  eliminarUsuario(usuario: any) {
    if (!confirm(`¿Eliminar al usuario "${usuario.nombre}" y TODOS sus cursos?`)) return;

    // 1. Eliminar del listado de usuarios
    this.usuarios = this.usuarios.filter(
      u => u.nombre !== usuario.nombre
    );

    // 2. Guardar usuarios actualizados
    const todos = JSON.parse(localStorage.getItem('usuarios') || '[]');
    const actualizados = todos.filter(
      (u: any) => u.nombre !== usuario.nombre
    );
    localStorage.setItem('usuarios', JSON.stringify(actualizados));

    // 3. Eliminar sus cursos
    const key = `mis_cursos_${usuario.nombre}`;
    localStorage.removeItem(key);

    // 4. Cerrar panel si estaba seleccionado
    if (this.usuarioSeleccionado?.nombre === usuario.nombre) {
      this.cerrarDetalle();
    }

    alert('✅ Usuario eliminado correctamente');
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
