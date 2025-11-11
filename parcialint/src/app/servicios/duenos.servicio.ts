import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DuenosServicio {
  private dueños: string[] = [];

  constructor() {
    const guardados = localStorage.getItem('dueños');
    if (guardados) {
      this.dueños = JSON.parse(guardados);
    }
  }

  registrarDueno(nombre: string) {
    this.dueños.push(nombre);
    localStorage.setItem('dueños', JSON.stringify(this.dueños));
  }

  obtenerDuenos(): string[] {
    return this.dueños;
  }
}
