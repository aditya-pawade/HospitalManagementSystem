import apiClient from './api';
import type { Bill } from '../types';

export const billingService = {
  // Create new bill
  create: async (bill: Bill): Promise<Bill> => {
    const response = await apiClient.post('/bills', bill);
    return response.data;
  },

  // Get bills by patient
  getByPatient: async (patientId: number): Promise<Bill[]> => {
    const response = await apiClient.get(`/bills/patient/${patientId}`);
    return response.data;
  },

  // Get all bills (if endpoint exists)
  getAll: async (): Promise<Bill[]> => {
    try {
      const response = await apiClient.get('/bills');
      return response.data;
    } catch (error) {
      // If endpoint doesn't exist, return empty array
      return [];
    }
  },
};
