package com.hms.controller;

import com.hms.entity.Patient;
import com.hms.service.PatientService;
import com.util.AuthUtil; // our helper for role checks
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/patients")
public class PatientController {

	@Autowired
	private PatientService patientService;

	// Create new patient (only ADMIN can add)
	@PostMapping
	public ResponseEntity<?> createPatient(@RequestBody Patient patient, @RequestHeader("role") String role) {

		if (!AuthUtil.hasRole("ADMIN", role)) {
			return ResponseEntity.status(403).body("Only ADMIN can add patients!");
		}

		Patient saved = patientService.savePatient(patient);
		return ResponseEntity.ok(saved);
	}

	// Get all patients (any role can access)
	@GetMapping
	public ResponseEntity<List<Patient>> getAllPatients() {
		return ResponseEntity.ok(patientService.getAllPatients());
	}

	// Get patient by ID (any role can access)
	@GetMapping("/{id}")
	public ResponseEntity<Patient> getPatientById(@PathVariable Long id) {
		return patientService.getPatientById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
	}

	// Delete patient (only ADMIN can delete)
	@DeleteMapping("/{id}")
	public ResponseEntity<?> deletePatient(@PathVariable Long id, @RequestHeader("role") String role) {

		if (!AuthUtil.hasRole("ADMIN", role)) {
			return ResponseEntity.status(403).body("Only ADMIN can delete patients!");
		}

		return patientService.getPatientById(id).map(patient -> {
			patientService.deletePatient(id);
			return ResponseEntity.noContent().build();
		}).orElse(ResponseEntity.notFound().build());
	}
}
