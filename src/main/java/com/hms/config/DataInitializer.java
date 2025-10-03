package com.hms.config;

import com.hms.entity.User;
import com.hms.entity.Patient;
import com.hms.entity.Doctor;
import com.hms.service.UserService;
import com.hms.service.PatientService;
import com.hms.service.DoctorService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    private final UserService userService;
    private final PatientService patientService;
    private final DoctorService doctorService;

    public DataInitializer(UserService userService, PatientService patientService, DoctorService doctorService) {
        this.userService = userService;
        this.patientService = patientService;
        this.doctorService = doctorService;
    }

    @Override
    public void run(String... args) throws Exception {
        // Create sample users
        createSampleUsers();
        createSamplePatients();
        createSampleDoctors();
    }

    private void createSampleUsers() {
        try {
            // Admin user
            if (!userService.findByUsername("admin").isPresent()) {
                User admin = new User();
                admin.setUsername("admin");
                admin.setPassword("admin123");
                admin.setRole("ADMIN");
                userService.saveUser(admin);
                System.out.println("Created admin user: admin / admin123");
            }

            // Doctor user
            if (!userService.findByUsername("doctor").isPresent()) {
                User doctor = new User();
                doctor.setUsername("doctor");
                doctor.setPassword("doctor123");
                doctor.setRole("DOCTOR");
                userService.saveUser(doctor);
                System.out.println("Created doctor user: doctor / doctor123");
            }

            // Receptionist user
            if (!userService.findByUsername("receptionist").isPresent()) {
                User receptionist = new User();
                receptionist.setUsername("receptionist");
                receptionist.setPassword("receptionist123");
                receptionist.setRole("RECEPTIONIST");
                userService.saveUser(receptionist);
                System.out.println("Created receptionist user: receptionist / receptionist123");
            }
        } catch (Exception e) {
            System.out.println("Users may already exist: " + e.getMessage());
        }
    }

    private void createSamplePatients() {
        try {
            Patient patient1 = new Patient();
            patient1.setName("John Doe");
            patient1.setAge(30);
            patient1.setGender("Male");
            patient1.setAddress("123 Main St, City");
            patient1.setPhone("555-0101");
            patientService.savePatient(patient1);

            Patient patient2 = new Patient();
            patient2.setName("Jane Smith");
            patient2.setAge(25);
            patient2.setGender("Female");
            patient2.setAddress("456 Oak Ave, City");
            patient2.setPhone("555-0102");
            patientService.savePatient(patient2);

            Patient patient3 = new Patient();
            patient3.setName("Robert Johnson");
            patient3.setAge(45);
            patient3.setGender("Male");
            patient3.setAddress("789 Pine St, City");
            patient3.setPhone("555-0103");
            patientService.savePatient(patient3);

            System.out.println("Created sample patients");
        } catch (Exception e) {
            System.out.println("Sample patients may already exist: " + e.getMessage());
        }
    }

    private void createSampleDoctors() {
        try {
            Doctor doctor1 = new Doctor();
            doctor1.setName("Dr. Sarah Wilson");
            doctor1.setSpecialization("Cardiology");
            doctor1.setPhone("555-0201");
            doctor1.setEmail("sarah.wilson@hospital.com");
            doctor1.setStatus("ACTIVE");
            doctorService.saveDoctor(doctor1);

            Doctor doctor2 = new Doctor();
            doctor2.setName("Dr. Michael Brown");
            doctor2.setSpecialization("Neurology");
            doctor2.setPhone("555-0202");
            doctor2.setEmail("michael.brown@hospital.com");
            doctor2.setStatus("ACTIVE");
            doctorService.saveDoctor(doctor2);

            Doctor doctor3 = new Doctor();
            doctor3.setName("Dr. Emily Davis");
            doctor3.setSpecialization("Pediatrics");
            doctor3.setPhone("555-0203");
            doctor3.setEmail("emily.davis@hospital.com");
            doctor3.setStatus("PENDING");
            doctorService.saveDoctor(doctor3);

            System.out.println("Created sample doctors");
        } catch (Exception e) {
            System.out.println("Sample doctors may already exist: " + e.getMessage());
        }
    }
}