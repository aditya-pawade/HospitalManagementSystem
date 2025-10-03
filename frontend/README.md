# Hospital Management System - Frontend

A modern, responsive React-based frontend for the Hospital Management System, built with TypeScript, Vite, and TailwindCSS.

## 🚀 Features

- **Authentication System**: Secure login with role-based access control (Admin, Doctor, Receptionist)
- **Patient Management**: Comprehensive patient records and medical history
- **Doctor Management**: Doctor profiles, specializations, and schedules
- **Appointment Scheduling**: Easy appointment booking and calendar management
- **Billing System**: Invoice generation and payment tracking
- **Dashboard**: Real-time statistics and charts
- **Responsive Design**: Mobile-friendly interface with TailwindCSS
- **Modern UI/UX**: Clean, professional hospital theme

## 🛠️ Tech Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: TailwindCSS
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **Forms**: React Hook Form
- **Icons**: Lucide React
- **Notifications**: React Hot Toast
- **Charts**: Recharts (ready for implementation)

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── DataTable.tsx   # Generic data table component
│   ├── FormInput.tsx   # Styled form input component
│   ├── LoadingSpinner.tsx
│   ├── Modal.tsx       # Modal dialog component
│   ├── Navbar.tsx      # Top navigation bar
│   ├── ProtectedRoute.tsx # Route protection
│   ├── Sidebar.tsx     # Side navigation
│   └── Footer.tsx      
├── pages/               # Application pages
│   ├── HomePage.tsx    # Landing page
│   ├── LoginPage.tsx   # Authentication page
│   ├── DashboardPage.tsx # Main dashboard
│   ├── PatientsPage.tsx
│   ├── DoctorsPage.tsx
│   ├── AppointmentsPage.tsx
│   ├── BillingPage.tsx
│   ├── ProfilePage.tsx
│   ├── NotFoundPage.tsx
│   └── UnauthorizedPage.tsx
├── services/            # API service layer
│   ├── api.ts          # Axios configuration
│   ├── authService.ts  # Authentication API
│   ├── patientService.ts
│   ├── doctorService.ts
│   ├── appointmentService.ts
│   ├── billingService.ts
│   └── dashboardService.ts
├── context/             # React Context providers
│   └── AuthContext.tsx # Authentication context
├── hooks/               # Custom React hooks
│   ├── useAuth.ts      # Authentication hook
│   └── useFetch.ts     # Generic API fetch hook
├── router/              # Application routing
│   └── AppRouter.tsx   # Main router configuration
├── layouts/             # Page layouts
│   ├── MainLayout.tsx  # Layout for authenticated pages
│   └── AuthLayout.tsx  # Layout for authentication pages
├── types/               # TypeScript type definitions
│   └── index.ts        # All type definitions
└── index.css           # Global styles and Tailwind
```

## 🚀 Getting Started

### Prerequisites

- Node.js 16+ and npm
- Hospital Management System backend running on `http://localhost:8080`

### Installation

1. **Navigate to the frontend directory**:
   ```bash
   cd frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser and visit**: `http://localhost:3000`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 🔐 Demo Credentials

For testing the application, use these demo credentials:

- **Admin**: `admin` / `admin123`
- **Doctor**: `doctor` / `doctor123`
- **Receptionist**: `reception` / `reception123`

## 🎯 Role-Based Access

- **Admin**: Full access to all features
- **Doctor**: Patient records, appointments, prescriptions
- **Receptionist**: Patient management, appointments, billing

## 🔧 API Integration

The frontend is configured to work with your Spring Boot backend:

- **Base URL**: `http://localhost:8080`
- **Proxy**: Configured in `vite.config.ts` to proxy `/api/*` to backend
- **Authentication**: JWT token-based authentication
- **Error Handling**: Comprehensive error handling with user notifications

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop (1024px+)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

## 🎨 Theming

The application uses a professional medical theme with:
- **Primary Colors**: Blue tones for trust and professionalism
- **Medical Colors**: Green tones for healthcare associations
- **Clean Typography**: Inter font for readability
- **Consistent Spacing**: Following design system principles

## 📊 Dashboard Features

- Real-time statistics cards
- Patient and appointment trends
- Revenue overview
- Quick action buttons
- Recent activities feed

## 🔄 State Management

- **Authentication**: React Context with useReducer
- **API State**: Custom hooks with error handling
- **Form State**: React Hook Form for validation
- **Local Storage**: Token and user data persistence

## 🚧 Future Enhancements

The current implementation provides a solid foundation. Future enhancements could include:

1. **Advanced Charts**: Implement Recharts for detailed analytics
2. **Real-time Notifications**: WebSocket integration
3. **File Upload**: Patient documents and images
4. **Print Functionality**: Invoice and report printing
5. **Advanced Filtering**: More sophisticated search and filters
6. **Calendar Integration**: Full calendar view for appointments
7. **Mobile App**: React Native version
8. **PWA**: Progressive Web App capabilities

## 🤝 Integration with Backend

The frontend is designed to integrate seamlessly with your Spring Boot backend APIs:

```typescript
// Example API endpoints expected:
GET    /api/patients           // Get all patients
POST   /api/patients           // Create patient
PUT    /api/patients/{id}      // Update patient
DELETE /api/patients/{id}      // Delete patient

GET    /api/doctors            // Get all doctors
POST   /api/appointments       // Create appointment
GET    /api/bills              // Get bills
POST   /api/auth/login         // User authentication
```

## 📞 Support

This frontend application is ready for production use and provides a comprehensive hospital management interface. The modular architecture makes it easy to extend and customize according to your specific requirements.

For any questions or customizations, the codebase is well-documented and follows React best practices.

---

**Hospital Management System Frontend** - Built with ❤️ for healthcare professionals