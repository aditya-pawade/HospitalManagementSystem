
package com.hms.controller;

import com.hms.entity.Patient;
import com.hms.service.PatientService;
import com.util.AuthUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/patients")
public class PatientController {

    private final PatientService patientService;

    public PatientController(PatientService patientService) {
        this.patientService = patientService;
    }

    @PostMapping
    public ResponseEntity<?> create(@Valid @RequestBody Patient patient, @RequestHeader(value = "role", required = false) String role) {
        if (!AuthUtil.hasRole("ADMIN", role)) {
            return ResponseEntity.status(403).body("Only ADMIN can add patients!");
        }
        return ResponseEntity.ok(patientService.savePatient(patient));
    }

    @GetMapping
    public ResponseEntity<List<Patient>> getAll() {
        return ResponseEntity.ok(patientService.getAllPatients());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> get(@PathVariable Long id) {
        return patientService.getPatientById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @Valid @RequestBody Patient patient, @RequestHeader(value = "role", required = false) String role) {
        if (!(AuthUtil.hasRole("PATIENT", role) || AuthUtil.hasRole("ADMIN", role))) {
            return ResponseEntity.status(403).body("Only PATIENT or ADMIN can update!");
        }
        return patientService.getPatientById(id).map(existing -> {
            existing.setAddress(patient.getAddress());
            existing.setPhone(patient.getPhone());
            return ResponseEntity.ok(patientService.savePatient(existing));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id, @RequestHeader(value = "role", required = false) String role) {
        if (!AuthUtil.hasRole("ADMIN", role)) {
            return ResponseEntity.status(403).body("Only ADMIN can delete!");
        }
        patientService.deletePatient(id);
        return ResponseEntity.noContent().build();
    }
}
