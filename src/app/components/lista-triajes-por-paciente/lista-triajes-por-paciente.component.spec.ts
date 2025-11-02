import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaTriajesPorPacienteComponent } from './lista-triajes-por-paciente.component';

describe('ListaTriajesPorPacienteComponent', () => {
  let component: ListaTriajesPorPacienteComponent;
  let fixture: ComponentFixture<ListaTriajesPorPacienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaTriajesPorPacienteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaTriajesPorPacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
