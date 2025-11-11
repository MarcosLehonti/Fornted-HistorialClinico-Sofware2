import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CloudinaryComponent } from './cloudinary.component';
import { CloudinaryGraphQLService } from '../../core/services/graphql/cloudinary-graphql.service';
import { of } from 'rxjs';

describe('CloudinaryComponent', () => {
  let component: CloudinaryComponent;
  let fixture: ComponentFixture<CloudinaryComponent>;
  let mockService: any;

  beforeEach(async () => {
    mockService = {
      uploadFile: jasmine.createSpy().and.returnValue(of({ message: '✅ Archivo subido correctamente' })),
      getFilesByPatientId: jasmine.createSpy().and.returnValue(of([])),
    };

    await TestBed.configureTestingModule({
      imports: [CloudinaryComponent],
      providers: [{ provide: CloudinaryGraphQLService, useValue: mockService }],
    }).compileComponents();

    fixture = TestBed.createComponent(CloudinaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call getFilesByPatientId on init', () => {
    expect(mockService.getFilesByPatientId).toHaveBeenCalled();
  });
});
