
HospitalManagementSystem - STS-ready (MySQL 5.x) REST API

How to run:
1. Create database in MySQL: CREATE DATABASE hmsdb;
2. Update credentials in src/main/resources/application.properties if needed.
3. Import project in STS as Existing Maven Project.
4. Ensure Lombok plugin enabled and annotation processing ON in IDE.
5. Run com.hms.HospitalManagementSystemApplication

Endpoints (examples):
- Doctors:    GET/POST/PUT/DELETE /api/doctors
- Patients:   GET/POST/PUT/DELETE /api/patients
- Appointments:
    POST   /api/appointments  (header: role=PATIENT)
    GET    /api/appointments
    GET    /api/appointments/{id}
    GET    /api/appointments/doctor/{doctorId}
    GET    /api/appointments/patient/{patientId}
    PUT    /api/appointments/{id}/status?status=APPROVED (header: role=DOCTOR)
    PUT    /api/appointments/{id}/complete (header: role=DOCTOR)
    DELETE /api/appointments/{id} (header: role=ADMIN)
- Prescriptions:
    POST /api/prescriptions/appointment/{appointmentId} (header: role=DOCTOR)
- Bills:
    POST /api/bills (header: role=ADMIN)

Notes:
- Roles are enforced via 'role' request header for now (no Spring Security).
- Simple Prescription (medicines as string) and Bill (amount + status) added.
