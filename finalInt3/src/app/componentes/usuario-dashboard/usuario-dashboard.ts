import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../servicios/auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-usuario-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './usuario-dashboard.html',
  styleUrls: ['./usuario-dashboard.css']
})
export class UsuarioDashboardComponent implements OnInit {

  api = 'http://localhost:3000/api';

  usuario: any = null;
  misCursos: any[] = [];

  constructor(
    private http: HttpClient,
    public auth: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.usuario = this.auth.getUsuarioActual();

    if (this.usuario?.id) {
      this.cargarMisCursos();
    }
  }

  cargarMisCursos() {
    this.http.get<any[]>(`${this.api}/inscripciones/${this.usuario.id}`)
      .subscribe(data => {
        this.misCursos = data;
      });
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  quitarCurso(curso: any) {
    const confirmar = confirm(`¿Quitar el curso "${curso.nombreCurso}"?`);
    if (!confirmar) return;

    this.http.delete(`${this.api}/inscripciones/${this.usuario.id}/${curso.nombreCurso}`)
      .subscribe({
        next: () => {
          alert("🚫 Curso eliminado correctamente");
          this.cargarMisCursos();
        },
        error: () => {
          alert("❌ No se pudo eliminar el curso");
        }
      });
  }


}
