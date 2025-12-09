import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../servicios/auth.service';

@Component({
  selector: 'app-admin-reportes',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './admin-reportes.html',
  styleUrls: ['./admin-reportes.css']
})
export class AdminReportesComponent implements OnInit {

  totalUsuarios = 0;
  totalCursos = 0;
  totalInscripciones = 0;
  montoTotal = 0;


  cursosPorCategoria: any[] = [];
  usuariosTop: any[] = [];

  constructor(
    public auth: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {

    // ✅ USUARIOS (sin admin)
    const todos = JSON.parse(localStorage.getItem('usuarios') || '[]');
    const usuarios = todos.filter((u: any) => u.role === 'usuario');
    this.totalUsuarios = usuarios.length;


    // ✅ CURSOS
    const cursos = JSON.parse(localStorage.getItem('cursos_admin') || '[]');
    this.totalCursos = cursos.length;

    // ✅ INSCRIPCIONES + TOP USUARIOS
    let total = 0;
    let monto = 0;
    const top: any[] = [];


    // contadores por categoria
    const categorias: any = {
      Tecnología: 0,
      Idiomas: 0,
      Negocios: 0,
      'Desarrollo Personal': 0
    };

    for (const u of usuarios) {
      const key = `mis_cursos_${u.nombre}`;
      const raw = localStorage.getItem(key);
      const misCursos = raw ? JSON.parse(raw) : [];

      total += misCursos.length;

      top.push({
        nombre: u.nombre,
        cantidad: misCursos.length
      });

      // contar por categoria
      for (const c of misCursos) {
        const cursoSistema = cursos.find((x: any) => x.nombre === c.nombre);

        if (cursoSistema) {
          categorias[cursoSistema.categoria]++;

          // ✅ SUMAR MONTO REAL DEL CURSO
          monto += Number(cursoSistema.precio);
        }
      }

    }

    this.totalInscripciones = total;

    // ordenar top usuarios
    this.usuariosTop = top.sort((a, b) => b.cantidad - a.cantidad);

    // convertir categorias a array
    this.cursosPorCategoria = Object.keys(categorias).map(key => ({
      nombre: key,
      cantidad: categorias[key]
    
    }));
    this.montoTotal = monto;

  }
  
  

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
  
}

