import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgenteComponent } from './agente.component';
import { AgenteGraphQLService } from '../../core/services/graphql/agente-graphql.service';
import { of } from 'rxjs';

describe('AgenteComponent', () => {
  let component: AgenteComponent;
  let fixture: ComponentFixture<AgenteComponent>;
  let mockService: any;

  beforeEach(async () => {
    mockService = {
      analizarECG: jasmine.createSpy().and.returnValue(of({ message: '✅ Análisis completo' })),
      obtenerHistoricoECG: jasmine.createSpy().and.returnValue(of({ historico: [] })),
      entrenarModeloECG: jasmine.createSpy().and.returnValue(of({ message: '✅ Modelo entrenado' })),
    };

    await TestBed.configureTestingModule({
      imports: [AgenteComponent],
      providers: [{ provide: AgenteGraphQLService, useValue: mockService }],
    }).compileComponents();

    fixture = TestBed.createComponent(AgenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call service methods', () => {
    component.idPaciente = 1;
    component.archivoImagen = 'test.jpg';
    component.analizarECG();
    expect(mockService.analizarECG).toHaveBeenCalled();
  });
});
