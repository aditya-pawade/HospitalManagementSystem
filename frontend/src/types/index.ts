export interface User {
  id: number;
  username: string;
  password?: string;
  role: 'ADMIN' | 'DOCTOR' | 'RECEPTIONIST' | 'PATIENT';
  name?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
}

export interface Patient {
  id: number;
  name: string;
  age: number;
  gender: string;
  address: string;
  phone: string;
}

export interface Doctor {
  id: number;
  name: string;
  specialization: string;
  phone: string;
  email: string;
  status: 'PENDING' | 'ACTIVE' | 'INACTIVE';
}

export interface Appointment {
  id: number;
  patient: Patient;
  doctor: Doctor;
  appointmentDateTime: string;
  status: 'REQUESTED' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED';
  notes?: string;
}

export interface Bill {
  id: number;
  appointmentId: number;
  patientId: number;
  amount: number;
  status: 'PENDING' | 'PAID' | 'CANCELLED';
  transactionRef?: string;
}

export interface Prescription {
  id: number;
  appointmentId: number;
  medication: string;
  dosage: string;
  duration: string;
  instructions?: string;
}

// API Response types
export interface LoginResponse {
  success: boolean;
  message: string;
  user?: {
    id: number;
    username: string;
    role: string;
  };
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

// Form data types
export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginFormData {
  username: string;
  password: string;
}

export interface PatientFormData {
  name: string;
  age: number;
  gender: string;
  address: string;
  phone: string;
}

export interface DoctorFormData {
  name: string;
  specialization: string;
  phone: string;
  email: string;
  status: 'PENDING' | 'ACTIVE' | 'INACTIVE';
}

export interface AppointmentFormData {
  patientId: number;
  doctorId: number;
  appointmentDateTime: string;
  notes?: string;
}

export interface BillFormData {
  appointmentId: number;
  patientId: number;
  amount: number;
}

// Dashboard Stats (simplified for your backend)
export interface DashboardStats {
  totalPatients: number;
  totalDoctors: number;
  totalAppointments: number;
  totalBills: number;
}