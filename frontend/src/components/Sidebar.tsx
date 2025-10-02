import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Sidebar: React.FC = () => {
  const location = useLocation();
  const { user } = useAuth();

  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: '📊', roles: ['ADMIN', 'DOCTOR', 'RECEPTIONIST'] },
    { name: 'Patients', path: '/patients', icon: '👥', roles: ['ADMIN', 'DOCTOR', 'RECEPTIONIST'] },
    { name: 'Doctors', path: '/doctors', icon: '👨‍⚕️', roles: ['ADMIN', 'RECEPTIONIST'] },
    { name: 'Appointments', path: '/appointments', icon: '📅', roles: ['ADMIN', 'DOCTOR', 'RECEPTIONIST', 'PATIENT'] },
    { name: 'Billing', path: '/billing', icon: '💰', roles: ['ADMIN', 'RECEPTIONIST'] },
    { name: 'Profile', path: '/profile', icon: '👤', roles: ['ADMIN', 'DOCTOR', 'RECEPTIONIST', 'PATIENT'] },
  ];

  const filteredMenuItems = menuItems.filter(item => 
    item.roles.includes(user?.role || '')
  );

  const isActive = (path: string) => location.pathname === path;

  return (
    <aside className="bg-white w-64 min-h-screen shadow-lg">
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Menu</h2>
        <nav className="space-y-2">
          {filteredMenuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition ${
                isActive(item.path)
                  ? 'bg-primary-100 text-primary-700 font-semibold'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <span className="text-2xl">{item.icon}</span>
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
