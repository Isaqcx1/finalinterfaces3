import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../servicios/auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-usuario-cursos',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './usuario-cursos.html',
  styleUrls: ['./usuario-cursos.css']
})
export class UsuarioCursosComponent implements OnInit {

  api = 'http://localhost:3000/api';

  categoriaSeleccionada: string | null = null;

  categorias = ['Tecnología', 'Idiomas', 'Negocios', 'Desarrollo Personal'];

  cursos: any[] = [];

  constructor(
    private http: HttpClient,
    public auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe(params => {
      this.categoriaSeleccionada = params['categoria'] || null;
    });
  }

  ngOnInit(): void {
    this.cargarCursos();
  }

  cargarCursos() {
    this.http.get<any[]>(`${this.api}/cursos`)
      .subscribe(data => {
        // Solo cursos activos
        this.cursos = data.filter(c => c.estado === 'activo');
      });
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  seleccionarCategoria(cat: string) {
    this.categoriaSeleccionada = cat;
  }

  get cursosFiltrados() {
    if (!this.categoriaSeleccionada) return this.cursos;
    return this.cursos.filter(c => c.categoria === this.categoriaSeleccionada);
  }

  inscribirse(curso: any) {
  const usuario = this.auth.getUsuarioActual();

  if (!usuario) {
    alert('No hay sesión activa');
    return;
  }

  const body = {
    idUsuario: usuario.id,
    nombreCurso: curso.nombre,
    duracion: curso.duracion,
    descripcion: curso.descripcion || 'Sin descripción'
  };

  this.http.post(`${this.api}/inscripciones`, body)
    .subscribe({
      next: () => {
        alert('✅ Te inscribiste correctamente.');
      },
      error: () => {
        alert('⚠️ Ya estás inscrito en este curso.');
      }
    });
}

}
