import React, { useState, useEffect } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { patientService } from '../services/patientService';
import { doctorService } from '../services/doctorService';
import { appointmentService } from '../services/appointmentService';
import LoadingSpinner from '../components/LoadingSpinner';

const DashboardPage: React.FC = () => {
  const [stats, setStats] = useState({
    totalPatients: 0,
    totalDoctors: 0,
    todayAppointments: 0,
    pendingAppointments: 0,
  });
  const [loading, setLoading] = useState(true);

  // Mock data for charts
  const appointmentTrendData = [
    { month: 'Jan', appointments: 65 },
    { month: 'Feb', appointments: 78 },
    { month: 'Mar', appointments: 90 },
    { month: 'Apr', appointments: 81 },
    { month: 'May', appointments: 95 },
    { month: 'Jun', appointments: 110 },
  ];

  const revenueData = [
    { month: 'Jan', revenue: 4000 },
    { month: 'Feb', revenue: 5200 },
    { month: 'Mar', revenue: 6100 },
    { month: 'Apr', revenue: 5800 },
    { month: 'May', revenue: 7200 },
    { month: 'Jun', revenue: 8500 },
  ];

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [patients, doctors, appointments] = await Promise.all([
          patientService.getAll({ page: 0, size: 1000 }),
          doctorService.getAll({ page: 0, size: 1000 }),
          appointmentService.getAll({ page: 0, size: 1000 }),
        ]);

        const today = new Date().toISOString().split('T')[0];
        const todayAppointments = appointments.filter(apt => 
          apt.appointmentDateTime.startsWith(today)
        ).length;

        const pendingAppointments = appointments.filter(apt => 
          apt.status === 'REQUESTED'
        ).length;

        setStats({
          totalPatients: patients.length,
          totalDoctors: doctors.length,
          todayAppointments,
          pendingAppointments,
        });
      } catch (error) {
        console.error('Failed to fetch dashboard stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex-1 p-8">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="flex-1 p-8 bg-gray-50">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="card bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Total Patients</p>
              <p className="text-3xl font-bold mt-2">{stats.totalPatients}</p>
            </div>
            <div className="text-5xl opacity-50">👥</div>
          </div>
        </div>

        <div className="card bg-gradient-to-r from-green-500 to-green-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Total Doctors</p>
              <p className="text-3xl font-bold mt-2">{stats.totalDoctors}</p>
            </div>
            <div className="text-5xl opacity-50">👨‍⚕️</div>
          </div>
        </div>

        <div className="card bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm">Today's Appointments</p>
              <p className="text-3xl font-bold mt-2">{stats.todayAppointments}</p>
            </div>
            <div className="text-5xl opacity-50">📅</div>
          </div>
        </div>

        <div className="card bg-gradient-to-r from-orange-500 to-orange-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm">Pending Appointments</p>
              <p className="text-3xl font-bold mt-2">{stats.pendingAppointments}</p>
            </div>
            <div className="text-5xl opacity-50">⏳</div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h2 className="text-xl font-bold mb-4">Appointment Trends</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={appointmentTrendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="appointments" stroke="#0ea5e9" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <h2 className="text-xl font-bold mb-4">Revenue Trends</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="revenue" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 card">
        <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="btn-primary">Add Patient</button>
          <button className="btn-primary">Add Doctor</button>
          <button className="btn-primary">Book Appointment</button>
          <button className="btn-primary">Generate Bill</button>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
