package com.hms.controller;

import com.hms.entity.Doctor;
import com.hms.service.DoctorService;
import com.util.AuthUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/doctors")
public class DoctorController {

	@Autowired
	private DoctorService doctorService;

	// Only ADMIN can add doctor
	@PostMapping
	public ResponseEntity<?> addDoctor(@RequestBody Doctor doctor, @RequestHeader("role") String role) {

		if (!AuthUtil.hasRole("ADMIN", role)) {
			return ResponseEntity.status(403).body("Only ADMIN can add doctors!");
		}

		Doctor saved = doctorService.saveDoctor(doctor);
		return ResponseEntity.ok(saved);
	}

	// Get all doctors (any role can access)
	@GetMapping
	public ResponseEntity<List<Doctor>> getAllDoctors() {
		return ResponseEntity.ok(doctorService.getAllDoctors());
	}

	// Get doctor by ID (any role can access)
	@GetMapping("/{id}")
	public ResponseEntity<Doctor> getDoctorById(@PathVariable Long id) {
		return doctorService.getDoctorById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
	}

	// Only ADMIN can delete doctor
	@DeleteMapping("/{id}")
	public ResponseEntity<?> deleteDoctor(@PathVariable Long id, @RequestHeader("role") String role) {

		if (!AuthUtil.hasRole("ADMIN", role)) {
			return ResponseEntity.status(403).body("Only ADMIN can delete doctors!");
		}

		doctorService.deleteDoctor(id);
		return ResponseEntity.noContent().build();
	}

	// Only DOCTOR can update their profile
	@PutMapping("/{id}")
	public ResponseEntity<?> updateDoctorProfile(@PathVariable Long id, @RequestBody Doctor doctor,
			@RequestHeader("role") String role) {

		if (!AuthUtil.hasRole("DOCTOR", role)) {
			return ResponseEntity.status(403).body("Only DOCTOR can update their profile!");
		}

		return doctorService.getDoctorById(id).map(existing -> {
			existing.setName(doctor.getName());
			existing.setSpecialization(doctor.getSpecialization());
			existing.setPhone(doctor.getPhone());
			Doctor updated = doctorService.saveDoctor(existing);
			return ResponseEntity.ok(updated);
		}).orElse(ResponseEntity.notFound().build());
	}
}
