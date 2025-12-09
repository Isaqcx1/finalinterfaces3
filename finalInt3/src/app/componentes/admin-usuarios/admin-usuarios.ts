import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../servicios/auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin-usuarios',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './admin-usuarios.html',
  styleUrls: ['./admin-usuarios.css']
})
export class AdminUsuariosComponent implements OnInit {

  api = "http://localhost:3000/api";

  usuarios: any[] = [];
  cursosUsuario: any[] = [];
  usuarioSeleccionado: any = null;

  constructor(
    private http: HttpClient,
    public auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  // 📌 1. OBTENER USUARIOS REALES DEL BACKEND
  cargarUsuarios() {
    this.http.get<any[]>(`${this.api}/usuarios`)
      .subscribe(data => {
        this.usuarios = data.filter(u => u.role !== "admin"); // ocultar admin
      });
  }

  // 📌 2. VER CURSOS INSCRITOS DE UN USUARIO
  verDetalle(usuario: any) {
    this.usuarioSeleccionado = usuario;

    this.http.get<any[]>(`${this.api}/inscripciones/${usuario.id}`)
      .subscribe(data => {
        this.cursosUsuario = data;
      });
  }

  cerrarDetalle() {
    this.usuarioSeleccionado = null;
    this.cursosUsuario = [];
  }

  // 📌 3. ELIMINAR UN CURSO DE UN USUARIO
  eliminarCursoUsuario(curso: any) {
    if (!confirm(`¿Eliminar el curso "${curso.nombreCurso}"?`)) return;

    this.http.delete(`${this.api}/inscripciones/${this.usuarioSeleccionado.id}/${curso.nombreCurso}`)
      .subscribe(() => {
        this.cursosUsuario = this.cursosUsuario.filter(
          c => c.nombreCurso !== curso.nombreCurso
        );
      });
  }

  // 📌 4. ELIMINAR USUARIO COMPLETO (próximo paso en backend)
  eliminarUsuario(usuario: any) {
  if (!confirm(`¿Eliminar al usuario "${usuario.nombre}" y todos sus cursos?`)) {
    return;
  }

  this.http.delete(`${this.api}/usuarios/${usuario.id}`)
    .subscribe({
      next: () => {
        alert("✅ Usuario eliminado correctamente");

        // Quitar de la tabla
        this.usuarios = this.usuarios.filter(u => u.id !== usuario.id);

        // Si estaba viendo su detalle, cerrarlo
        if (this.usuarioSeleccionado?.id === usuario.id) {
          this.cerrarDetalle();
        }
      },
      error: () => {
        alert("❌ No se pudo eliminar el usuario");
      }
    });
}


  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
