// User and Authentication Types
export interface User {
  id?: number;
  username: string;
  password?: string;
  role: 'ADMIN' | 'DOCTOR' | 'PATIENT' | 'RECEPTIONIST';
}

export interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

// Patient Types
export interface Patient {
  id?: number;
  name: string;
  age: number;
  gender: string;
  address: string;
  phone: string;
}

export interface PatientDTO {
  id?: number;
  name: string;
  age: number;
  address: string;
  gender: string;
  phone: string;
}

// Doctor Types
export interface Doctor {
  id?: number;
  name: string;
  specialization: string;
  phone: string;
  email: string;
  status?: string; // PENDING / ACTIVE / INACTIVE
}

export interface DoctorDTO {
  id?: number;
  name: string;
  specialization: string;
  phone: string;
  email: string;
  status?: string;
}

// Appointment Types
export type AppointmentStatus = 
  | 'REQUESTED' 
  | 'APPROVED' 
  | 'REJECTED' 
  | 'COMPLETED' 
  | 'CANCELLED';

export interface Appointment {
  id?: number;
  patient?: Patient;
  doctor?: Doctor;
  patientId?: number;
  doctorId?: number;
  appointmentDateTime: string;
  status: AppointmentStatus;
  notes?: string;
}

export interface AppointmentDTO {
  id?: number;
  patientId: number;
  doctorId: number;
  patientName?: string;
  doctorName?: string;
  appointmentDateTime: string;
  status: AppointmentStatus;
  notes?: string;
}

export interface AppointmentCreateDTO {
  patientId: number;
  doctorId: number;
  appointmentDateTime: string;
  notes?: string;
}

// Bill Types
export type PaymentStatus = 'PENDING' | 'PAID' | 'FAILED' | 'REFUNDED';

export interface Bill {
  id?: number;
  appointmentId: number;
  patientId: number;
  amount: number;
  status: PaymentStatus;
  transactionRef?: string;
}

export interface BillDTO {
  id?: number;
  appointmentId: number;
  amount: number;
  status: string;
}

// Dashboard Stats
export interface DashboardStats {
  totalPatients: number;
  totalDoctors: number;
  todayAppointments: number;
  pendingBills: number;
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginationParams {
  page?: number;
  size?: number;
}
