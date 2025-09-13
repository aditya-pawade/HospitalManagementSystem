package com.hms.controller;

import com.hms.dto.AppointmentDTO;
import com.hms.entity.Appointment;
import com.hms.service.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/appointments")
public class AppointmentController {

	@Autowired
	private AppointmentService appointmentService;

	@PostMapping
	public ResponseEntity<Appointment> createAppointment(@RequestBody Appointment appointment) {
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

	
	@PatchMapping("/{id}/status")
	public ResponseEntity<Appointment> updateAppointmentStatus(@PathVariable Long id, @RequestParam String status) {

		Appointment existing = appointmentService.getAppointmentById(id)
				.orElseThrow(() -> new RuntimeException("Appointment not found"));

		existing.setStatus(status);
		Appointment updated = appointmentService.saveAppointment(existing);

		return ResponseEntity.ok(updated);
	}
}
