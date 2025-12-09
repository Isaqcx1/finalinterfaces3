import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminCursosComponent } from './admin-cursos';

describe('AdminCursosComponent', () => {
  let component: AdminCursosComponent;
  let fixture: ComponentFixture<AdminCursosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminCursosComponent] // ✅ componente standalone
    }).compileComponents();

    fixture = TestBed.createComponent(AdminCursosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
