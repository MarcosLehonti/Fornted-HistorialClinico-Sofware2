import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EspecialidadesHorariosComponent } from './especialidades-horarios.component';

describe('EspecialidadesHorariosComponent', () => {
  let component: EspecialidadesHorariosComponent;
  let fixture: ComponentFixture<EspecialidadesHorariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EspecialidadesHorariosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EspecialidadesHorariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
