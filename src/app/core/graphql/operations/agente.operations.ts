import { gql } from 'apollo-angular';

// 🔹 Analizar ECG
export const ANALIZAR_ECG_MUTATION = gql`
  mutation AnalizarECG($archivo_imagen: String!, $id_paciente: Int!) {
    analizar_ecg(archivo_imagen: $archivo_imagen, id_paciente: $id_paciente) {
      ok
      message
      analisis {
        id_paciente
        archivo_imagen
        fecha_analisis
        diagnostico
        descripcion
        probabilidad
        nivel_riesgo
        frecuencia_cardiaca
        estado
        tiempo_procesamiento
        modelo_utilizado
      }
    }
  }
`;

// 🔹 Obtener histórico ECG
export const OBTENER_HISTORICO_ECG = gql`
  mutation ObtenerHistoricoECG($id_paciente: Int!) {
    obtener_historico_ecg(id_paciente: $id_paciente) {
      ok
      message
      historico {
        id_analisis
        fecha_analisis
        diagnostico
        descripcion
        probabilidad
        nivel_riesgo
        archivo_imagen
      }
    }
  }
`;

// 🔹 Entrenar modelo ECG
export const ENTRENAR_MODELO_ECG = gql`
  mutation EntrenarModeloECG {
    entrenar_modelo_ecg {
      ok
      message
      resultado {
        estado
        precision
        dataset_size
        epocas
        tiempo_entrenamiento
        modelo_version
      }
    }
  }
`;
