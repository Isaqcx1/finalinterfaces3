import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CitasServicio } from '../../servicios/citas.servicio';
import { FormatoFechaPipe } from '../../pipe/formato-fecha-pipe';
import { ResaltarHoyDirective } from '../../directivas/resaltar-hot.directiva';

@Component({
  selector: 'app-listado-citas',
  standalone: true,
  imports: [CommonModule, FormatoFechaPipe, ResaltarHoyDirective],
  templateUrl: './listado-citas-componente.html',
  styleUrls: ['./listado-citas-componente.css']
})
export class ListadoCitasComponente {
  
  citasFiltradas: any[] = [];

  constructor(private citasServicio: CitasServicio) {
    this.citasFiltradas = this.citasServicio.obtenerCitas();
  }
}
