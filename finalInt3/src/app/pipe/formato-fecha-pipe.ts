import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatoFecha',
  standalone: true
})
export class FormatoFechaPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';

    const fecha = new Date(value);

    
    const opciones: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    };

    return fecha.toLocaleDateString('es-ES', opciones);
  }
}
