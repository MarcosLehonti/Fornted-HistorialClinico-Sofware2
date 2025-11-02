import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBitacoraComponent } from './admin-bitacora.component';

describe('AdminBitacoraComponent', () => {
  let component: AdminBitacoraComponent;
  let fixture: ComponentFixture<AdminBitacoraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminBitacoraComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminBitacoraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
