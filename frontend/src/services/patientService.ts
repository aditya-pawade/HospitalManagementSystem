import apiClient from './api';
import type { Patient, PatientDTO, PaginationParams } from '../types';

export const patientService = {
  // Get all patients
  getAll: async (params: PaginationParams = { page: 0, size: 20 }): Promise<PatientDTO[]> => {
    const response = await apiClient.get('/patients', { params });
    return response.data;
  },

  // Get patient by ID
  getById: async (id: number): Promise<PatientDTO> => {
    const response = await apiClient.get(`/patients/${id}`);
    return response.data;
  },

  // Create new patient
  create: async (patient: Patient): Promise<PatientDTO> => {
    const response = await apiClient.post('/patients', patient);
    return response.data;
  },

  // Update patient
  update: async (id: number, patient: Patient): Promise<PatientDTO> => {
    const response = await apiClient.put(`/patients/${id}`, patient);
    return response.data;
  },

  // Delete patient
  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/patients/${id}`);
  },
};
