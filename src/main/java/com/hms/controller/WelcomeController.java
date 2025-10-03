package com.hms.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
public class WelcomeController {

    @GetMapping("/")
    public Map<String, Object> welcome() {
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Hospital Management System API");
        response.put("status", "running");
        response.put("version", "1.0.0");
        
        Map<String, String> endpoints = new HashMap<>();
        endpoints.put("Authentication", "/api/auth/login, /api/auth/register");
        endpoints.put("Patients", "/api/patients");
        endpoints.put("Doctors", "/api/doctors");
        endpoints.put("Appointments", "/api/appointments");
        endpoints.put("Bills", "/api/bills");
        
        response.put("availableEndpoints", endpoints);
        
        Map<String, String> sampleCredentials = new HashMap<>();
        sampleCredentials.put("admin", "admin123");
        sampleCredentials.put("doctor", "doctor123");
        sampleCredentials.put("receptionist", "receptionist123");
        
        response.put("sampleCredentials", sampleCredentials);
        response.put("frontend", "http://localhost:3000");
        
        return response;
    }

    @GetMapping("/health")
    public Map<String, Object> health() {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "UP");
        response.put("timestamp", System.currentTimeMillis());
        return response;
    }

    @GetMapping("/api")
    public Map<String, Object> apiInfo() {
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Hospital Management System REST API");
        response.put("documentation", "Available endpoints:");
        
        Map<String, Object> endpoints = new HashMap<>();
        
        // Auth endpoints
        Map<String, String> auth = new HashMap<>();
        auth.put("POST /api/auth/login", "Login with username and password");
        auth.put("POST /api/auth/register", "Register new user");
        endpoints.put("Authentication", auth);
        
        // Patient endpoints
        Map<String, String> patients = new HashMap<>();
        patients.put("GET /api/patients", "Get all patients (ADMIN only)");
        patients.put("POST /api/patients", "Create new patient (ADMIN only)");
        patients.put("GET /api/patients/{id}", "Get patient by ID");
        endpoints.put("Patients", patients);
        
        // Doctor endpoints
        Map<String, String> doctors = new HashMap<>();
        doctors.put("GET /api/doctors", "Get all doctors");
        doctors.put("POST /api/doctors", "Create new doctor (ADMIN only)");
        doctors.put("PUT /api/doctors/{id}/approve", "Approve doctor (ADMIN only)");
        endpoints.put("Doctors", doctors);
        
        // Appointment endpoints
        Map<String, String> appointments = new HashMap<>();
        appointments.put("GET /api/appointments", "Get all appointments");
        appointments.put("POST /api/appointments", "Book appointment (PATIENT only)");
        appointments.put("PUT /api/appointments/{id}/status", "Update appointment status (DOCTOR/ADMIN)");
        appointments.put("GET /api/appointments/doctor/{doctorId}", "Get appointments by doctor");
        endpoints.put("Appointments", appointments);
        
        // Bill endpoints
        Map<String, String> bills = new HashMap<>();
        bills.put("POST /api/bills", "Create bill");
        bills.put("GET /api/bills/patient/{patientId}", "Get bills by patient");
        endpoints.put("Bills", bills);
        
        response.put("endpoints", endpoints);
        return response;
    }
}