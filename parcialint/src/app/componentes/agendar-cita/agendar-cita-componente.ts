import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MascotasServicio } from '../../servicios/mascotas.servicio';
import { CitasServicio } from '../../servicios/citas.servicio';
import { AuthService } from '../../servicios/auth.service';

@Component({
  selector: 'app-agendar-cita',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './agendar-cita-componente.html',
  styleUrls: ['./agendar-cita-componente.css']
})
export class AgendarCitaComponente implements OnInit {
  mascotas: any[] = [];

  constructor(
    private mascotasServicio: MascotasServicio,
    private citasServicio: CitasServicio,
    private auth: AuthService
  ) {}

  ngOnInit() {
    const usuario = this.auth.getUsuarioActual();

    if (!usuario) return;

    if (usuario.role === 'admin') {
      
      this.mascotas = this.mascotasServicio.obtenerMascotas();
    } else {
      
      this.mascotas = this.mascotasServicio.obtenerMascotasPorDueno(usuario.nombre);
    }
  }

  guardar(mascota: string, fecha: string, hora: string, motivo: string) {
    this.citasServicio.agregarCita({ mascota, fecha, hora, motivo });
    alert("Cita registrada");
  }
}
