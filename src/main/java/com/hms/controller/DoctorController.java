
package com.hms.controller;

import com.hms.entity.Doctor;
import com.hms.service.DoctorService;
import com.util.AuthUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/doctors")
public class DoctorController {

    private final DoctorService doctorService;

    public DoctorController(DoctorService doctorService) {
        this.doctorService = doctorService;
    }

    @PostMapping
    public ResponseEntity<?> create(@Valid @RequestBody Doctor doctor, @RequestHeader(value = "role", required = false) String role) {
        if (!AuthUtil.hasRole("ADMIN", role)) {
            return ResponseEntity.status(403).body("Only ADMIN can add doctors!");
        }
        return ResponseEntity.ok(doctorService.saveDoctor(doctor));
    }

    @GetMapping
    public ResponseEntity<List<Doctor>> getAll() {
        return ResponseEntity.ok(doctorService.getAllDoctors());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> get(@PathVariable Long id) {
        return doctorService.getDoctorById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @Valid @RequestBody Doctor doctor, @RequestHeader(value = "role", required = false) String role) {
        if (!(AuthUtil.hasRole("DOCTOR", role) || AuthUtil.hasRole("ADMIN", role))) {
            return ResponseEntity.status(403).body("Only DOCTOR or ADMIN can update!");
        }
        return doctorService.getDoctorById(id).map(existing -> {
            existing.setSpecialization(doctor.getSpecialization());
            existing.setPhone(doctor.getPhone());
            existing.setEmail(doctor.getEmail());
            return ResponseEntity.ok(doctorService.saveDoctor(existing));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id, @RequestHeader(value = "role", required = false) String role) {
        if (!AuthUtil.hasRole("ADMIN", role)) {
            return ResponseEntity.status(403).body("Only ADMIN can delete!");
        }
        doctorService.deleteDoctor(id);
        return ResponseEntity.noContent().build();
    }
}
