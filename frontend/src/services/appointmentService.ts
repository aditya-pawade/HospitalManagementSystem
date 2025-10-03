import { Appointment, AppointmentFormData } from '../types';
import api from './api';

class AppointmentService {
  private readonly baseUrl = '/appointments';

  async getAllAppointments(page: number = 0, size: number = 20): Promise<Appointment[]> {
    try {
      const response = await api.get<Appointment[]>(`${this.baseUrl}?page=${page}&size=${size}`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch appointments');
    }
  }

  async getAppointmentById(id: number): Promise<Appointment> {
    try {
      const response = await api.get<Appointment>(`${this.baseUrl}/${id}`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch appointment');
    }
  }

  async createAppointment(appointmentData: AppointmentFormData): Promise<Appointment> {
    try {
      const response = await api.post<Appointment>(this.baseUrl, appointmentData, {
        headers: {
          'role': 'PATIENT'
        }
      });
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 403) {
        throw new Error('Only PATIENT can book appointments');
      }
      throw new Error('Failed to create appointment');
    }
  }

  async updateAppointmentStatus(
    id: number, 
    status: 'REQUESTED' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED'
  ): Promise<Appointment> {
    try {
      const response = await api.put<Appointment>(`${this.baseUrl}/${id}/status?status=${status}`, {}, {
        headers: {
          'role': 'DOCTOR' // DOCTOR or ADMIN can update status
        }
      });
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 403) {
        throw new Error('Only DOCTOR or ADMIN can update appointment status');
      }
      throw new Error('Failed to update appointment status');
    }
  }

  async getAppointmentsByDoctor(doctorId: number): Promise<Appointment[]> {
    try {
      const response = await api.get<Appointment[]>(`${this.baseUrl}/doctor/${doctorId}`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch doctor appointments');
    }
  }

  async getAppointmentsByPatient(patientId: number): Promise<Appointment[]> {
    try {
      const response = await api.get<Appointment[]>(`${this.baseUrl}/patient/${patientId}`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch patient appointments');
    }
  }

  async deleteAppointment(id: number): Promise<void> {
    try {
      await api.delete(`${this.baseUrl}/${id}`, {
        headers: {
          'role': 'ADMIN'
        }
      });
    } catch (error: any) {
      if (error.response?.status === 403) {
        throw new Error('Only ADMIN can delete appointments');
      }
      throw new Error('Failed to delete appointment');
    }
  }

  async getTodaysAppointments(): Promise<Appointment[]> {
    try {
      const today = new Date().toISOString().split('T')[0];
      const response = await api.get<Appointment[]>(`${this.baseUrl}/by-date?date=${today}`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch today\'s appointments');
    }
  }
}

export const appointmentService = new AppointmentService();
export default appointmentService;