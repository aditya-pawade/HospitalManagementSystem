import React from 'react';
import { Calendar, Plus, Filter } from 'lucide-react';

const AppointmentsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Appointments</h1>
          <p className="text-gray-600">Schedule and manage patient appointments</p>
        </div>
        <button className="btn-primary inline-flex items-center space-x-2 mt-4 sm:mt-0">
          <Plus size={16} />
          <span>Book Appointment</span>
        </button>
      </div>

      {/* Calendar and Filters */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <div className="card p-6">
            <h3 className="font-medium text-gray-900 mb-4">Filters</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date Range
                </label>
                <input type="date" className="input-field" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Doctor
                </label>
                <select className="input-field">
                  <option>All Doctors</option>
                  <option>Dr. Smith</option>
                  <option>Dr. Johnson</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select className="input-field">
                  <option>All Status</option>
                  <option>Scheduled</option>
                  <option>Completed</option>
                  <option>Cancelled</option>
                </select>
              </div>
              <button className="w-full btn-secondary inline-flex items-center justify-center space-x-2">
                <Filter size={16} />
                <span>Apply Filters</span>
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-3">
          {/* Calendar and Appointments */}
          <div className="card p-6">
            <div className="flex items-center justify-center h-96 bg-gray-50 rounded-lg">
              <div className="text-center">
                <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Appointments Calendar</h3>
                <p className="text-gray-500">
                  Calendar view with appointment booking functionality will be implemented here
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentsPage;