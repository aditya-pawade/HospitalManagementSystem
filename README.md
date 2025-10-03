# 🏥 Hospital Management System (HMS)

A comprehensive, full-stack Hospital Management System built with modern technologies.

## 🚀 **Live Demo**
**Frontend**: [https://hospitalmanagementapplications.netlify.app](https://hospitalmanagementapplications.netlify.app)

## 🎯 **Project Status**
- ✅ **Frontend**: Successfully deployed on Netlify
- ✅ **Database**: Integrated with Supabase PostgreSQL
- ⏳ **Backend**: Ready for deployment (Spring Boot)
- ✅ **Authentication**: Role-based access control implemented
- ✅ **Features**: Complete HMS functionality

## 🛠️ **Tech Stack**

### Frontend
- **React 18** with TypeScript
- **Vite** for build tooling
- **Tailwind CSS** for styling
- **React Router** for navigation
- **Axios** for API calls
- **React Hook Form** for form handling
- **React Hot Toast** for notifications

### Backend
- **Spring Boot 2.7.14**
- **Spring Security** for authentication
- **Spring Data JPA** for database operations
- **PostgreSQL** (Supabase cloud database)
- **Maven** for dependency management

### Deployment
- **Frontend**: Netlify
- **Database**: Supabase PostgreSQL
- **Backend**: Ready for Railway/Heroku/Render

## 📋 **Features**

### 🔐 **Authentication & Authorization**
- Multi-role system (Admin, Doctor, Receptionist, Patient)
- Secure login and registration
- Role-based access control
- JWT token authentication

### 👥 **User Management**
- **Admin**: Full system control
- **Doctor**: Patient and appointment management
- **Receptionist**: Hospital operations
- **Patient**: Appointment booking and health records

### 🩺 **Core Modules**
- **Patient Management**: Registration, records, health history
- **Doctor Management**: Profiles, specializations, schedules
- **Appointment System**: Booking, scheduling, status tracking
- **Billing System**: Invoice generation, payment tracking
- **Prescription Management**: Digital prescriptions
- **Reports & Analytics**: Dashboard with insights
- **Medical Records**: Digital health records

## 🚀 **Quick Start**

### Prerequisites
- Node.js 18+ 
- Java 17+
- Maven 3.6+
- Git

### 1. Clone Repository
```bash
git clone https://github.com/aditya-pawade/HospitalManagementSystem.git
cd HospitalManagementSystem
git checkout HMS-beta-VS-version
```

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
**Frontend runs on**: http://localhost:5173

### 3. Backend Setup
```bash
# Update application.properties with your database config
mvn clean install
mvn spring-boot:run
```
**Backend runs on**: http://localhost:8080

**Swagger UI**: http://localhost:8080/swagger-ui.html

## 🌐 **Deployment Instructions**

### Frontend (✅ Already Deployed)
The frontend is live on Netlify with automatic deployments from the `HMS-beta-VS-version` branch.

### Backend Deployment Options

#### Option A: Railway (Recommended)
1. Connect your GitHub repository to Railway
2. Select `HMS-beta-VS-version` branch
3. Set environment variables
4. Deploy automatically

#### Option B: Heroku
1. Create Heroku app
2. Connect to GitHub repository
3. Enable automatic deployments
4. Set config vars

#### Option C: Render
1. Create new web service on Render
2. Connect GitHub repository
3. Configure build settings
4. Deploy

### Environment Variables
```bash
# Backend
SPRING_DATASOURCE_URL=jdbc:postgresql://your-db-url
SPRING_DATASOURCE_USERNAME=your-username
SPRING_DATASOURCE_PASSWORD=your-password

# Frontend (Netlify)
VITE_API_BASE_URL=https://your-backend-url.com/api
```

## 📂 **Project Structure**
```
HMS/
├── frontend/                 # React TypeScript app
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/          # Route pages
│   │   ├── services/       # API services
│   │   ├── context/        # React context
│   │   ├── hooks/          # Custom hooks
│   │   └── types/          # TypeScript interfaces
│   └── dist/               # Built files
├── src/main/java/com/hms/   # Spring Boot backend
│   ├── controller/         # REST controllers
│   ├── service/            # Business logic
│   ├── repository/         # Data access
│   ├── entity/             # JPA entities
│   └── dto/                # Data transfer objects
└── src/main/resources/      # Configuration files
```

## 🔧 **Configuration**

### Database (Supabase PostgreSQL)
The project is configured to use Supabase PostgreSQL. Connection details are in:
- `src/main/resources/application-supabase.properties`

### API Endpoints
```
POST   /api/auth/login          # User login
POST   /api/auth/register       # User registration
GET    /api/patients            # Get all patients
POST   /api/patients            # Create patient
GET    /api/doctors             # Get all doctors
POST   /api/appointments        # Create appointment
GET    /api/bills               # Get bills
POST   /api/prescriptions       # Create prescription
```

## 🎯 **Demo Credentials**
```
Admin:       admin / admin123
Doctor:      doctor / doctor123
Receptionist: reception / reception123
```

## 🐛 **Known Issues & Solutions**

### Issue: Login not working on live site
**Cause**: Backend not yet deployed  
**Solution**: Deploy backend and update `VITE_API_BASE_URL`

### Issue: CORS errors
**Solution**: Backend includes CORS configuration for frontend domain

## 🤝 **Contributing**
1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📄 **License**
This project is licensed under the MIT License.

## 🙏 **Acknowledgments**
- React community for excellent documentation
- Spring Boot for robust backend framework
- Netlify for seamless frontend hosting
- Supabase for reliable database service

## 📞 **Support**
For support, please open an issue in the GitHub repository.

---
**Made with ❤️ for healthcare management**
