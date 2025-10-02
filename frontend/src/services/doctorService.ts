import apiClient from './api';
import type { Doctor, DoctorDTO, PaginationParams } from '../types';

export const doctorService = {
  // Get all doctors
  getAll: async (params: PaginationParams = { page: 0, size: 20 }): Promise<DoctorDTO[]> => {
    const response = await apiClient.get('/doctors', { params });
    return response.data;
  },

  // Get doctor by ID
  getById: async (id: number): Promise<DoctorDTO> => {
    const response = await apiClient.get(`/doctors/${id}`);
    return response.data;
  },

  // Create new doctor
  create: async (doctor: Doctor): Promise<DoctorDTO> => {
    const response = await apiClient.post('/doctors', doctor);
    return response.data;
  },

  // Update doctor
  update: async (id: number, doctor: Doctor): Promise<DoctorDTO> => {
    const response = await apiClient.put(`/doctors/${id}`, doctor);
    return response.data;
  },

  // Approve doctor (Admin only)
  approve: async (id: number): Promise<DoctorDTO> => {
    const response = await apiClient.put(`/doctors/${id}/approve`);
    return response.data;
  },

  // Delete doctor
  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/doctors/${id}`);
  },
};
