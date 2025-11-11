import { Injectable } from '@angular/core';
import { Mascota } from '../interfaces/mascota';

@Injectable({
  providedIn: 'root'   
})
export class MascotasServicio {
  private mascotas: Mascota[] = [];

  constructor() {
   
    const guardadas = localStorage.getItem('mascotas');
    if (guardadas) {
      this.mascotas = JSON.parse(guardadas);
    }
  }

  registrarMascota(mascota: Mascota) {
    this.mascotas.push(mascota);
    localStorage.setItem('mascotas', JSON.stringify(this.mascotas));
  }

  obtenerMascotas(): Mascota[] {
    return this.mascotas;
  }

  obtenerMascotasPorDueno(dueno: string): Mascota[] {
  return this.mascotas.filter(m => m.dueno === dueno);
}

}
