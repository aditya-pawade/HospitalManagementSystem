import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute } from '../components';
import MainLayout from '../layouts/MainLayout';
import AuthLayout from '../layouts/AuthLayout';

// Pages
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import SignupPage from '../pages/SignupPage';
import DashboardPage from '../pages/DashboardPage';
import PatientsPage from '../pages/PatientsPage';
import DoctorsPage from '../pages/DoctorsPage';
import AppointmentsPage from '../pages/AppointmentsPage';
import BillingPage from '../pages/BillingPage';
import ReportsPage from '../pages/ReportsPage';
import MedicalRecordsPage from '../pages/MedicalRecordsPage';
import ProfilePage from '../pages/ProfilePage';
import NotFoundPage from '../pages/NotFoundPage';
import UnauthorizedPage from '../pages/UnauthorizedPage';

const AppRouter: React.FC = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<HomePage />} />
      
      {/* Auth routes */}
      <Route path="/login" element={
        <AuthLayout>
          <LoginPage />
        </AuthLayout>
      } />
      
      <Route path="/signup" element={
        <AuthLayout>
          <SignupPage />
        </AuthLayout>
      } />

      {/* Protected routes - Dashboard and main app */}
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <MainLayout>
            <DashboardPage />
          </MainLayout>
        </ProtectedRoute>
      } />

      {/* Patients - All roles can view, Admin/Receptionist can manage */}
      <Route path="/patients" element={
        <ProtectedRoute>
          <MainLayout>
            <PatientsPage />
          </MainLayout>
        </ProtectedRoute>
      } />

      {/* Doctors - Admin and Receptionist can manage */}
      <Route path="/doctors" element={
        <ProtectedRoute requiredRoles={['ADMIN', 'RECEPTIONIST']}>
          <MainLayout>
            <DoctorsPage />
          </MainLayout>
        </ProtectedRoute>
      } />

      {/* Appointments - All roles */}
      <Route path="/appointments" element={
        <ProtectedRoute>
          <MainLayout>
            <AppointmentsPage />
          </MainLayout>
        </ProtectedRoute>
      } />

      {/* Billing - Admin and Receptionist */}
      <Route path="/billing" element={
        <ProtectedRoute requiredRoles={['ADMIN', 'RECEPTIONIST']}>
          <MainLayout>
            <BillingPage />
          </MainLayout>
        </ProtectedRoute>
      } />

      {/* Reports - Admin only */}
      <Route path="/reports" element={
        <ProtectedRoute requiredRoles={['ADMIN']}>
          <MainLayout>
            <ReportsPage />
          </MainLayout>
        </ProtectedRoute>
      } />

      {/* Medical Records - Admin and Doctors */}
      <Route path="/medical-records" element={
        <ProtectedRoute requiredRoles={['ADMIN', 'DOCTOR']}>
          <MainLayout>
            <MedicalRecordsPage />
          </MainLayout>
        </ProtectedRoute>
      } />

      {/* Profile - All authenticated users */}
      <Route path="/profile" element={
        <ProtectedRoute>
          <MainLayout>
            <ProfilePage />
          </MainLayout>
        </ProtectedRoute>
      } />

      {/* Error pages */}
      <Route path="/unauthorized" element={<UnauthorizedPage />} />
      <Route path="/404" element={<NotFoundPage />} />
      
      {/* Catch all - redirect to 404 */}
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
};

export default AppRouter;