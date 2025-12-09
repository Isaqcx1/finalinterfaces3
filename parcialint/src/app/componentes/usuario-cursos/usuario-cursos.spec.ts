import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioCursos } from './usuario-cursos';

describe('UsuarioCursos', () => {
  let component: UsuarioCursos;
  let fixture: ComponentFixture<UsuarioCursos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsuarioCursos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsuarioCursos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
