import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../servicios/auth.service';

@Component({
  selector: 'app-usuario-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './usuario-dashboard.html',
  styleUrls: ['./usuario-dashboard.css']
})
export class UsuarioDashboardComponent implements OnInit {

  usuario: any = null;
  misCursos: any[] = [];
  private storageKey = '';   // ✅ CLAVE REAL DEL USUARIO

  constructor(
    public auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.usuario = this.auth.getUsuarioActual();

    if (this.usuario) {
      this.storageKey = `mis_cursos_${this.usuario.nombre}`;  // ✅ CLAVE CORRECTA
      const raw = localStorage.getItem(this.storageKey);
      this.misCursos = raw ? JSON.parse(raw) : [];
    }
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  // ✅ QUITAR CURSO DEFINITIVAMENTE DEL USUARIO REAL
  quitarCurso(curso: any) {
    if (!confirm(`¿Deseas eliminar el curso "${curso.nombre}"?`)) return;

    this.misCursos = this.misCursos.filter(
      c => c.nombre !== curso.nombre
    );

    // ✅ GUARDAR EN EL MISMO storageKey DEL USUARIO
    localStorage.setItem(this.storageKey, JSON.stringify(this.misCursos));

    alert('✅ Curso eliminado correctamente');
  }
}
