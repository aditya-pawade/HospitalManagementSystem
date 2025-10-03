import { DashboardStats } from '../types';
import api from './api';

class DashboardService {
  async getDashboardStats(): Promise<DashboardStats> {
    try {
      // Since your backend doesn't have a dedicated dashboard endpoint,
      // we'll fetch data from individual endpoints and compile stats
      const [patients, doctors, appointments, bills] = await Promise.all([
        api.get('/patients?page=0&size=1000'), // Get all patients
        api.get('/doctors?page=0&size=1000'),   // Get all doctors
        api.get('/appointments?page=0&size=1000'), // Get all appointments
        api.get('/bills') // Get all bills
      ]);

      return {
        totalPatients: patients.data.length,
        totalDoctors: doctors.data.length,
        totalAppointments: appointments.data.length,
        totalBills: bills.data.length
      };
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      // Return default stats if API calls fail
      return {
        totalPatients: 0,
        totalDoctors: 0,
        totalAppointments: 0,
        totalBills: 0
      };
    }
  }

  async getRecentActivity(): Promise<any[]> {
    try {
      // Get recent appointments as activity
      const response = await api.get('/appointments?page=0&size=5');
      return response.data || [];
    } catch (error) {
      console.error('Error fetching recent activity:', error);
      return [];
    }
  }

  async getQuickStats(): Promise<{
    todayAppointments: number;
    pendingBills: number;
    activeDoctors: number;
  }> {
    try {
      // You can implement more specific endpoints later
      // For now, return basic stats
      return {
        todayAppointments: 0,
        pendingBills: 0,
        activeDoctors: 0
      };
    } catch (error) {
      console.error('Error fetching quick stats:', error);
      return {
        todayAppointments: 0,
        pendingBills: 0,
        activeDoctors: 0
      };
    }
  }
}

export const dashboardService = new DashboardService();
export default dashboardService;