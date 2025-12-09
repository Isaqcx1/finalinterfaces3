import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminReportes } from './admin-reportes';

describe('AdminReportes', () => {
  let component: AdminReportes;
  let fixture: ComponentFixture<AdminReportes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminReportes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminReportes);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
