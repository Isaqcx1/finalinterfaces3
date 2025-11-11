import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[resaltarHoy]',
  standalone: true
})
export class ResaltarHoyDirective implements OnInit {

  @Input() resaltarHoy!: string;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    const fecha = new Date(this.resaltarHoy);
    const hoy = new Date();

    if (fecha.toDateString() === hoy.toDateString()) {
      this.el.nativeElement.style.backgroundColor = '#ffd4d4';
      this.el.nativeElement.style.fontWeight = 'bold';
    }
  }
}
