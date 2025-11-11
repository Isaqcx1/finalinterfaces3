import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CitasServicio } from '../../servicios/citas.servicio';
import { MascotasServicio } from '../../servicios/mascotas.servicio';
import { FormatoFechaPipe } from '../../pipe/formato-fecha-pipe';

@Component({
  selector: 'app-historial',
  standalone: true,
  imports: [CommonModule, FormsModule, FormatoFechaPipe],
  templateUrl: './historial-componente.html',
  styleUrls: ['./historial-componente.css']
})
export class HistorialComponente implements OnInit {
  mascotas: any[] = [];
  citas: any[] = [];
  citasFiltradas: any[] = [];
  mascotaSeleccionada: string = '';
  duenioActual: string = '';
  tipoActual: string = '';


  constructor(
    private citasServicio: CitasServicio,
    private mascotasServicio: MascotasServicio
  ) {}

  ngOnInit() {
    this.mascotas = this.mascotasServicio.obtenerMascotas();
    this.citas = this.citasServicio.obtenerCitas();
  }

  filtrarPorMascota() {
  if (this.mascotaSeleccionada) {
    const mascota = this.mascotas.find(m => m.nombre === this.mascotaSeleccionada);

    this.duenioActual = mascota ? mascota.dueno : 'No registrado';
    this.tipoActual = mascota ? mascota.tipo : 'Sin tipo';

    this.citasFiltradas = this.citas.filter(
      (cita) => cita.mascota === this.mascotaSeleccionada
    );
  } else {
    this.citasFiltradas = [];
    this.duenioActual = '';
    this.tipoActual = '';
  }
}

}
