import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearAntecedenteComponent } from './crear-antecedente.component';

describe('CrearAntecedenteComponent', () => {
  let component: CrearAntecedenteComponent;
  let fixture: ComponentFixture<CrearAntecedenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearAntecedenteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearAntecedenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
