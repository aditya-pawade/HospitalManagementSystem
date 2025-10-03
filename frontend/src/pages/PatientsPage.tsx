import React from 'react';
import { Users, Plus, Search, Filter } from 'lucide-react';

const PatientsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Patients</h1>
          <p className="text-gray-600">Manage patient records and information</p>
        </div>
        <button className="btn-primary inline-flex items-center space-x-2 mt-4 sm:mt-0">
          <Plus size={16} />
          <span>Add Patient</span>
        </button>
      </div>

      {/* Search and Filters */}
      <div className="card p-6">
        <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search patients..."
                className="input-field pl-10"
              />
            </div>
          </div>
          <button className="btn-secondary inline-flex items-center space-x-2">
            <Filter size={16} />
            <span>Filters</span>
          </button>
        </div>
      </div>

      {/* Patients Table Placeholder */}
      <div className="card p-6">
        <div className="flex items-center justify-center h-64 bg-gray-50 rounded-lg">
          <div className="text-center">
            <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Patients Management</h3>
            <p className="text-gray-500">
              Patient CRUD functionality with DataTable component will be implemented here
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientsPage;