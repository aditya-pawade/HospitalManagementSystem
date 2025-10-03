import { Bill, BillFormData } from '../types';
import api from './api';

class BillingService {
  private readonly baseUrl = '/bills';

  async getAllBills(): Promise<Bill[]> {
    try {
      const response = await api.get<Bill[]>(this.baseUrl);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch bills');
    }
  }

  async getBillById(id: number): Promise<Bill> {
    try {
      const response = await api.get<Bill>(`${this.baseUrl}/${id}`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch bill');
    }
  }

  async createBill(billData: BillFormData): Promise<Bill> {
    try {
      const response = await api.post<Bill>(this.baseUrl, billData);
      return response.data;
    } catch (error) {
      throw new Error('Failed to create bill');
    }
  }

  async updateBill(id: number, billData: Partial<BillFormData>): Promise<Bill> {
    try {
      const response = await api.put<Bill>(`${this.baseUrl}/${id}`, billData);
      return response.data;
    } catch (error) {
      throw new Error('Failed to update bill');
    }
  }

  async deleteBill(id: number): Promise<void> {
    try {
      await api.delete(`${this.baseUrl}/${id}`);
    } catch (error) {
      throw new Error('Failed to delete bill');
    }
  }

  async getBillsByPatient(patientId: number): Promise<Bill[]> {
    try {
      const response = await api.get<Bill[]>(`${this.baseUrl}/patient/${patientId}`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch patient bills');
    }
  }

  async updatePaymentStatus(id: number, status: 'PENDING' | 'PAID' | 'CANCELLED'): Promise<Bill> {
    try {
      const response = await api.put<Bill>(`${this.baseUrl}/${id}/status`, { status });
      return response.data;
    } catch (error) {
      throw new Error('Failed to update payment status');
    }
  }

  async getPendingBills(): Promise<Bill[]> {
    try {
      const response = await api.get<Bill[]>(`${this.baseUrl}/pending`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch pending bills');
    }
  }

  async getPaidBills(): Promise<Bill[]> {
    try {
      const response = await api.get<Bill[]>(`${this.baseUrl}/paid`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch paid bills');
    }
  }
}

export const billingService = new BillingService();
export default billingService;