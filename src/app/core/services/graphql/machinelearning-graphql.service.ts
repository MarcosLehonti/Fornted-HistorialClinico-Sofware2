import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache } from '@apollo/client/core';
import { map } from 'rxjs/operators';
import {
  ENTRENAR_CLUSTERS,
  OBTENER_CLUSTERS,
  SINCRONIZAR_TRIAJES,
  ENTRENAR_MODELO,
  OBTENER_TRIAJES_RIESGO
} from '../../graphql/operations/machinelearning.operations';

// =======================
// 🔹 Interfaces de Tipado
// =======================
interface EntrenarClustersResponse {
  entrenarClusters: { ok: boolean; message: string };
}

interface ObtenerClustersResponse {
  obtenerClusters: { idTriaje: number; cluster: number }[];
}

interface SincronizarTriajesResponse {
  sincronizarTriajes: { ok: boolean; message: string };
}

interface EntrenarModeloResponse {
  entrenarModelo: { ok: boolean; message: string };
}

interface ObtenerTriajesRiesgoResponse {
  obtenerTriajesRiesgo: { ok: boolean; message: string; triajes: any[] };
}

@Injectable({
  providedIn: 'root'
})
export class MachineLearningGraphQLService {
  constructor(private apollo: Apollo, private httpLink: HttpLink) {
    // ✅ Cliente Apollo para microservicio ML (Python)
    this.apollo.createNamed('mlClient', {
      link: this.httpLink.create({
        uri: 'http://localhost:5000/graphql', // cambia si está desplegado
      }),
      cache: new InMemoryCache(),
    });
  }

  // 🔹 Obtener instancia del cliente ML
  private get client() {
    return this.apollo.use('mlClient');
  }

  // ======================
  // 🚀 MUTACIONES Y QUERIES
  // ======================

  entrenarClusters(numClusters: number) {
    return this.client
      .mutate<EntrenarClustersResponse>({
        mutation: ENTRENAR_CLUSTERS,
        variables: { numClusters }
      })
      .pipe(map(result => result.data?.entrenarClusters));
  }

  obtenerClusters() {
    return this.client
      .query<ObtenerClustersResponse>({
        query: OBTENER_CLUSTERS,
        fetchPolicy: 'network-only'
      })
      .pipe(map(result => result.data?.obtenerClusters));
  }

  sincronizarTriajes() {
    return this.client
      .mutate<SincronizarTriajesResponse>({
        mutation: SINCRONIZAR_TRIAJES
      })
      .pipe(map(result => result.data?.sincronizarTriajes));
  }

  entrenarModelo() {
    return this.client
      .mutate<EntrenarModeloResponse>({
        mutation: ENTRENAR_MODELO
      })
      .pipe(map(result => result.data?.entrenarModelo));
  }

  obtenerTriajesRiesgo() {
    return this.client
      .mutate<ObtenerTriajesRiesgoResponse>({
        mutation: OBTENER_TRIAJES_RIESGO
      })
      .pipe(map(result => result.data?.obtenerTriajesRiesgo));
  }
}
