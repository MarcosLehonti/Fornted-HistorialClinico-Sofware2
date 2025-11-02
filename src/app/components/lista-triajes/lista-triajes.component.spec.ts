import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaTriajesComponent } from './lista-triajes.component';

describe('ListaTriajesComponent', () => {
  let component: ListaTriajesComponent;
  let fixture: ComponentFixture<ListaTriajesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaTriajesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaTriajesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
