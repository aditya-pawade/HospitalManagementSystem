import React, { useState, useEffect } from 'react';
import { FileText, Search, Filter, Download, Eye, Plus, Calendar, User } from 'lucide-react';
import { toast } from 'react-hot-toast';
import api from '../services/api';
import { Patient } from '../types';

interface MedicalRecord {
  id: number;
  patientId: number;
  patientName: string;
  recordType: string;
  recordDate: string;
  description: string;
  doctorName: string;
  attachments?: string[];
}

const MedicalRecordsPage: React.FC = () => {
  const [records, setRecords] = useState<MedicalRecord[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPatient, setSelectedPatient] = useState('');
  const [selectedRecordType, setSelectedRecordType] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);

  const recordTypes = [
    'Consultation',
    'Prescription',
    'Lab Report',
    'X-Ray',
    'MRI',
    'CT Scan',
    'Surgery Report',
    'Discharge Summary',
    'Vaccination Record',
    'Other'
  ];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Fetch patients first
      const patientsRes = await api.get('/patients');
      setPatients(patientsRes.data);

      // Generate sample medical records (in real app, this would come from backend)
      const sampleRecords: MedicalRecord[] = patientsRes.data.flatMap((patient: Patient, index: number) => [
        {
          id: index * 3 + 1,
          patientId: patient.id,
          patientName: patient.name,
          recordType: 'Consultation',
          recordDate: '2025-10-01',
          description: 'Regular health checkup and consultation',
          doctorName: 'Dr. Sarah Wilson',
        },
        {
          id: index * 3 + 2,
          patientId: patient.id,
          patientName: patient.name,
          recordType: 'Lab Report',
          recordDate: '2025-09-28',
          description: 'Blood test results and complete blood count',
          doctorName: 'Dr. Michael Brown',
        },
        {
          id: index * 3 + 3,
          patientId: patient.id,
          patientName: patient.name,
          recordType: 'Prescription',
          recordDate: '2025-09-25',
          description: 'Medication prescribed for hypertension',
          doctorName: 'Dr. Emily Davis',
        }
      ]);

      setRecords(sampleRecords);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to load medical records');
    } finally {
      setLoading(false);
    }
  };

  const filteredRecords = records.filter(record => {
    const matchesSearch = record.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.doctorName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesPatient = !selectedPatient || record.patientId.toString() === selectedPatient;
    const matchesRecordType = !selectedRecordType || record.recordType === selectedRecordType;

    return matchesSearch && matchesPatient && matchesRecordType;
  });

  const handleCreateRecord = () => {
    setShowCreateModal(true);
  };

  const handleViewRecord = (recordId: number) => {
    toast.success(`Viewing medical record #${recordId}`);
    // In real app, this would open a detailed view modal
  };

  const handleDownloadRecord = (recordId: number) => {
    toast.success(`Downloading medical record #${recordId}`);
    // In real app, this would trigger file download
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Medical Records</h1>
          <p className="text-gray-600">Manage patient medical records and documents</p>
        </div>
        
        <button
          onClick={handleCreateRecord}
          className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Record
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search records..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          {/* Patient Filter */}
          <select
            value={selectedPatient}
            onChange={(e) => setSelectedPatient(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="">All Patients</option>
            {patients.map(patient => (
              <option key={patient.id} value={patient.id.toString()}>
                {patient.name}
              </option>
            ))}
          </select>

          {/* Record Type Filter */}
          <select
            value={selectedRecordType}
            onChange={(e) => setSelectedRecordType(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="">All Record Types</option>
            {recordTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>

          {/* Clear Filters */}
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedPatient('');
              setSelectedRecordType('');
            }}
            className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
          >
            <Filter className="w-4 h-4 mr-2" />
            Clear Filters
          </button>
        </div>
      </div>

      {/* Records List */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h3 className="text-lg font-semibold text-gray-900">
            Medical Records ({filteredRecords.length})
          </h3>
        </div>

        {filteredRecords.length === 0 ? (
          <div className="p-8 text-center">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No records found</h3>
            <p className="text-gray-600">No medical records match your current filters.</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {filteredRecords.map((record) => (
              <div key={record.id} className="p-6 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-2">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                        {record.recordType}
                      </span>
                      <span className="text-sm text-gray-500">
                        <Calendar className="w-4 h-4 inline mr-1" />
                        {record.recordDate}
                      </span>
                    </div>
                    
                    <h4 className="text-lg font-medium text-gray-900 mb-1">
                      {record.description}
                    </h4>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span className="flex items-center">
                        <User className="w-4 h-4 mr-1" />
                        Patient: {record.patientName}
                      </span>
                      <span>Doctor: {record.doctorName}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleViewRecord(record.id)}
                      className="inline-flex items-center px-3 py-1.5 text-sm text-primary-600 hover:text-primary-700 font-medium"
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </button>
                    <button
                      onClick={() => handleDownloadRecord(record.id)}
                      className="inline-flex items-center px-3 py-1.5 text-sm text-gray-600 hover:text-gray-700 font-medium"
                    >
                      <Download className="w-4 h-4 mr-1" />
                      Download
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Create Record Modal Placeholder */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                  Create New Medical Record
                </h3>
                <p className="text-gray-600 mb-4">
                  This feature would open a form to create a new medical record.
                </p>
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => setShowCreateModal(false)}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      setShowCreateModal(false);
                      toast.success('Record creation feature coming soon!');
                    }}
                    className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
                  >
                    Create Record
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MedicalRecordsPage;