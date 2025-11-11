import { Component } from '@angular/core';
import { AuthService } from '../../servicios/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  imports: [CommonModule, FormsModule],
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  nombre = '';
  password = '';
  confirm = '';
  mensaje = '';

  constructor(private auth: AuthService, private router: Router) {}

  registrar() {
    if (!this.nombre || !this.password) {
      this.mensaje = 'Complete los campos';
      return;
    }
    if (this.password !== this.confirm) {
      this.mensaje = 'Las contraseñas no coinciden';
      return;
    }

    const ok = this.auth.registrarUsuario({
      nombre: this.nombre,
      password: this.password,
      role: 'user'
    });

    if (!ok) {
      this.mensaje = 'El usuario ya existe';
      return;
    }

    this.mensaje = 'Registro exitoso. Inicie sesión';
    setTimeout(() => this.router.navigate(['/login']), 1000);
  }
}
