// src/app/core/graphql/operations/machinelearning.operations.ts
import { gql } from 'apollo-angular';

// ==================== MUTACIONES ====================

// 🧠 Entrenar modelo de clustering (no supervisado)
export const ENTRENAR_CLUSTERS = gql`
  mutation EntrenarClusters($numClusters: Int!) {
    entrenarClusters(numClusters: $numClusters) {
      ok
      message
    }
  }
`;

// 🔍 Obtener los clusters generados
export const OBTENER_CLUSTERS = gql`
  query ObtenerClusters {
    obtenerClusters {
      idTriaje
      cluster
    }
  }
`;

// 🔄 Sincronizar triajes con base de datos principal
export const SINCRONIZAR_TRIAJES = gql`
  mutation SincronizarTriajes {
    sincronizarTriajes {
      ok
      message
    }
  }
`;

// 📈 Entrenar modelo supervisado (clasificación de riesgo)
export const ENTRENAR_MODELO = gql`
  mutation EntrenarModelo {
    entrenarModelo {
      ok
      message
    }
  }
`;

// ⚠️ Obtener triajes clasificados por riesgo
export const OBTENER_TRIAJES_RIESGO = gql`
  mutation ObtenerTriajesRiesgo {
    obtenerTriajesRiesgo {
      ok
      message
      triajes
    }
  }
`;
