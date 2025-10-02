import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import ProtectedRoute from '../components/ProtectedRoute';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';

// Pages
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import DashboardPage from '../pages/DashboardPage';
import PatientsPage from '../pages/PatientsPage';
import DoctorsPage from '../pages/DoctorsPage';
import AppointmentsPage from '../pages/AppointmentsPage';
import BillingPage from '../pages/BillingPage';
import ProfilePage from '../pages/ProfilePage';
import NotFoundPage from '../pages/NotFoundPage';

const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />

            {/* Protected Routes with Sidebar */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <div className="flex flex-1">
                    <Sidebar />
                    <DashboardPage />
                  </div>
                </ProtectedRoute>
              }
            />
            <Route
              path="/patients"
              element={
                <ProtectedRoute allowedRoles={['ADMIN', 'DOCTOR', 'RECEPTIONIST']}>
                  <div className="flex flex-1">
                    <Sidebar />
                    <PatientsPage />
                  </div>
                </ProtectedRoute>
              }
            />
            <Route
              path="/doctors"
              element={
                <ProtectedRoute allowedRoles={['ADMIN', 'RECEPTIONIST']}>
                  <div className="flex flex-1">
                    <Sidebar />
                    <DoctorsPage />
                  </div>
                </ProtectedRoute>
              }
            />
            <Route
              path="/appointments"
              element={
                <ProtectedRoute>
                  <div className="flex flex-1">
                    <Sidebar />
                    <AppointmentsPage />
                  </div>
                </ProtectedRoute>
              }
            />
            <Route
              path="/billing"
              element={
                <ProtectedRoute allowedRoles={['ADMIN', 'RECEPTIONIST']}>
                  <div className="flex flex-1">
                    <Sidebar />
                    <BillingPage />
                  </div>
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <div className="flex flex-1">
                    <Sidebar />
                    <ProfilePage />
                  </div>
                </ProtectedRoute>
              }
            />

            {/* 404 Route */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
          <Footer />
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default AppRouter;
