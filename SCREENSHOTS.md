# Hospital Management System - Screenshots

Visual guide to the Hospital Management System frontend application.

## 🏠 Home Page

The landing page welcomes users with information about the hospital management system.

![Home Page](https://github.com/user-attachments/assets/8e0ce66c-1a08-4dbf-a6f2-fa864a6818f5)

**Features:**
- Clean, professional design with medical theme
- Welcome message and system overview
- Three main service cards (Patient, Doctor, Appointment Management)
- List of hospital services with checkmarks
- Prominent "Login to Get Started" call-to-action button
- Responsive layout that works on all devices
- Footer with copyright information

---

## 🔐 Login Page

Secure authentication page for different user roles.

![Login Page](https://github.com/user-attachments/assets/9dafe138-d6b5-4c66-9175-f5a08179af8a)

**Features:**
- Simple, centered login form
- Username and password fields
- Large, accessible sign-in button
- Demo credentials displayed for easy testing
- Support for multiple roles (ADMIN, DOCTOR)
- Clean gradient background
- Hospital logo/icon at the top
- Responsive design for mobile and desktop

**Demo Credentials:**
- Admin: `admin` / `admin123`
- Doctor: `doctor1` / `doctor123`

---

## 📊 Dashboard (After Login)

The dashboard provides an overview of the hospital's key metrics and statistics.

**Features:**
- **Sidebar Navigation**: Quick access to all main features
  - Dashboard
  - Patients
  - Doctors
  - Appointments
  - Billing
  - Profile
- **Statistics Cards**: Display key metrics
  - Total Patients
  - Total Doctors
  - Today's Appointments
  - Pending Appointments
- **Charts and Graphs**:
  - Appointment trends (Line chart)
  - Revenue trends (Bar chart)
- **Quick Actions**: Buttons for common tasks
  - Add Patient
  - Add Doctor
  - Book Appointment
  - Generate Bill
- **Role-based Access**: Different views for Admin, Doctor, and Receptionist

---

## 👥 Patients Management

Comprehensive patient record management system.

**Features:**
- **Data Table**: List of all patients with details
  - ID, Name, Age, Gender, Phone, Address
  - Sortable columns
  - Pagination support
- **CRUD Operations**:
  - ➕ Add new patient
  - ✏️ Edit existing patient
  - 🗑️ Delete patient
- **Modal Forms**: Clean, focused data entry
- **Form Validation**: Ensures data quality
- **Search and Filter**: Find patients quickly
- **Responsive Table**: Horizontal scroll on mobile

---

## 👨‍⚕️ Doctors Management

Manage doctor profiles, specializations, and status.

**Features:**
- **Doctor Directory**: Complete list of doctors
  - ID, Name, Specialization, Phone, Email, Status
- **Status Management**:
  - PENDING (newly added doctors)
  - ACTIVE (approved doctors)
  - INACTIVE (temporarily unavailable)
- **Admin Controls**:
  - Add new doctor
  - Approve pending doctors
  - Edit doctor information
  - Delete doctor records
- **Specialization Tracking**: Cardiology, Neurology, etc.
- **Role-based Access**: Only ADMIN can approve/modify
- **Status Badges**: Color-coded status indicators

---

## 📅 Appointments Management

Interactive appointment booking and management system.

**Features:**
- **Appointment Calendar**: Visual date selection
- **Booking Form**:
  - Select patient from dropdown
  - Select doctor from dropdown
  - Choose date and time
  - Add optional notes
- **Appointment List**: Comprehensive table view
  - Patient name
  - Doctor name
  - Date and time
  - Status (REQUESTED, APPROVED, REJECTED, COMPLETED, CANCELLED)
  - Notes
- **Status Management**:
  - Approve pending appointments
  - Reject inappropriate requests
  - Mark as completed
  - Cancel appointments
- **Doctor-specific View**: Doctors see only their appointments
- **Status Badges**: Color-coded for easy identification

---

## 💰 Billing Management

Generate and track medical bills and payments.

**Features:**
- **Bill Generation**: Create new bills
  - Link to appointment
  - Select patient
  - Enter amount
  - Set status (PENDING, PAID, FAILED, REFUNDED)
  - Add transaction reference
- **Bill Tracking**: Comprehensive list
  - Bill ID
  - Patient name
  - Appointment ID
  - Amount
  - Payment status
  - Transaction reference
- **Status Management**: Track payment lifecycle
- **Invoice Actions**: View/download invoice options
- **Financial Overview**: Quick status overview
- **Currency Formatting**: Proper monetary display

---

## 👤 Profile Page

User profile and account management.

**Features:**
- **User Information Display**:
  - Username
  - Role (ADMIN, DOCTOR, etc.)
  - Account status
- **Profile Picture**: Avatar with user initial
- **Account Details**:
  - Username
  - Role
  - Status indicator
- **Security Options**:
  - Change password button
  - Two-factor authentication toggle
- **Preferences**:
  - Email notifications
  - SMS notifications
  - 2FA settings
- **Account Tips**: Helpful security reminders

---

## 🚫 404 Not Found Page

Custom error page for invalid routes.

**Features:**
- Large "404" display
- Clear error message
- "Go Back Home" button
- Consistent design with rest of application
- Helpful navigation

---

## 🎨 Design System

### Color Scheme
- **Primary Blue**: `#0ea5e9` - Primary actions, links, headings
- **Success Green**: `#10b981` - Success messages, approved status
- **Warning Yellow**: `#f59e0b` - Pending status, warnings
- **Danger Red**: `#ef4444` - Delete actions, errors, rejected status
- **Gray Scale**: Professional neutral tones for text and backgrounds

### Typography
- Clean, modern sans-serif fonts
- Hierarchical heading sizes
- Readable body text
- Bold weights for emphasis

### Components
- **Cards**: White background with shadow, rounded corners
- **Buttons**: 
  - Primary: Blue with hover effect
  - Secondary: Gray with hover effect
  - Danger: Red for destructive actions
- **Tables**: Clean rows with hover effects
- **Modals**: Centered overlay with backdrop
- **Forms**: Clear labels, validation feedback
- **Status Badges**: Rounded pills with color coding

### Icons
- Medical-themed icons (🏥, 👨‍⚕️, 👥, 📅, 💰)
- SVG icons for UI elements
- Consistent sizing and styling

### Responsive Design
- **Desktop**: Full sidebar navigation, multi-column layouts
- **Tablet**: Collapsible sidebar, adapted layouts
- **Mobile**: Hamburger menu, single-column layouts, touch-friendly buttons

---

## 🔑 User Roles and Permissions

### ADMIN
- Full access to all features
- Manage patients, doctors, appointments, billing
- Approve/reject doctors
- Generate reports
- System configuration

### DOCTOR
- View patient records
- Manage own appointments
- Update appointment status
- View billing information
- Limited access to other doctors' data

### RECEPTIONIST
- Manage patients and appointments
- Handle billing
- Book appointments
- View doctor schedules
- Cannot approve doctors

### PATIENT
- View own appointments
- Book new appointments
- View own billing
- Update profile
- Limited system access

---

## 🌐 Responsive Features

All pages are fully responsive and adapt to different screen sizes:

- **Desktop (1024px+)**: Full sidebar, multi-column layouts
- **Tablet (768px-1023px)**: Collapsible sidebar, 2-column layouts
- **Mobile (<768px)**: Bottom navigation, single-column layouts

Key responsive features:
- Collapsible sidebar on mobile
- Touch-friendly buttons and inputs
- Horizontal scrolling tables
- Stacked card layouts
- Mobile-optimized forms
- Responsive navigation

---

## ✨ Interactive Features

### Real-time Updates
- Instant feedback on user actions
- Loading spinners during API calls
- Success/error notifications

### Form Validation
- Required field indicators
- Format validation (email, phone)
- Inline error messages
- Submit button state management

### Modal Interactions
- Click outside to close
- ESC key support
- Smooth animations
- Focus management

### Table Features
- Sortable columns
- Pagination controls
- Search/filter capabilities
- Row hover effects
- Action buttons

---

## 🎯 Key Features Summary

✅ **Authentication**: Secure login with role-based access
✅ **Dashboard**: Real-time statistics and charts
✅ **Patient Management**: Full CRUD operations
✅ **Doctor Management**: Approval workflow
✅ **Appointments**: Interactive booking system
✅ **Billing**: Invoice generation and tracking
✅ **Profile**: User account management
✅ **Responsive**: Works on all devices
✅ **Modern UI**: Clean, professional design
✅ **Error Handling**: User-friendly error messages
✅ **Loading States**: Clear feedback during operations
✅ **Form Validation**: Data quality assurance

---

## 📱 Mobile Experience

The application is optimized for mobile devices with:
- Touch-friendly buttons (minimum 44px height)
- Readable text sizes (minimum 16px to prevent zoom)
- Simplified navigation
- Optimized forms with mobile keyboards
- Fast loading times
- Offline capability (future enhancement)

---

## 🎨 Accessibility Features

- Semantic HTML elements
- ARIA labels where needed
- Keyboard navigation support
- Focus indicators
- Color contrast compliance
- Screen reader friendly
- Alt text for images
- Form labels and descriptions

---

This visual guide demonstrates the complete Hospital Management System frontend application with modern design, comprehensive features, and excellent user experience across all devices.
