import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { of } from 'rxjs';
import { MachineLearningComponent } from './machinelearning.component';
import { MachineLearningGraphQLService } from '../../core/services/graphql/machinelearning-graphql.service';

describe('MachineLearningComponent', () => {
  let component: MachineLearningComponent;
  let fixture: ComponentFixture<MachineLearningComponent>;
  let mockMlService: jasmine.SpyObj<MachineLearningGraphQLService>;

  beforeEach(waitForAsync(() => {
    mockMlService = jasmine.createSpyObj('MachineLearningGraphQLService', [
      'entrenarClusters',
      'obtenerClusters',
      'entrenarModelo',
      'obtenerTriajesRiesgo'
    ]);

    // Valores por defecto para los spies
    mockMlService.entrenarClusters.and.returnValue(of({ ok: true, message: 'Clusters entrenados' }));
    mockMlService.obtenerClusters.and.returnValue(of([
      { idTriaje: 1, cluster: 0 },
      { idTriaje: 2, cluster: 1 }
    ]));
    mockMlService.entrenarModelo.and.returnValue(of({ ok: true, message: 'Modelo entrenado' }));
    mockMlService.obtenerTriajesRiesgo.and.returnValue(of({
      ok: true,
      message: 'Triajes obtenidos',
      triajes: [{ id: 1, riesgo: 'alto' }]
    }));

    TestBed.configureTestingModule({
      imports: [MachineLearningComponent], // componente standalone
      providers: [
        { provide: MachineLearningGraphQLService, useValue: mockMlService }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MachineLearningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the machine learning component', () => {
    expect(component).toBeTruthy();
  });

  it('entrenarClusters debería llamar al servicio y setear resultado', () => {
    component.entrenarClusters();
    expect(mockMlService.entrenarClusters).toHaveBeenCalledWith(3);
    expect(component.resultado).toBe('Clusters entrenados');
  });

  it('obtenerClusters debería llamar al servicio y poblar clusters', () => {
    component.obtenerClusters();
    expect(mockMlService.obtenerClusters).toHaveBeenCalled();
    expect(component.clusters.length).toBe(2);
    expect(component.clusters[0].idTriaje).toBe(1);
  });

  it('entrenarModelo debería llamar al servicio y setear resultado', () => {
    component.entrenarModelo();
    expect(mockMlService.entrenarModelo).toHaveBeenCalled();
    expect(component.resultado).toBe('Modelo entrenado');
  });

  it('obtenerTriajesRiesgo debería llamar al servicio y setear triajes y resultado', () => {
    component.obtenerTriajesRiesgo();
    expect(mockMlService.obtenerTriajesRiesgo).toHaveBeenCalled();
    expect(component.triajesRiesgo.length).toBe(1);
    expect(component.resultado).toBe('Triajes obtenidos');
  });

  it('debería manejar errores sin romper (simulación)', () => {
    // hacer que el servicio arroje error simulado
    mockMlService.entrenarClusters.and.returnValue(of({ ok: false, message: 'error' }));
    component.entrenarClusters();
    expect(mockMlService.entrenarClusters).toHaveBeenCalled();
    expect(component.resultado).toBe('error'); // ✅ corregido
  });
});
