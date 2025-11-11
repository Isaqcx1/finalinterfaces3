import { Component } from '@angular/core';
import { MascotasServicio } from '../../servicios/mascotas.servicio';
import { AuthService } from '../../servicios/auth.service';

@Component({
  selector: 'app-registrar-mascota',
  standalone: true,
  templateUrl: './Rmascota-componente.html',
  styleUrls: ['./Rmascota-componente.css']
})
export class RmascotaComponente {
  constructor(
    private mascotasServicio: MascotasServicio,
    private auth: AuthService
  ) {}

  guardar(nombre: string, tipo: string) {
    const usuario = this.auth.getUsuarioActual();
    if (!usuario) {
      alert('Debe iniciar sesión para registrar una mascota.');
      return;
    }

    const dueno = usuario.nombre; 
    this.mascotasServicio.registrarMascota({ nombre, dueno: usuario.nombre, tipo });

    alert(`Mascota registrada por ${dueno}`);
  }
}
