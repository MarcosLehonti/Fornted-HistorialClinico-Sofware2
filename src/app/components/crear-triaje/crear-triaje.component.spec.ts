import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearTriajeComponent } from './crear-triaje.component';

describe('CrearTriajeComponent', () => {
  let component: CrearTriajeComponent;
  let fixture: ComponentFixture<CrearTriajeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearTriajeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearTriajeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
