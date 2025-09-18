
package com.hms.controller;

import com.hms.dto.AppointmentDTO;
import com.hms.enums.AppointmentStatus;
import com.hms.service.AppointmentService;
import com.util.AuthUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/appointments")
public class AppointmentController {

    private final AppointmentService appointmentService;

    public AppointmentController(AppointmentService appointmentService) {
        this.appointmentService = appointmentService;
    }

    @PostMapping
    public ResponseEntity<?> create(@Valid @RequestBody AppointmentDTO dto, @RequestHeader(value = "role", required = false) String role) {
        if (!AuthUtil.hasRole("PATIENT", role)) {
            return ResponseEntity.status(403).body("Only PATIENT can book appointments!");
        }
        return ResponseEntity.ok(appointmentService.createAppointment(dto));
    }

    @GetMapping
    public ResponseEntity<List<AppointmentDTO>> getAll() {
        return ResponseEntity.ok(appointmentService.getAllAppointments());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(appointmentService.getAppointmentById(id));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/doctor/{doctorId}")
    public ResponseEntity<List<AppointmentDTO>> byDoctor(@PathVariable Long doctorId) {
        return ResponseEntity.ok(appointmentService.getAppointmentsByDoctor(doctorId));
    }

    @GetMapping("/patient/{patientId}")
    public ResponseEntity<List<AppointmentDTO>> byPatient(@PathVariable Long patientId) {
        return ResponseEntity.ok(appointmentService.getAppointmentsByPatient(patientId));
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<?> updateStatus(@PathVariable Long id, @RequestParam String status, @RequestHeader(value = "role", required = false) String role) {
        if (!(AuthUtil.hasRole("DOCTOR", role) || AuthUtil.hasRole("ADMIN", role))) {
            return ResponseEntity.status(403).body("Only DOCTOR or ADMIN can update status!");
        }
        try {
            AppointmentStatus as = AppointmentStatus.valueOf(status.toUpperCase());
            return ResponseEntity.ok(appointmentService.updateAppointmentStatus(id, as));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("Invalid status. Use REQUESTED/APPROVED/REJECTED/COMPLETED");
        }
    }

    @PutMapping("/{id}/complete")
    public ResponseEntity<?> complete(@PathVariable Long id, @RequestHeader(value = "role", required = false) String role) {
        if (!AuthUtil.hasRole("DOCTOR", role)) {
            return ResponseEntity.status(403).body("Only DOCTOR can mark completed!");
        }
        return ResponseEntity.ok(appointmentService.updateAppointmentStatus(id, AppointmentStatus.COMPLETED));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id, @RequestHeader(value = "role", required = false) String role) {
        if (!AuthUtil.hasRole("ADMIN", role)) {
            return ResponseEntity.status(403).body("Only ADMIN can delete appointments!");
        }
        appointmentService.deleteAppointment(id);
        return ResponseEntity.noContent().build();
    }
}
