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

    if (!this.nombre || !this.password) {
      this.mensaje = 'Complete los campos';
      return;
    }

    this.auth.login(this.nombre, this.password).subscribe({
      next: (res: any) => {
        // ✅ Guardar token
        this.auth.guardarToken(res.token);

        // ✅ Leer payload del JWT
        const payload = JSON.parse(atob(res.token.split('.')[1]));

        if (payload.role === 'admin') {
          this.router.navigate(['/admin/dashboard']);
        } else {
          this.router.navigate(['/usuario/dashboard']);
        }
      },
      error: () => {
        this.mensaje = 'Usuario o contraseña incorrectos';
      }
    });
  }

}
