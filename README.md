# Hospital Management System

A comprehensive Hospital Management System with a Spring Boot backend and React frontend.

## 🏗️ Architecture

- **Backend**: Spring Boot REST API with MySQL database
- **Frontend**: React + TypeScript with Vite, TailwindCSS, and Recharts

## 🚀 Backend Setup

### Prerequisites

- Java 11+
- Maven 3.6+
- MySQL 8.0+

### Installation

1. Create MySQL database `hmsdb`:
```sql
CREATE DATABASE hmsdb;
```

2. Update database credentials in `src/main/resources/application.properties` if needed.

3. Enable Lombok in your IDE.

4. Run the backend:
```bash
mvn spring-boot:run
```

The API will be available at: http://localhost:8080

Swagger UI: http://localhost:8080/swagger-ui.html

## 🎨 Frontend Setup

### Prerequisites

- Node.js 16+
- npm or yarn

### Installation

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will be available at: http://localhost:5173

For more details, see [frontend/README.md](frontend/README.md)

## 📋 Features

### Backend APIs

- **Authentication**: User login and registration
- **Patient Management**: CRUD operations for patient records
- **Doctor Management**: Manage doctors with approval workflow
- **Appointment Management**: Book, update, and cancel appointments
- **Billing**: Generate and manage bills
- **Role-Based Access Control**: ADMIN, DOCTOR, RECEPTIONIST, PATIENT roles

### Frontend Features

- **Responsive Design**: Works on desktop, tablet, and mobile
- **Dashboard**: Statistics and charts for key metrics
- **Patient Management**: Full CRUD with modal forms
- **Doctor Management**: Manage doctors with status tracking
- **Appointments**: Interactive booking and status management
- **Billing**: Generate invoices and track payments
- **Profile Management**: User profile and preferences
- **Protected Routes**: Role-based access control

## 🔐 Demo Credentials

- **Admin**: username: `admin`, password: `admin123`
- **Doctor**: username: `doctor1`, password: `doctor123`

## 📦 Project Structure

```
HospitalManagementSystem/
├── src/main/java/com/hms/       # Backend Java code
│   ├── controller/              # REST controllers
│   ├── entity/                  # JPA entities
│   ├── service/                 # Business logic
│   ├── repository/              # Data access layer
│   └── dto/                     # Data transfer objects
├── frontend/                    # React frontend
│   ├── src/
│   │   ├── components/          # Reusable UI components
│   │   ├── pages/               # Page components
│   │   ├── services/            # API integration
│   │   ├── context/             # State management
│   │   └── router/              # Routing configuration
│   └── public/                  # Static assets
└── README.md                    # This file
```

## 🛠️ Technology Stack

### Backend
- Spring Boot 2.x
- Spring Data JPA
- MySQL
- Lombok
- Swagger/OpenAPI

### Frontend
- React 18
- TypeScript
- Vite
- React Router v6
- Axios
- TailwindCSS
- Recharts

## 🚦 Development Workflow

1. Start the backend server:
```bash
mvn spring-boot:run
```

2. In a new terminal, start the frontend:
```bash
cd frontend
npm run dev
```

3. Access the application at http://localhost:5173

## 📝 API Documentation

Once the backend is running, visit:
- Swagger UI: http://localhost:8080/swagger-ui.html
- API Docs: http://localhost:8080/v3/api-docs

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is for educational purposes.
