import { Injectable } from '@angular/core';
import { Cita } from '../interfaces/cita';

@Injectable({
  providedIn: 'root'
})
export class CitasServicio {
  private citas: Cita[] = [];

  constructor() {
    
    const datos = localStorage.getItem('citas');
    if (datos) {
      this.citas = JSON.parse(datos);
    }
  }

  agregarCita(cita: Cita) {
    this.citas.push(cita);
    localStorage.setItem('citas', JSON.stringify(this.citas));
  }

  obtenerCitas(): Cita[] {
    return this.citas;
  }
}
