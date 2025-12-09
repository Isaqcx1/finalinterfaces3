import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../servicios/auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin-reportes',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './admin-reportes.html',
  styleUrls: ['./admin-reportes.css']
})
export class AdminReportesComponent implements OnInit {

  api = 'http://localhost:3000/api';

  totalUsuarios = 0;
  totalCursos = 0;
  totalInscripciones = 0;
  montoTotal = 0;

  cursosPorCategoria: any[] = [];
  usuariosTop: any[] = [];

  constructor(
    private http: HttpClient,
    public auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarReportes();
  }

  cargarReportes() {

    // ✅ 1. OBTENER USUARIOS REALES
    this.http.get<any[]>(`${this.api}/usuarios`).subscribe(usuarios => {

      const usuariosSolo = usuarios.filter(u => u.role === 'usuario');
      this.totalUsuarios = usuariosSolo.length;

      const top: any[] = [];
      let totalIns = 0;

      // ✅ 2. OBTENER CURSOS DEL SISTEMA
      this.http.get<any[]>(`${this.api}/cursos`).subscribe(cursos => {

        this.totalCursos = cursos.length;
        let monto = 0;

        // ✅ Contadores por categoría
        const categorias: any = {
          Tecnología: 0,
          Idiomas: 0,
          Negocios: 0,
          'Desarrollo Personal': 0
        };

        // ✅ 3. RECORRER INSCRIPCIONES DE CADA USUARIO
        usuariosSolo.forEach(usuario => {

          this.http.get<any[]>(`${this.api}/inscripciones/${usuario.id}`).subscribe(inscripciones => {

            totalIns += inscripciones.length;

            // TOP USUARIOS
            top.push({
              nombre: usuario.nombre,
              cantidad: inscripciones.length
            });

            for (const ins of inscripciones) {
              const cursoSistema = cursos.find((c: any) => c.nombre === ins.nombreCurso);

              if (cursoSistema) {
                categorias[cursoSistema.categoria]++;
                monto += Number(cursoSistema.precio);
              }
            }

            // ✅ ACTUALIZACIONES FINALES
            this.totalInscripciones = totalIns;
            this.montoTotal = monto;

            this.usuariosTop = top.sort((a, b) => b.cantidad - a.cantidad);

            this.cursosPorCategoria = Object.keys(categorias).map(key => ({
              nombre: key,
              cantidad: categorias[key]
            }));

          });

        });

      });

    });

  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
