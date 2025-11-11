import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AgenteGraphQLService {
  private readonly apiUrl = 'http://localhost:5000/graphql'; // ⚠️ Ajusta si está desplegado

  constructor(private http: HttpClient) {}

  analizarECG(archivoImagen: string, idPaciente: number): Observable<any> {
    const body = {
      query: `
        mutation AnalizarECG($archivo_imagen: String!, $id_paciente: Int!) {
          analizar_ecg(archivo_imagen: $archivo_imagen, id_paciente: $id_paciente) {
            ok
            message
            analisis {
              id_paciente
              diagnostico
              probabilidad
              nivel_riesgo
              modelo_utilizado
            }
          }
        }
      `,
      variables: { archivo_imagen: archivoImagen, id_paciente: idPaciente },
    };

    return this.http.post(this.apiUrl, body).pipe(
      map((res: any) => res.data?.analizar_ecg),
      catchError((err) => {
        console.error('❌ Error al analizar ECG:', err);
        return throwError(() => err);
      })
    );
  }

  obtenerHistoricoECG(idPaciente: number): Observable<any> {
    const body = {
      query: `
        mutation ObtenerHistoricoECG($id_paciente: Int!) {
          obtener_historico_ecg(id_paciente: $id_paciente) {
            ok
            message
            historico {
              fecha_analisis
              diagnostico
              nivel_riesgo
              archivo_imagen
            }
          }
        }
      `,
      variables: { id_paciente: idPaciente },
    };

    return this.http.post(this.apiUrl, body).pipe(
      map((res: any) => res.data?.obtener_historico_ecg),
      catchError((err) => {
        console.error('❌ Error al obtener historial ECG:', err);
        return throwError(() => err);
      })
    );
  }

  entrenarModeloECG(): Observable<any> {
    const body = {
      query: `
        mutation EntrenarModeloECG {
          entrenar_modelo_ecg {
            ok
            message
            resultado {
              precision
              tiempo_entrenamiento
              modelo_version
            }
          }
        }
      `,
    };

    return this.http.post(this.apiUrl, body).pipe(
      map((res: any) => res.data?.entrenar_modelo_ecg),
      catchError((err) => {
        console.error('❌ Error al entrenar modelo ECG:', err);
        return throwError(() => err);
      })
    );
  }
}
