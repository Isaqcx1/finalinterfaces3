import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService, Usuario } from '../../servicios/auth.service';

@Component({
  selector: 'app-usuario-perfil',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './usuario-perfil.html',
  styleUrls: ['./usuario-perfil.css']
})
export class UsuarioPerfilComponent implements OnInit {

  usuario: Usuario | null = null;

  nuevaPassword = '';
  confirmarPassword = '';
  mensaje = '';

  constructor(
    public auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.usuario = this.auth.getUsuarioActual();
  }

  cambiarPassword() {
    if (!this.nuevaPassword || !this.confirmarPassword) {
      this.mensaje = 'Complete ambos campos';
      return;
    }

    if (this.nuevaPassword !== this.confirmarPassword) {
      this.mensaje = 'Las contraseñas no coinciden';
      return;
    }

    if (!this.usuario) return;

    // actualizar en la "base" (localStorage)
    this.usuario.password = this.nuevaPassword;

    const usuarios = JSON.parse(
      localStorage.getItem('usuarios') || '[]'
    );

    const index = usuarios.findIndex(
      (u: Usuario) => u.nombre === this.usuario?.nombre
    );

    if (index !== -1) {
      usuarios[index].password = this.nuevaPassword;
      localStorage.setItem('usuarios', JSON.stringify(usuarios));
    }

    // refrescar sesión
    localStorage.setItem('usuario_actual', JSON.stringify(this.usuario));

    this.nuevaPassword = '';
    this.confirmarPassword = '';
    this.mensaje = '✅ Contraseña actualizada correctamente';
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
