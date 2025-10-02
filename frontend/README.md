# Hospital Management System - Frontend

Modern React-based frontend for the Hospital Management System built with TypeScript, Vite, TailwindCSS, and Recharts.

## 🚀 Tech Stack

- **React 18** with TypeScript
- **Vite** - Fast build tool and dev server
- **React Router v6** - Client-side routing
- **Axios** - HTTP client for API calls
- **TailwindCSS** - Utility-first CSS framework
- **Recharts** - Charting library for dashboard visualizations
- **Context API** - State management for authentication

## 📋 Features

### Core Pages

1. **Home Page** - Welcome page with hospital information
2. **Login Page** - User authentication
3. **Dashboard** - Overview with statistics and charts
4. **Patients Management** - Full CRUD operations for patients
5. **Doctors Management** - Manage doctors with approval workflow
6. **Appointments** - Book and manage appointments
7. **Billing** - Generate and manage bills
8. **Profile** - User profile management

### Key Features

- ✅ Role-based access control (ADMIN, DOCTOR, RECEPTIONIST, PATIENT)
- ✅ Protected routes with authentication
- ✅ Responsive design for mobile and desktop
- ✅ Real-time dashboard statistics
- ✅ Interactive charts and graphs
- ✅ Modal-based forms for data entry
- ✅ Clean and professional UI

## 🛠️ Installation

### Prerequisites

- Node.js 16+ and npm/yarn
- Backend API running on `http://localhost:8080`

### Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables (optional):
```bash
cp .env.example .env
# Edit .env if backend URL is different
```

4. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 📦 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🏗️ Project Structure

```
frontend/
├── src/
│   ├── components/       # Reusable UI components
│   ├── pages/           # Page components
│   ├── services/        # API service layer
│   ├── context/         # React Context for state management
│   ├── hooks/           # Custom React hooks
│   ├── router/          # Routing configuration
│   ├── types/           # TypeScript type definitions
│   ├── App.tsx          # Root component
│   └── main.tsx         # Application entry point
├── .env                 # Environment variables
├── tailwind.config.js   # TailwindCSS configuration
└── package.json         # Dependencies and scripts
```

## 🔐 Authentication

The application uses a simple authentication system with role-based access control.

### Demo Credentials

- **Admin**: username: `admin`, password: `admin123`
- **Doctor**: username: `doctor1`, password: `doctor123`

## 🔌 API Integration

All API calls are made through service files with base URL: `http://localhost:8080/api`

## 📱 Responsive Design

The application is fully responsive and works on desktop, tablet, and mobile devices.
