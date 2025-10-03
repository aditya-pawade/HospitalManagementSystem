import React, { useState, useEffect } from 'react';
import { BarChart3, FileText, TrendingUp, Users, Calendar, DollarSign } from 'lucide-react';
import { toast } from 'react-hot-toast';
import api from '../services/api';

interface ReportStats {
  totalPatients: number;
  totalDoctors: number;
  totalAppointments: number;
  totalRevenue: number;
  appointmentsThisMonth: number;
  patientsThisMonth: number;
}

const ReportsPage: React.FC = () => {
  const [stats, setStats] = useState<ReportStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState('thisMonth');

  useEffect(() => {
    fetchReportsData();
  }, [selectedPeriod]);

  const fetchReportsData = async () => {
    try {
      setLoading(true);
      
      // Fetch data from multiple endpoints
      const [patientsRes, doctorsRes, appointmentsRes] = await Promise.all([
        api.get('/patients'),
        api.get('/doctors'),
        api.get('/appointments')
      ]);

      const patients = patientsRes.data;
      const doctors = doctorsRes.data;
      const appointments = appointmentsRes.data;

      // Calculate basic stats
      const reportStats: ReportStats = {
        totalPatients: patients.length,
        totalDoctors: doctors.length,
        totalAppointments: appointments.length,
        totalRevenue: appointments.length * 500, // Assuming average consultation fee
        appointmentsThisMonth: appointments.length, // In real app, filter by current month
        patientsThisMonth: patients.length, // In real app, filter by current month
      };

      setStats(reportStats);
    } catch (error) {
      console.error('Error fetching reports data:', error);
      toast.error('Failed to load reports data');
    } finally {
      setLoading(false);
    }
  };

  const generateReport = (type: string) => {
    toast.success(`Generating ${type} report...`);
    // In a real app, this would trigger a download or open a new window
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  const reportCards = [
    {
      title: 'Total Patients',
      value: stats?.totalPatients || 0,
      icon: Users,
      color: 'bg-blue-500',
      textColor: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Total Doctors',
      value: stats?.totalDoctors || 0,
      icon: Users,
      color: 'bg-green-500',
      textColor: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Total Appointments',
      value: stats?.totalAppointments || 0,
      icon: Calendar,
      color: 'bg-yellow-500',
      textColor: 'text-yellow-600',
      bgColor: 'bg-yellow-50'
    },
    {
      title: 'Total Revenue',
      value: `₹${stats?.totalRevenue || 0}`,
      icon: DollarSign,
      color: 'bg-purple-500',
      textColor: 'text-purple-600',
      bgColor: 'bg-purple-50'
    }
  ];

  const reportTypes = [
    { name: 'Patient Report', description: 'Comprehensive patient statistics and demographics' },
    { name: 'Doctor Report', description: 'Doctor performance and availability analysis' },
    { name: 'Appointment Report', description: 'Appointment trends and scheduling analytics' },
    { name: 'Revenue Report', description: 'Financial summary and billing analytics' },
    { name: 'Monthly Summary', description: 'Complete monthly hospital operations summary' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-gray-600">View comprehensive reports and analytics</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="thisMonth">This Month</option>
            <option value="lastMonth">Last Month</option>
            <option value="thisYear">This Year</option>
            <option value="lastYear">Last Year</option>
          </select>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {reportCards.map((card, index) => {
          const IconComponent = card.icon;
          return (
            <div key={index} className={`${card.bgColor} rounded-lg p-6 border border-gray-200`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{card.title}</p>
                  <p className={`text-2xl font-bold ${card.textColor}`}>{card.value}</p>
                </div>
                <div className={`${card.color} p-3 rounded-full`}>
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Monthly Trends</h3>
            <BarChart3 className="w-5 h-5 text-gray-400" />
          </div>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <div className="text-center">
              <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500">Chart visualization would appear here</p>
              <p className="text-sm text-gray-400">Integration with charting library needed</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Department Distribution</h3>
            <BarChart3 className="w-5 h-5 text-gray-400" />
          </div>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <div className="text-center">
              <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500">Pie chart visualization would appear here</p>
              <p className="text-sm text-gray-400">Shows distribution by specialization</p>
            </div>
          </div>
        </div>
      </div>

      {/* Report Generation */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Generate Reports</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {reportTypes.map((report, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 mb-1">{report.name}</h4>
                  <p className="text-sm text-gray-600 mb-3">{report.description}</p>
                  <button
                    onClick={() => generateReport(report.name)}
                    className="inline-flex items-center text-sm text-primary-600 hover:text-primary-700 font-medium"
                  >
                    <FileText className="w-4 h-4 mr-1" />
                    Generate
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;