import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../servicios/auth.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './admin-dashboard.html',
  styleUrls: ['./admin-dashboard.css']
})
export class AdminDashboardComponent implements OnInit {

  totalUsuarios = 0;
  totalCursos = 0;
  totalInscripciones = 0;

  constructor(
    public auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {

    // ✅ 1. USUARIOS (SIN CONTAR AL ADMIN)
    const todos = JSON.parse(localStorage.getItem('usuarios') || '[]');
    const soloUsuarios = todos.filter((u: any) => u.role === 'usuario');

    this.totalUsuarios = soloUsuarios.length;

    // ✅ 2. CURSOS CREADOS POR EL ADMIN
    const cursos = JSON.parse(localStorage.getItem('cursos_admin') || '[]');
    this.totalCursos = cursos.length;

    // ✅ 3. SUMA REAL DE INSCRIPCIONES (POR USUARIO)
    let suma = 0;

    for (const u of soloUsuarios) {
      const key = `mis_cursos_${u.nombre}`;
      const raw = localStorage.getItem(key);
      const misCursos = raw ? JSON.parse(raw) : [];
      suma += misCursos.length;
    }

    this.totalInscripciones = suma;
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
