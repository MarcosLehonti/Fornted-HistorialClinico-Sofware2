import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EspecialidadesUsuariosComponent } from './especialidades-usuarios.component';

describe('EspecialidadesUsuariosComponent', () => {
  let component: EspecialidadesUsuariosComponent;
  let fixture: ComponentFixture<EspecialidadesUsuariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EspecialidadesUsuariosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EspecialidadesUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
