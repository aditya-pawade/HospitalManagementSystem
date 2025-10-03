import { Patient, PatientFormData } from '../types';
import api from './api';

class PatientService {
  private readonly baseUrl = '/patients';

  async getAllPatients(page: number = 0, size: number = 20): Promise<Patient[]> {
    try {
      const response = await api.get<Patient[]>(`${this.baseUrl}?page=${page}&size=${size}`, {
        headers: {
          'role': 'ADMIN'
        }
      });
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 403) {
        throw new Error('Only ADMIN can view patients');
      }
      throw new Error('Failed to fetch patients');
    }
  }

  async getPatientById(id: number): Promise<Patient> {
    try {
      const response = await api.get<Patient>(`${this.baseUrl}/${id}`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch patient');
    }
  }

  async createPatient(patientData: PatientFormData): Promise<Patient> {
    try {
      const response = await api.post<Patient>(this.baseUrl, patientData, {
        headers: {
          'role': 'ADMIN'
        }
      });
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 403) {
        throw new Error('Only ADMIN can add patients');
      }
      throw new Error('Failed to create patient');
    }
  }

  async updatePatient(id: number, patientData: Partial<PatientFormData>): Promise<Patient> {
    try {
      const response = await api.put<Patient>(`${this.baseUrl}/${id}`, patientData, {
        headers: {
          'role': 'ADMIN'
        }
      });
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 403) {
        throw new Error('Only ADMIN can update patients');
      }
      throw new Error('Failed to update patient');
    }
  }

  async deletePatient(id: number): Promise<void> {
    try {
      await api.delete(`${this.baseUrl}/${id}`, {
        headers: {
          'role': 'ADMIN'
        }
      });
    } catch (error: any) {
      if (error.response?.status === 403) {
        throw new Error('Only ADMIN can delete patients');
      }
      throw new Error('Failed to delete patient');
    }
  }

  async searchPatients(query: string, page: number = 0, size: number = 20): Promise<Patient[]> {
    try {
      const response = await api.get<Patient[]>(`${this.baseUrl}/search?q=${encodeURIComponent(query)}&page=${page}&size=${size}`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to search patients');
    }
  }
}

export const patientService = new PatientService();
export default patientService;