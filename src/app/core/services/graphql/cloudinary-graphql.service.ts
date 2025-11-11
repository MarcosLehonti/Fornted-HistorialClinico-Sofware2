import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CloudinaryGraphQLService {
 // private readonly apiUrl = 'http://localhost:4003/graphql'; // url para local
   private readonly apiUrl ='https://microservicio-cloudinary.onrender.com/graphql';; // url desplegado


  constructor(private http: HttpClient) {}

  // 🔼 Subir archivo (idéntico a Postman)
  uploadFile(file: File, patientId: number): Observable<any> {
    const formData = new FormData();

    // 🔹 Definir la operación GraphQL
    const operations = JSON.stringify({
      query: `
        mutation($file: Upload!, $patientId: Int!) {
          uploadFile(file: $file, patientId: $patientId) {
            message
            document {
              id
              fileUrl
            }
          }
        }
      `,
      variables: {
        file: null,
        patientId: patientId,
      },
    });

    // 🔹 Mapeo del archivo (renombrado para evitar conflicto con RxJS map)
    const fileMap = JSON.stringify({
      '0': ['variables.file'],
    });

    // 🔹 Agregar los campos al FormData
    formData.append('operations', operations);
    formData.append('map', fileMap);
    formData.append('0', file);

    // 🔹 Hacer la petición POST
    return this.http.post(this.apiUrl, formData).pipe(
      map((res: any) => res.data?.uploadFile || res.uploadFile),
      catchError((error) => {
        console.error('❌ Error al subir archivo a Cloudinary:', error);
        return throwError(() => error);
      })
    );
  }

  // 🔽 Obtener archivos por paciente
  getFilesByPatientId(patientId: number): Observable<any[]> {
    const query = `
      query($patientId: Int!) {
        getFilesByPatientId(patientId: $patientId) {
          id
          fileUrl
        }
      }
    `;

    const body = {
      query,
      variables: { patientId },
    };

    return this.http.post(this.apiUrl, body).pipe(
      map((res: any) => res.data?.getFilesByPatientId || []),
      catchError((error) => {
        console.error('❌ Error al obtener archivos del paciente:', error);
        return throwError(() => error);
      })
    );
  }
}
