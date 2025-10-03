import { Doctor, DoctorFormData } from '../types';
import api from './api';

class DoctorService {
  private readonly baseUrl = '/doctors';

  async getAllDoctors(page: number = 0, size: number = 20): Promise<Doctor[]> {
    try {
      const response = await api.get<Doctor[]>(`${this.baseUrl}?page=${page}&size=${size}`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch doctors');
    }
  }

  async getDoctorById(id: number): Promise<Doctor> {
    try {
      const response = await api.get<Doctor>(`${this.baseUrl}/${id}`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch doctor');
    }
  }

  async createDoctor(doctorData: DoctorFormData): Promise<Doctor> {
    try {
      const response = await api.post<Doctor>(this.baseUrl, doctorData, {
        headers: {
          'role': 'ADMIN'
        }
      });
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 403) {
        throw new Error('Only ADMIN can add doctors');
      }
      throw new Error('Failed to create doctor');
    }
  }

  async updateDoctor(id: number, doctorData: Partial<DoctorFormData>): Promise<Doctor> {
    try {
      const response = await api.put<Doctor>(`${this.baseUrl}/${id}`, doctorData, {
        headers: {
          'role': 'ADMIN'
        }
      });
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 403) {
        throw new Error('Only ADMIN can update doctors');
      }
      throw new Error('Failed to update doctor');
    }
  }

  async deleteDoctor(id: number): Promise<void> {
    try {
      await api.delete(`${this.baseUrl}/${id}`, {
        headers: {
          'role': 'ADMIN'
        }
      });
    } catch (error: any) {
      if (error.response?.status === 403) {
        throw new Error('Only ADMIN can delete doctors');
      }
      throw new Error('Failed to delete doctor');
    }
  }

  async approveDoctor(id: number): Promise<Doctor> {
    try {
      const response = await api.put<Doctor>(`${this.baseUrl}/${id}/approve`, {}, {
        headers: {
          'role': 'ADMIN'
        }
      });
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 403) {
        throw new Error('Only ADMIN can approve doctors');
      }
      throw new Error('Failed to approve doctor');
    }
  }

  async getDoctorsBySpecialization(specialization: string): Promise<Doctor[]> {
    try {
      const response = await api.get<Doctor[]>(`${this.baseUrl}/by-specialization?specialization=${encodeURIComponent(specialization)}`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch doctors by specialization');
    }
  }

  async getActiveDoctors(): Promise<Doctor[]> {
    try {
      const response = await api.get<Doctor[]>(`${this.baseUrl}/active`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch active doctors');
    }
  }
}

export const doctorService = new DoctorService();
export default doctorService;