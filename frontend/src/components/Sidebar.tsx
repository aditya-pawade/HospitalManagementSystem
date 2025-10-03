import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  UserCheck,
  Calendar,
  CreditCard,
  FileText,
  Settings,
  BarChart3,
  Stethoscope,
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { clsx } from 'clsx';

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

interface NavigationItem {
  name: string;
  href: string;
  icon: React.ComponentType<any>;
  roles?: string[];
}

const navigationItems: NavigationItem[] = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    name: 'Patients',
    href: '/patients',
    icon: Users,
  },
  {
    name: 'Doctors',
    href: '/doctors',
    icon: UserCheck,
    roles: ['ADMIN', 'RECEPTIONIST'],
  },
  {
    name: 'Appointments',
    href: '/appointments',
    icon: Calendar,
  },
  {
    name: 'Billing',
    href: '/billing',
    icon: CreditCard,
    roles: ['ADMIN', 'RECEPTIONIST'],
  },
  {
    name: 'Prescriptions',
    href: '/prescriptions',
    icon: FileText,
    roles: ['DOCTOR'],
  },
  {
    name: 'Reports',
    href: '/reports',
    icon: BarChart3,
    roles: ['ADMIN'],
  },
  {
    name: 'Medical Records',
    href: '/medical-records',
    icon: Stethoscope,
    roles: ['DOCTOR', 'ADMIN'],
  },
];

const Sidebar: React.FC<SidebarProps> = ({ isOpen = true, onClose }) => {
  const location = useLocation();
  const { hasAnyRole } = useAuth();

  const isActive = (href: string) => {
    return location.pathname === href || location.pathname.startsWith(href + '/');
  };

  const filteredItems = navigationItems.filter(item => {
    if (!item.roles) return true;
    return hasAnyRole(item.roles);
  });

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden"
          onClick={onClose}
        >
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
        </div>
      )}

      {/* Sidebar */}
      <div
        className={clsx(
          'fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar header */}
          <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 lg:hidden">
            <span className="text-lg font-semibold text-gray-900">Menu</span>
            <button
              onClick={onClose}
              className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            >
              ×
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {filteredItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={onClose}
                  className={clsx(
                    'sidebar-link rounded-lg',
                    active && 'active'
                  )}
                >
                  <Icon size={20} className="mr-3" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Sidebar footer */}
          <div className="border-t border-gray-200 p-4">
            <Link
              to="/settings"
              onClick={onClose}
              className={clsx(
                'sidebar-link rounded-lg',
                isActive('/settings') && 'active'
              )}
            >
              <Settings size={20} className="mr-3" />
              <span className="font-medium">Settings</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;