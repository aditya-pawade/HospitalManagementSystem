import React from 'react';
import { CreditCard, Plus, Filter, Download } from 'lucide-react';

const BillingPage: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Billing</h1>
          <p className="text-gray-600">Manage bills and payment tracking</p>
        </div>
        <div className="flex space-x-2 mt-4 sm:mt-0">
          <button className="btn-secondary inline-flex items-center space-x-2">
            <Download size={16} />
            <span>Export</span>
          </button>
          <button className="btn-primary inline-flex items-center space-x-2">
            <Plus size={16} />
            <span>Create Bill</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">$45,230</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <CreditCard className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
        
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending Bills</p>
              <p className="text-2xl font-bold text-gray-900">89</p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-lg">
              <CreditCard className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>
        
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Paid Bills</p>
              <p className="text-2xl font-bold text-gray-900">234</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <CreditCard className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Overdue</p>
              <p className="text-2xl font-bold text-gray-900">12</p>
            </div>
            <div className="p-3 bg-red-100 rounded-lg">
              <CreditCard className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="card p-6">
        <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select className="input-field">
                <option>All Status</option>
                <option>Pending</option>
                <option>Paid</option>
                <option>Overdue</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date Range
              </label>
              <input type="date" className="input-field" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Patient
              </label>
              <input type="text" placeholder="Search patient..." className="input-field" />
            </div>
          </div>
          <button className="btn-secondary inline-flex items-center space-x-2">
            <Filter size={16} />
            <span>Apply</span>
          </button>
        </div>
      </div>

      {/* Bills Table Placeholder */}
      <div className="card p-6">
        <div className="flex items-center justify-center h-64 bg-gray-50 rounded-lg">
          <div className="text-center">
            <CreditCard className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Billing Management</h3>
            <p className="text-gray-500">
              Bill CRUD functionality with payment tracking and invoice generation will be implemented here
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillingPage;