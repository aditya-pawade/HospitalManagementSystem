import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { User, Mail, Phone, Lock, Save, Edit } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { FormInput, LoadingSpinner } from '../components';
import toast from 'react-hot-toast';

interface ProfileForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

interface PasswordForm {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const ProfilePage: React.FC = () => {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);

  const {
    register: registerProfile,
    handleSubmit: handleProfileSubmit,
    formState: { errors: profileErrors },
    reset: resetProfile,
  } = useForm<ProfileForm>({
    defaultValues: {
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || '',
      phone: user?.phone || '',
    },
  });

  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    formState: { errors: passwordErrors },
    reset: resetPassword,
    watch,
  } = useForm<PasswordForm>();

  const watchNewPassword = watch('newPassword');

  const onProfileSubmit = async (data: ProfileForm) => {
    setIsUpdating(true);
    try {
      const success = await updateUser(data);
      if (success) {
        setIsEditing(false);
        toast.success('Profile updated successfully');
      }
    } catch (error) {
      toast.error('Failed to update profile');
    } finally {
      setIsUpdating(false);
    }
  };

  const onPasswordSubmit = async (_data: PasswordForm) => {
    // This would typically call an API to change password
    toast.success('Password change functionality would be implemented here');
    setShowPasswordForm(false);
    resetPassword();
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    resetProfile({
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || '',
      phone: user?.phone || '',
    });
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner size="lg" message="Loading profile..." />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Profile Settings</h1>
      </div>

      {/* Profile Information Card */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Personal Information</h2>
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="btn-secondary inline-flex items-center space-x-2"
            >
              <Edit size={16} />
              <span>Edit Profile</span>
            </button>
          )}
        </div>

        <form onSubmit={handleProfileSubmit(onProfileSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormInput
              label="First Name"
              leftIcon={<User size={18} />}
              disabled={!isEditing}
              error={profileErrors.firstName?.message}
              {...registerProfile('firstName', {
                required: 'First name is required',
              })}
            />

            <FormInput
              label="Last Name"
              leftIcon={<User size={18} />}
              disabled={!isEditing}
              error={profileErrors.lastName?.message}
              {...registerProfile('lastName', {
                required: 'Last name is required',
              })}
            />

            <FormInput
              label="Email"
              type="email"
              leftIcon={<Mail size={18} />}
              disabled={!isEditing}
              error={profileErrors.email?.message}
              {...registerProfile('email', {
                required: 'Email is required',
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: 'Invalid email address',
                },
              })}
            />

            <FormInput
              label="Phone"
              leftIcon={<Phone size={18} />}
              disabled={!isEditing}
              error={profileErrors.phone?.message}
              {...registerProfile('phone')}
            />
          </div>

          {/* User role and username (read-only) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <div className="input-field bg-gray-50 text-gray-500">
                {user.username}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Role
              </label>
              <div className="input-field bg-gray-50 text-gray-500 capitalize">
                {user.role.toLowerCase()}
              </div>
            </div>
          </div>

          {isEditing && (
            <div className="flex space-x-4">
              <button
                type="submit"
                disabled={isUpdating}
                className="btn-primary inline-flex items-center space-x-2"
              >
                {isUpdating ? (
                  <>
                    <LoadingSpinner size="sm" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Save size={16} />
                    <span>Save Changes</span>
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={handleCancelEdit}
                className="btn-secondary"
              >
                Cancel
              </button>
            </div>
          )}
        </form>
      </div>

      {/* Password Change Card */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Security</h2>
          {!showPasswordForm && (
            <button
              onClick={() => setShowPasswordForm(true)}
              className="btn-secondary inline-flex items-center space-x-2"
            >
              <Lock size={16} />
              <span>Change Password</span>
            </button>
          )}
        </div>

        {showPasswordForm ? (
          <form onSubmit={handlePasswordSubmit(onPasswordSubmit)} className="space-y-6">
            <FormInput
              label="Current Password"
              type="password"
              leftIcon={<Lock size={18} />}
              error={passwordErrors.currentPassword?.message}
              {...registerPassword('currentPassword', {
                required: 'Current password is required',
              })}
            />

            <FormInput
              label="New Password"
              type="password"
              leftIcon={<Lock size={18} />}
              error={passwordErrors.newPassword?.message}
              {...registerPassword('newPassword', {
                required: 'New password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters',
                },
              })}
            />

            <FormInput
              label="Confirm New Password"
              type="password"
              leftIcon={<Lock size={18} />}
              error={passwordErrors.confirmPassword?.message}
              {...registerPassword('confirmPassword', {
                required: 'Please confirm your password',
                validate: value =>
                  value === watchNewPassword || 'Passwords do not match',
              })}
            />

            <div className="flex space-x-4">
              <button type="submit" className="btn-primary">
                Update Password
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowPasswordForm(false);
                  resetPassword();
                }}
                className="btn-secondary"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <p className="text-gray-600">
            Keep your account secure by using a strong password and changing it regularly.
          </p>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;