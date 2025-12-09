import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../servicios/auth.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './admin-dashboard.html',
  styleUrls: ['./admin-dashboard.css']
})
export class AdminDashboardComponent implements OnInit {

  api = 'http://localhost:3000/api';

  totalUsuarios = 0;
  totalCursos = 0;
  totalInscripciones = 0;

  constructor(
    private http: HttpClient,
    public auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarUsuarios();
    this.cargarCursos();
    this.cargarInscripcionesTotales();
  }

  // ✅ USUARIOS REGISTRADOS (solo usuarios, no admin)
  cargarUsuarios() {
    this.http.get<any[]>(`${this.api}/usuarios`)
      .subscribe(usuarios => {
        const soloUsuarios = usuarios.filter(u => u.role === 'usuario');
        this.totalUsuarios = soloUsuarios.length;
      });
  }

  // ✅ CURSOS REGISTRADOS EN EL SISTEMA
  cargarCursos() {
    this.http.get<any[]>(`${this.api}/cursos`)
      .subscribe(cursos => {
        this.totalCursos = cursos.length;
      });
  }

  // ✅ SUMA REAL DE INSCRIPCIONES
  cargarInscripcionesTotales() {
    this.http.get<any[]>(`${this.api}/usuarios`).subscribe(usuarios => {
      const soloUsuarios = usuarios.filter(u => u.role === 'usuario');

      let total = 0;

      soloUsuarios.forEach(u => {
        this.http.get<any[]>(`${this.api}/inscripciones/${u.id}`)
          .subscribe(ins => {
            total += ins.length;
            this.totalInscripciones = total;
          });
      });
    });
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
