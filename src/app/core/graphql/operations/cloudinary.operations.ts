import { gql } from 'apollo-angular';

// 🔼 MUTACIÓN: Subir archivo
export const UPLOAD_FILE_MUTATION = gql`
  mutation UploadFile($file: Upload!, $patientId: Int!) {
    uploadFile(file: $file, patientId: $patientId) {
      message
      document {
        id
        fileUrl
        fileType
        patientId
        createdAt
      }
    }
  }
`;

// 🔽 QUERY: Obtener archivos por ID de paciente
export const GET_FILES_BY_PATIENT_ID = gql`
  query GetFilesByPatientId($patientId: Int!) {
    getFilesByPatientId(patientId: $patientId) {
      id
      fileUrl
      fileType
      createdAt
    }
  }
`;
