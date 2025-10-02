import React from 'react';
import { useAuth } from '../hooks/useAuth';

const ProfilePage: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="flex-1 p-8 bg-gray-50">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Profile</h1>

      <div className="max-w-2xl">
        <div className="card">
          <div className="flex items-center mb-6">
            <div className="bg-primary-600 text-white rounded-full w-20 h-20 flex items-center justify-center text-3xl font-bold">
              {user?.username.charAt(0).toUpperCase()}
            </div>
            <div className="ml-6">
              <h2 className="text-2xl font-bold text-gray-800">{user?.username}</h2>
              <p className="text-gray-600">{user?.role}</p>
            </div>
          </div>

          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold mb-4">Account Information</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Username:</span>
                <span className="font-medium">{user?.username}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Role:</span>
                <span className="font-medium">{user?.role}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Status:</span>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">Active</span>
              </div>
            </div>
          </div>

          <div className="border-t mt-6 pt-6">
            <h3 className="text-lg font-semibold mb-4">Security</h3>
            <button className="btn-primary">
              Change Password
            </button>
          </div>

          <div className="border-t mt-6 pt-6">
            <h3 className="text-lg font-semibold mb-4">Preferences</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Email Notifications</span>
                <input type="checkbox" className="w-5 h-5" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">SMS Notifications</span>
                <input type="checkbox" className="w-5 h-5" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Two-Factor Authentication</span>
                <input type="checkbox" className="w-5 h-5" />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 card bg-blue-50 border-l-4 border-blue-500">
          <h3 className="font-semibold text-blue-800 mb-2">Account Tips</h3>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Keep your password secure and change it regularly</li>
            <li>• Enable two-factor authentication for extra security</li>
            <li>• Review your profile information periodically</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
