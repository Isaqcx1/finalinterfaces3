import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../servicios/auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin-cursos',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './admin-cursos.html',
  styleUrls: ['./admin-cursos.css']
})
export class AdminCursosComponent implements OnInit {

  api = 'http://localhost:3000/api';

  cursos: any[] = [];
  mostrarFormulario = false;
  editando = false;
  categoriaFiltro: string = 'Todas';

  cursoActual = {
    id: null,
    nombre: '',
    duracion: 0,
    precio: 0,
    descripcion: '',
    categoria: 'Tecnología',
    estado: 'activo'
  };

  categorias = ['Tecnología', 'Idiomas', 'Negocios', 'Desarrollo Personal'];

  constructor(
    private http: HttpClient,
    public auth: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.obtenerCursos();
  }

  obtenerCursos() {
  this.http.get<any[]>(`${this.api}/cursos`)
    .subscribe(data => {
      
      console.log("🔥 CURSOS RECIBIDOS DEL BACKEND:", data);

      // Forzar estructura limpia
      this.cursos = data.map(curso => ({
        id: curso.id ?? curso.idCurso ?? curso._id ?? null,  // 👈 si viene con otro nombre lo atrapamos
        nombre: curso.nombre,
        duracion: curso.duracion,
        precio: curso.precio,
        descripcion: curso.descripcion,
        categoria: curso.categoria,
        estado: curso.estado
      }));

      console.log("📌 CURSOS PROCESADOS PARA ANGULAR:", this.cursos);
    });
}




  get cursosFiltrados() {
    if (this.categoriaFiltro === 'Todas') return this.cursos;
    return this.cursos.filter(c => c.categoria === this.categoriaFiltro);
  }

  nuevoCurso() {
    this.editando = false;
    this.mostrarFormulario = true;
    this.limpiarFormulario();
  }

  editarCurso(curso: any) {
    this.editando = true;
    this.mostrarFormulario = true;
    this.cursoActual = { ...curso };
  }

  guardarCurso() {
    if (!this.cursoActual.nombre || !this.cursoActual.descripcion) {
      alert("Complete todos los campos");
      return;
    }

    if (!Number.isInteger(+this.cursoActual.duracion)) {
      alert("La duración debe ser un número entero (horas)");
      return;
    }

    // EDITAR
    if (this.editando) {
      this.http.put(`${this.api}/cursos/${this.cursoActual.id}`, this.cursoActual)
        .subscribe(() => {
          alert("Curso actualizado");
          this.mostrarFormulario = false;
          this.obtenerCursos();
        });
    }
    // CREAR
    else {
      this.http.post(`${this.api}/cursos`, this.cursoActual)
        .subscribe(() => {
          alert("Curso agregado");
          this.mostrarFormulario = false;
          this.obtenerCursos();
        });
    }
  }

  eliminarCurso(id: any) {
  console.log('ID que se envía al backend:', id);

  if (!confirm("¿Eliminar este curso?")) return;

  this.http.delete(`${this.api}/cursos/${id}`)
    .subscribe(() => {
      alert("Curso eliminado");
      this.obtenerCursos();
    });
}



  limpiarFormulario() {
    this.cursoActual = {
      id: null,
      nombre: '',
      duracion: 0,
      precio: 0,
      descripcion: '',
      categoria: 'Tecnología',
      estado: 'activo'
    };
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
