package com.hms.controller;

import com.hms.dto.AppointmentDTO;
import com.hms.entity.Appointment;
import com.hms.service.AppointmentService;
import com.util.AuthUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/appointments")
public class AppointmentController {

	@Autowired
	private AppointmentService appointmentService;

	// For ADMIN/STAFF to create appointment
	@PostMapping
	public ResponseEntity<Appointment> createAppointment(@RequestBody Appointment appointment) {
		Appointment saved = appointmentService.saveAppointment(appointment);
		return ResponseEntity.ok(saved);
	}

	// For PATIENT to book appointment
	@PostMapping("/book")
	public ResponseEntity<?> bookAppointment(@RequestBody Appointment appointment, @RequestHeader("role") String role) {

		if (!AuthUtil.hasRole("PATIENT", role)) {
			return ResponseEntity.status(403).body("❌ Only PATIENT can book appointments!");
		}

		Appointment saved = appointmentService.saveAppointment(appointment);
		return ResponseEntity.ok(saved);
	}

	@GetMapping
	public ResponseEntity<List<Appointment>> getAllAppointments() {
		return ResponseEntity.ok(appointmentService.getAllAppointments());
	}

	@GetMapping("/{id}")
	public ResponseEntity<Appointment> getAppointmentById(@PathVariable Long id) {
		return appointmentService.getAppointmentById(id).map(ResponseEntity::ok)
				.orElse(ResponseEntity.notFound().build());
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteAppointment(@PathVariable Long id) {
		appointmentService.deleteAppointment(id);
		return ResponseEntity.noContent().build();
	}

	@GetMapping("/dtos")
	public ResponseEntity<List<AppointmentDTO>> getAllAppointmentDTOs() {
		return ResponseEntity.ok(appointmentService.getAllAppointmentDTOs());
	}

	// For DOCTOR to update status
	@PutMapping("/{id}/status")
	public ResponseEntity<?> updateAppointmentStatus(@PathVariable Long id, @RequestHeader("role") String role,
			@RequestParam String status) {

		if (!AuthUtil.hasRole("DOCTOR", role)) {
			return ResponseEntity.status(403).body("Only DOCTOR can update status!");
		}

		return appointmentService.getAppointmentById(id).map(app -> {
			app.setStatus(status);
			Appointment updated = appointmentService.saveAppointment(app);
			return ResponseEntity.ok(updated);
		}).orElse(ResponseEntity.notFound().build());
	}
}
