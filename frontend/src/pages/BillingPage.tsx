import React, { useState, useEffect } from 'react';
import { billingService } from '../services/billingService';
import { patientService } from '../services/patientService';
import type { Bill, PatientDTO } from '../types';
import Modal from '../components/Modal';
import LoadingSpinner from '../components/LoadingSpinner';

const BillingPage: React.FC = () => {
  const [bills, setBills] = useState<Bill[]>([]);
  const [patients, setPatients] = useState<PatientDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<Bill>({
    appointmentId: 0,
    patientId: 0,
    amount: 0,
    status: 'PENDING',
    transactionRef: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [billsData, patientsData] = await Promise.all([
        billingService.getAll(),
        patientService.getAll({ page: 0, size: 100 }),
      ]);
      setBills(billsData);
      setPatients(patientsData);
    } catch (error) {
      setError('Failed to fetch data');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = () => {
    setFormData({
      appointmentId: 0,
      patientId: 0,
      amount: 0,
      status: 'PENDING',
      transactionRef: '',
    });
    setIsModalOpen(true);
    setError('');
    setSuccess('');
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setError('');
    setSuccess('');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'appointmentId' || name === 'patientId' || name === 'amount' 
        ? parseFloat(value) 
        : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await billingService.create(formData);
      setSuccess('Bill generated successfully');
      fetchData();
      setTimeout(() => {
        handleCloseModal();
      }, 1500);
    } catch (error: any) {
      setError(error.response?.data || 'Failed to generate bill');
      console.error(error);
    }
  };

  const getPatientName = (patientId: number) => {
    const patient = patients.find(p => p.id === patientId);
    return patient?.name || `Patient #${patientId}`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PAID':
        return 'bg-green-100 text-green-800';
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800';
      case 'FAILED':
        return 'bg-red-100 text-red-800';
      case 'REFUNDED':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex-1 p-8">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="flex-1 p-8 bg-gray-50">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Billing</h1>
        <button
          onClick={handleOpenModal}
          className="btn-primary"
        >
          + Generate Bill
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {success}
        </div>
      )}

      <div className="card overflow-x-auto">
        <table className="min-w-full">
          <thead className="table-header">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bill ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Appointment ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction Ref</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {bills.map((bill) => (
              <tr key={bill.id} className="table-row">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{bill.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {getPatientName(bill.patientId)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{bill.appointmentId}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${bill.amount.toFixed(2)}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(bill.status)}`}>
                    {bill.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{bill.transactionRef || '-'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button className="text-primary-600 hover:text-primary-900">
                    View Invoice
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {bills.length === 0 && (
          <div className="text-center py-8 text-gray-500">No bills found</div>
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="Generate Bill"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}
          {success && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
              {success}
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Patient</label>
            <select
              name="patientId"
              value={formData.patientId}
              onChange={handleInputChange}
              required
              className="input-field"
            >
              <option value="">Select Patient</option>
              {patients.map(patient => (
                <option key={patient.id} value={patient.id}>
                  {patient.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Appointment ID</label>
            <input
              type="number"
              name="appointmentId"
              value={formData.appointmentId}
              onChange={handleInputChange}
              required
              className="input-field"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleInputChange}
              step="0.01"
              min="0"
              required
              className="input-field"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              required
              className="input-field"
            >
              <option value="PENDING">Pending</option>
              <option value="PAID">Paid</option>
              <option value="FAILED">Failed</option>
              <option value="REFUNDED">Refunded</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Transaction Reference (Optional)</label>
            <input
              type="text"
              name="transactionRef"
              value={formData.transactionRef}
              onChange={handleInputChange}
              className="input-field"
            />
          </div>
          <div className="flex space-x-2">
            <button type="submit" className="btn-primary flex-1">
              Generate Bill
            </button>
            <button type="button" onClick={handleCloseModal} className="btn-secondary flex-1">
              Cancel
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default BillingPage;
