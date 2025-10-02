import React, { useState, useEffect } from 'react';
import { appointmentService } from '../services/appointmentService';
import { patientService } from '../services/patientService';
import { doctorService } from '../services/doctorService';
import type { AppointmentDTO, AppointmentCreateDTO, AppointmentStatus, PatientDTO, DoctorDTO } from '../types';
import Modal from '../components/Modal';
import LoadingSpinner from '../components/LoadingSpinner';

const AppointmentsPage: React.FC = () => {
  const [appointments, setAppointments] = useState<AppointmentDTO[]>([]);
  const [patients, setPatients] = useState<PatientDTO[]>([]);
  const [doctors, setDoctors] = useState<DoctorDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<AppointmentCreateDTO>({
    patientId: 0,
    doctorId: 0,
    appointmentDateTime: '',
    notes: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [appointmentsData, patientsData, doctorsData] = await Promise.all([
        appointmentService.getAll({ page: 0, size: 100 }),
        patientService.getAll({ page: 0, size: 100 }),
        doctorService.getAll({ page: 0, size: 100 }),
      ]);
      setAppointments(appointmentsData);
      setPatients(patientsData);
      setDoctors(doctorsData);
    } catch (error) {
      setError('Failed to fetch data');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = () => {
    setFormData({
      patientId: 0,
      doctorId: 0,
      appointmentDateTime: '',
      notes: '',
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'patientId' || name === 'doctorId' ? parseInt(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await appointmentService.book(formData);
      setSuccess('Appointment booked successfully');
      fetchData();
      setTimeout(() => {
        handleCloseModal();
      }, 1500);
    } catch (error: any) {
      setError(error.response?.data || 'Failed to book appointment');
      console.error(error);
    }
  };

  const handleStatusUpdate = async (id: number, status: AppointmentStatus) => {
    try {
      await appointmentService.updateStatus(id, status);
      setSuccess('Appointment status updated');
      fetchData();
      setTimeout(() => setSuccess(''), 3000);
    } catch (error: any) {
      setError(error.response?.data || 'Failed to update status');
      console.error(error);
    }
  };

  const handleCancel = async (id: number) => {
    if (window.confirm('Are you sure you want to cancel this appointment?')) {
      await handleStatusUpdate(id, 'CANCELLED');
    }
  };

  const getPatientName = (patientId: number) => {
    const patient = patients.find(p => p.id === patientId);
    return patient?.name || `Patient #${patientId}`;
  };

  const getDoctorName = (doctorId: number) => {
    const doctor = doctors.find(d => d.id === doctorId);
    return doctor?.name || `Doctor #${doctorId}`;
  };

  const getStatusColor = (status: AppointmentStatus) => {
    switch (status) {
      case 'APPROVED':
        return 'bg-green-100 text-green-800';
      case 'REQUESTED':
        return 'bg-yellow-100 text-yellow-800';
      case 'COMPLETED':
        return 'bg-blue-100 text-blue-800';
      case 'CANCELLED':
      case 'REJECTED':
        return 'bg-red-100 text-red-800';
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
        <h1 className="text-3xl font-bold text-gray-800">Appointments</h1>
        <button
          onClick={handleOpenModal}
          className="btn-primary"
        >
          + Book Appointment
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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Doctor</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Notes</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {appointments.map((appointment) => (
              <tr key={appointment.id} className="table-row">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{appointment.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {getPatientName(appointment.patientId)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {getDoctorName(appointment.doctorId)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {new Date(appointment.appointmentDateTime).toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(appointment.status)}`}>
                    {appointment.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">{appointment.notes || '-'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  {appointment.status === 'REQUESTED' && (
                    <>
                      <button
                        onClick={() => handleStatusUpdate(appointment.id!, 'APPROVED')}
                        className="text-green-600 hover:text-green-900"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleStatusUpdate(appointment.id!, 'REJECTED')}
                        className="text-red-600 hover:text-red-900"
                      >
                        Reject
                      </button>
                    </>
                  )}
                  {appointment.status === 'APPROVED' && (
                    <>
                      <button
                        onClick={() => handleStatusUpdate(appointment.id!, 'COMPLETED')}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        Complete
                      </button>
                      <button
                        onClick={() => handleCancel(appointment.id!)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Cancel
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {appointments.length === 0 && (
          <div className="text-center py-8 text-gray-500">No appointments found</div>
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="Book Appointment"
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
                  {patient.name} (Age: {patient.age})
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Doctor</label>
            <select
              name="doctorId"
              value={formData.doctorId}
              onChange={handleInputChange}
              required
              className="input-field"
            >
              <option value="">Select Doctor</option>
              {doctors.filter(d => d.status === 'ACTIVE').map(doctor => (
                <option key={doctor.id} value={doctor.id}>
                  {doctor.name} - {doctor.specialization}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date & Time</label>
            <input
              type="datetime-local"
              name="appointmentDateTime"
              value={formData.appointmentDateTime}
              onChange={handleInputChange}
              required
              className="input-field"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              rows={3}
              className="input-field"
            />
          </div>
          <div className="flex space-x-2">
            <button type="submit" className="btn-primary flex-1">
              Book Appointment
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

export default AppointmentsPage;
