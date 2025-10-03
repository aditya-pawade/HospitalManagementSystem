import React from 'react';
import { 
  Users, 
  UserCheck, 
  Calendar, 
  CreditCard,
  TrendingUp,
  TrendingDown,
  Activity
} from 'lucide-react';

const DashboardPage: React.FC = () => {
  // Mock data - this would come from API in real implementation
  const stats = [
    {
      title: 'Total Patients',
      value: '1,234',
      change: '+12%',
      trend: 'up',
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      title: 'Total Doctors',
      value: '48',
      change: '+2%',
      trend: 'up',
      icon: UserCheck,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      title: "Today's Appointments",
      value: '32',
      change: '-5%',
      trend: 'down',
      icon: Calendar,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
    },
    {
      title: 'Pending Bills',
      value: '89',
      change: '+8%',
      trend: 'up',
      icon: CreditCard,
      color: 'text-red-600',
      bgColor: 'bg-red-100',
    },
  ];

  const recentAppointments = [
    { id: 1, patient: 'John Doe', doctor: 'Dr. Smith', time: '09:00 AM', status: 'Scheduled' },
    { id: 2, patient: 'Jane Smith', doctor: 'Dr. Johnson', time: '10:30 AM', status: 'Completed' },
    { id: 3, patient: 'Bob Wilson', doctor: 'Dr. Brown', time: '02:00 PM', status: 'Scheduled' },
    { id: 4, patient: 'Alice Davis', doctor: 'Dr. Smith', time: '03:30 PM', status: 'Cancelled' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Scheduled':
        return 'status-scheduled';
      case 'Completed':
        return 'status-completed';
      case 'Cancelled':
        return 'status-cancelled';
      default:
        return 'status-pending';
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome to your hospital management dashboard</p>
        </div>
        <div className="text-sm text-gray-500">
          Last updated: {new Date().toLocaleString()}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="card p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  <div className="flex items-center mt-2">
                    {stat.trend === 'up' ? (
                      <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                    )}
                    <span className={`text-sm ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                      {stat.change}
                    </span>
                    <span className="text-sm text-gray-500 ml-1">from last month</span>
                  </div>
                </div>
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Appointments */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Recent Appointments</h2>
            <Activity className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {recentAppointments.map((appointment) => (
              <div key={appointment.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{appointment.patient}</p>
                  <p className="text-sm text-gray-600">{appointment.doctor}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{appointment.time}</p>
                  <span className={`status-badge ${getStatusColor(appointment.status)}`}>
                    {appointment.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="card p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            <button className="p-4 text-left bg-primary-50 hover:bg-primary-100 rounded-lg transition-colors">
              <Users className="w-6 h-6 text-primary-600 mb-2" />
              <div className="text-sm font-medium text-primary-600">Add Patient</div>
            </button>
            <button className="p-4 text-left bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
              <Calendar className="w-6 h-6 text-green-600 mb-2" />
              <div className="text-sm font-medium text-green-600">Schedule Appointment</div>
            </button>
            <button className="p-4 text-left bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors">
              <UserCheck className="w-6 h-6 text-orange-600 mb-2" />
              <div className="text-sm font-medium text-orange-600">Add Doctor</div>
            </button>
            <button className="p-4 text-left bg-red-50 hover:bg-red-100 rounded-lg transition-colors">
              <CreditCard className="w-6 h-6 text-red-600 mb-2" />
              <div className="text-sm font-medium text-red-600">Generate Bill</div>
            </button>
          </div>
        </div>
      </div>

      {/* Charts placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Appointment Trends</h2>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">Chart implementation with Recharts would go here</p>
          </div>
        </div>
        
        <div className="card p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Revenue Overview</h2>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">Revenue chart implementation would go here</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;