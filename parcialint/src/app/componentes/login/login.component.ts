import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../servicios/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  nombre = '';
  password = '';
  mensaje = '';

  constructor(private auth: AuthService, private router: Router) { }

  ingresar() {
    // ✅ PRIMER FILTRO: campos vacíos
    if (!this.nombre || !this.password) {
      this.mensaje = '';   // no mostrar error aún
      return;
    }

    const ok = this.auth.login(this.nombre, this.password);

    if (!ok) {
      this.mensaje = 'Usuario o contraseña incorrectos';
      return;
    }

    const usuario = this.auth.getUsuarioActual();

    if (usuario?.role === 'admin') {
      this.router.navigate(['/admin/dashboard']);
    } else {
      this.router.navigate(['/usuario/dashboard']);
    }
  }
}
