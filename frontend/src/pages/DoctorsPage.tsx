import React, { useState, useEffect } from 'react';
import { doctorService } from '../services/doctorService';
import type { Doctor, DoctorDTO } from '../types';
import Modal from '../components/Modal';
import LoadingSpinner from '../components/LoadingSpinner';
import { useAuth } from '../hooks/useAuth';

const DoctorsPage: React.FC = () => {
  const [doctors, setDoctors] = useState<DoctorDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState<DoctorDTO | null>(null);
  const [formData, setFormData] = useState<Doctor>({
    name: '',
    specialization: '',
    phone: '',
    email: '',
    status: 'PENDING',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      setLoading(true);
      const data = await doctorService.getAll({ page: 0, size: 100 });
      setDoctors(data);
    } catch (error) {
      setError('Failed to fetch doctors');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (doctor?: DoctorDTO) => {
    if (doctor) {
      setEditingDoctor(doctor);
      setFormData(doctor);
    } else {
      setEditingDoctor(null);
      setFormData({
        name: '',
        specialization: '',
        phone: '',
        email: '',
        status: 'PENDING',
      });
    }
    setIsModalOpen(true);
    setError('');
    setSuccess('');
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingDoctor(null);
    setError('');
    setSuccess('');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingDoctor) {
        await doctorService.update(editingDoctor.id!, formData);
        setSuccess('Doctor updated successfully');
      } else {
        await doctorService.create(formData);
        setSuccess('Doctor created successfully');
      }
      fetchDoctors();
      setTimeout(() => {
        handleCloseModal();
      }, 1500);
    } catch (error: any) {
      setError(error.response?.data || 'Failed to save doctor');
      console.error(error);
    }
  };

  const handleApprove = async (id: number) => {
    try {
      await doctorService.approve(id);
      setSuccess('Doctor approved successfully');
      fetchDoctors();
      setTimeout(() => setSuccess(''), 3000);
    } catch (error: any) {
      setError(error.response?.data || 'Failed to approve doctor');
      console.error(error);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this doctor?')) {
      try {
        await doctorService.delete(id);
        setSuccess('Doctor deleted successfully');
        fetchDoctors();
        setTimeout(() => setSuccess(''), 3000);
      } catch (error) {
        setError('Failed to delete doctor');
        console.error(error);
      }
    }
  };

  const canModify = user?.role === 'ADMIN';

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
        <h1 className="text-3xl font-bold text-gray-800">Doctors</h1>
        {canModify && (
          <button
            onClick={() => handleOpenModal()}
            className="btn-primary"
          >
            + Add Doctor
          </button>
        )}
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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Specialization</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {doctors.map((doctor) => (
              <tr key={doctor.id} className="table-row">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{doctor.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{doctor.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{doctor.specialization}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{doctor.phone}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{doctor.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    doctor.status === 'ACTIVE' ? 'bg-green-100 text-green-800' :
                    doctor.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {doctor.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  {canModify && (
                    <>
                      <button
                        onClick={() => handleOpenModal(doctor)}
                        className="text-primary-600 hover:text-primary-900"
                      >
                        Edit
                      </button>
                      {doctor.status === 'PENDING' && (
                        <button
                          onClick={() => handleApprove(doctor.id!)}
                          className="text-green-600 hover:text-green-900"
                        >
                          Approve
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(doctor.id!)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </>
                  )}
                  {!canModify && <span className="text-gray-500">View Only</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {doctors.length === 0 && (
          <div className="text-center py-8 text-gray-500">No doctors found</div>
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingDoctor ? 'Edit Doctor' : 'Add Doctor'}
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="input-field"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Specialization</label>
            <input
              type="text"
              name="specialization"
              value={formData.specialization}
              onChange={handleInputChange}
              required
              className="input-field"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
              className="input-field"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="input-field"
            />
          </div>
          <div className="flex space-x-2">
            <button type="submit" className="btn-primary flex-1">
              {editingDoctor ? 'Update' : 'Create'}
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

export default DoctorsPage;
