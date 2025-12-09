import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../servicios/auth.service';

@Component({
  selector: 'app-admin-cursos',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './admin-cursos.html',
  styleUrls: ['./admin-cursos.css']
})
export class AdminCursosComponent implements OnInit {

  cursos: any[] = [];
  mostrarFormulario = false;
  editando = false;
  categoriaFiltro: string = 'Todas';


  cursoActual: any = {
    idCurso: null,
    nombre: '',
    duracion: '',
    precio: '',
    descripcion: '',
    categoria: 'Tecnología',
    estado: 'activo'
  };

  categorias = ['Tecnología', 'Idiomas', 'Negocios', 'Desarrollo Personal'];

  constructor(
    public auth: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const raw = localStorage.getItem('cursos_admin');
    this.cursos = raw ? JSON.parse(raw) : [];
  }

  get cursosFiltrados() {
    if (this.categoriaFiltro === 'Todas') {
      return this.cursos;
    }
    return this.cursos.filter(c => c.categoria === this.categoriaFiltro);
  }


  // ✅ MOSTRAR FORMULARIO
  nuevoCurso() {
    this.limpiarFormulario();
    this.mostrarFormulario = true;
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

    if (this.editando) {
      const index = this.cursos.findIndex(c => c.idCurso === this.cursoActual.idCurso);
      this.cursos[index] = { ...this.cursoActual };
    } else {
      this.cursoActual.idCurso = Date.now();
      this.cursos.push({ ...this.cursoActual });
    }


    if (!Number.isInteger(+this.cursoActual.duracion)) {
      alert('La duración debe ser un número entero de horas');
      return;
    }

    if (!this.cursoActual.nombre || !this.cursoActual.descripcion) {
      alert("Complete todos los campos");
      return;
    }

    localStorage.setItem('cursos_admin', JSON.stringify(this.cursos));
    this.limpiarFormulario();
    this.mostrarFormulario = false;


  }

  eliminarCurso(id: number) {
    if (!confirm("¿Eliminar este curso?")) return;
    this.cursos = this.cursos.filter(c => c.idCurso !== id);
    localStorage.setItem('cursos_admin', JSON.stringify(this.cursos));
  }

  limpiarFormulario() {
    this.editando = false;
    this.cursoActual = {
      idCurso: null,
      nombre: '',
      duracion: '',
      precio: '',
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
