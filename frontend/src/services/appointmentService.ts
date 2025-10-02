import apiClient from './api';
import type { AppointmentDTO, AppointmentCreateDTO, AppointmentStatus, PaginationParams } from '../types';

export const appointmentService = {
  // Get all appointments
  getAll: async (params: PaginationParams = { page: 0, size: 20 }): Promise<AppointmentDTO[]> => {
    const response = await apiClient.get('/appointments', { params });
    return response.data;
  },

  // Get appointment by ID
  getById: async (id: number): Promise<AppointmentDTO> => {
    const response = await apiClient.get(`/appointments/${id}`);
    return response.data;
  },

  // Get appointments by doctor
  getByDoctor: async (doctorId: number): Promise<AppointmentDTO[]> => {
    const response = await apiClient.get(`/appointments/doctor/${doctorId}`);
    return response.data;
  },

  // Book new appointment
  book: async (appointment: AppointmentCreateDTO): Promise<AppointmentDTO> => {
    const response = await apiClient.post('/appointments', appointment);
    return response.data;
  },

  // Update appointment status
  updateStatus: async (id: number, status: AppointmentStatus): Promise<AppointmentDTO> => {
    const response = await apiClient.put(`/appointments/${id}/status`, null, {
      params: { status }
    });
    return response.data;
  },

  // Cancel appointment
  cancel: async (id: number): Promise<AppointmentDTO> => {
    return appointmentService.updateStatus(id, 'CANCELLED');
  },

  // Delete appointment
  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/appointments/${id}`);
  },
};
