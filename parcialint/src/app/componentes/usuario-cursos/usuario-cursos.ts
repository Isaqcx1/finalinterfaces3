import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../servicios/auth.service';

@Component({
  selector: 'app-usuario-cursos',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './usuario-cursos.html',
  styleUrls: ['./usuario-cursos.css']
})
export class UsuarioCursosComponent implements OnInit {

  categoriaSeleccionada: string | null = null;

  categorias = ['Tecnología', 'Idiomas', 'Negocios', 'Desarrollo Personal'];

  // ✅ AHORA LOS CURSOS VIENEN DEL ADMIN
  cursos: any[] = [];

  constructor(
    public auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe(params => {
      this.categoriaSeleccionada = params['categoria'] || null;
    });
  }

  ngOnInit(): void {
    // ✅ Traer solo cursos ACTIVOS creados por el admin
    const raw = localStorage.getItem('cursos_admin');
    const todos = raw ? JSON.parse(raw) : [];

    this.cursos = todos.filter((c: any) => c.estado === 'activo');
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

  // ✅ INSCRIPCIÓN POR USUARIO (CORRECTA)
  inscribirse(curso: any) {
    const usuario = this.auth.getUsuarioActual();

    if (!usuario) {
      alert('No hay sesión activa');
      return;
    }

    const key = `mis_cursos_${usuario.nombre}`;

    const raw = localStorage.getItem(key);
    const misCursos = raw ? JSON.parse(raw) : [];

    const yaExiste = misCursos.find((c: any) => c.nombre === curso.nombre);
    if (yaExiste) {
      alert('Ya estás inscrito en este curso.');
      return;
    }

    const cursoInscrito = {
      nombre: curso.nombre,
      duracion: curso.duracion,
      descripcion: curso.descripcion || 'Curso sin descripción',
      estado: 'En progreso',
      fecha: new Date().toISOString().split('T')[0]
    };

    misCursos.push(cursoInscrito);
    localStorage.setItem(key, JSON.stringify(misCursos));

    alert('✅ Te inscribiste correctamente.');
  }

}
