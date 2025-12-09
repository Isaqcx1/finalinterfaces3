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

  if (!this.nombre || !this.password || !this.confirm) {
    this.mensaje = 'Complete todos los campos';
    return;
  }

  if (this.password !== this.confirm) {
    this.mensaje = 'Las contraseñas no coinciden';
    return;
  }

  // ✅ REGISTRAR POR API REAL
  fetch('http://localhost:3000/api/usuarios', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      nombre: this.nombre,
      password: this.password
    })
  })
  .then(res => {
    if (!res.ok) throw new Error();
    return res.json();
  })
  .then(() => {
    this.mensaje = 'Registro exitoso. Inicie sesión';
    setTimeout(() => this.router.navigate(['/login']), 1000);
  })
  .catch(() => {
    this.mensaje = 'Usuario ya existe';
  });
}

}
