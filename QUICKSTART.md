# Quick Start Guide

Get the Hospital Management System up and running in minutes!

## Prerequisites

Before you begin, ensure you have:
- ✅ Java 11 or higher
- ✅ Maven 3.6+
- ✅ MySQL 8.0+
- ✅ Node.js 16+ and npm
- ✅ Git

## Step 1: Clone the Repository

```bash
git clone https://github.com/aditya-pawade/HospitalManagementSystem.git
cd HospitalManagementSystem
```

## Step 2: Set Up Database

1. **Start MySQL** (if not already running)

2. **Create the database**:
```sql
CREATE DATABASE hmsdb;
```

3. **Verify database credentials** in `src/main/resources/application.properties`:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/hmsdb
spring.datasource.username=root
spring.datasource.password=root
```

Update if your MySQL credentials are different.

## Step 3: Start the Backend

```bash
# In the root directory
mvn spring-boot:run
```

Wait until you see:
```
Tomcat started on port(s): 8080
```

**Backend is now running at:** http://localhost:8080

**API Documentation:** http://localhost:8080/swagger-ui.html

## Step 4: Set Up Frontend

**Open a new terminal** (keep the backend running)

```bash
cd frontend
npm install
```

This will install all frontend dependencies (~2-3 minutes).

## Step 5: Start the Frontend

```bash
npm run dev
```

**Frontend is now running at:** http://localhost:5173

## Step 6: Access the Application

Open your browser and navigate to:
👉 **http://localhost:5173**

### Login with Demo Credentials

#### Admin Account
- Username: `admin`
- Password: `admin123`
- Access: Full system access

#### Doctor Account
- Username: `doctor1`
- Password: `doctor123`
- Access: View patients, manage appointments

## What You Can Do

Once logged in, you can:

### As Admin
- ✅ View dashboard with statistics
- ✅ Manage patients (add, edit, delete)
- ✅ Manage doctors (add, approve, edit)
- ✅ View and manage appointments
- ✅ Generate and track bills
- ✅ Manage user profiles

### As Doctor
- ✅ View dashboard
- ✅ View patient records
- ✅ Manage appointments
- ✅ Update appointment status
- ✅ View billing information

## Exploring the Application

### 1. Home Page
The landing page with information about the hospital management system.

### 2. Dashboard
After login, you'll see:
- Total patients, doctors, appointments
- Charts showing trends
- Quick action buttons

### 3. Patients Management
- Click "Patients" in the sidebar
- Add new patient with the "+ Add Patient" button
- Edit or delete existing patients
- View patient details

### 4. Doctors Management
- Click "Doctors" in the sidebar
- Add new doctor (Admin only)
- Approve pending doctors (Admin only)
- View doctor specializations

### 5. Appointments
- Click "Appointments" in the sidebar
- Book new appointment with "+ Book Appointment"
- Select patient, doctor, date/time
- Approve, reject, or complete appointments

### 6. Billing
- Click "Billing" in the sidebar
- Generate new bills for appointments
- Track payment status
- View transaction references

### 7. Profile
- Click "Profile" in the sidebar
- View your account information
- Update preferences

## Troubleshooting

### Backend Won't Start

**Problem:** Port 8080 already in use
```bash
# Find and kill the process using port 8080
lsof -ti:8080 | xargs kill -9
```

**Problem:** Database connection error
- Verify MySQL is running
- Check database credentials in `application.properties`
- Ensure database `hmsdb` exists

### Frontend Won't Start

**Problem:** Port 5173 already in use
```bash
# Kill process on port 5173
lsof -ti:5173 | xargs kill -9
```

**Problem:** Module not found errors
```bash
# Clear node_modules and reinstall
cd frontend
rm -rf node_modules package-lock.json
npm install
```

### API Connection Error

**Problem:** Frontend can't connect to backend
- Ensure backend is running on http://localhost:8080
- Check `frontend/.env` has correct API URL:
  ```
  VITE_API_BASE_URL=http://localhost:8080/api
  ```

### Login Fails

**Problem:** Invalid credentials
- Use the demo credentials provided above
- Check if user exists in database
- Verify backend logs for authentication errors

## Creating Test Data

To create sample data for testing:

### Add a Patient
1. Login as admin
2. Go to "Patients"
3. Click "+ Add Patient"
4. Fill in:
   - Name: John Doe
   - Age: 35
   - Gender: Male
   - Phone: 1234567890
   - Address: 123 Main St

### Add a Doctor
1. Login as admin
2. Go to "Doctors"
3. Click "+ Add Doctor"
4. Fill in:
   - Name: Dr. Smith
   - Specialization: Cardiology
   - Phone: 0987654321
   - Email: dr.smith@hospital.com
5. Approve the doctor if status is "PENDING"

### Book an Appointment
1. Login as any user
2. Go to "Appointments"
3. Click "+ Book Appointment"
4. Select patient, doctor, date/time
5. Add notes (optional)
6. Submit

### Generate a Bill
1. Login as admin
2. Go to "Billing"
3. Click "+ Generate Bill"
4. Select patient and appointment
5. Enter amount
6. Set status (PENDING/PAID)

## Next Steps

### Development
- Explore the code in `src/` (backend) and `frontend/src/` (frontend)
- Make changes and see hot-reload in action
- Add new features or customize existing ones

### Production Deployment
- See [DEPLOYMENT.md](DEPLOYMENT.md) for production deployment guide
- Configure environment variables
- Set up SSL/HTTPS
- Configure production database

### API Testing
- Use Swagger UI at http://localhost:8080/swagger-ui.html
- Test API endpoints directly
- View request/response schemas

## Need Help?

- 📖 Read the full [README.md](README.md)
- 🚀 Check [DEPLOYMENT.md](DEPLOYMENT.md) for deployment
- 📝 Review frontend documentation in [frontend/README.md](frontend/README.md)
- 🐛 Report issues on GitHub

## Tips for Development

1. **Backend Changes**: Restart backend after modifying Java files
2. **Frontend Changes**: Hot reload automatically updates the browser
3. **Database Changes**: Update entity classes and restart backend
4. **API Changes**: Update service files in `frontend/src/services/`

## Keyboard Shortcuts

While using the application:
- `Ctrl + S` - Save changes
- `Esc` - Close modals
- `Tab` - Navigate form fields

## Performance Tips

- Use Chrome DevTools to monitor network requests
- Check backend console for API logs
- Monitor database queries in MySQL
- Use React DevTools for component debugging

---

**Congratulations! 🎉** You now have a fully functional Hospital Management System running locally!

Happy coding! 👨‍💻👩‍💻
