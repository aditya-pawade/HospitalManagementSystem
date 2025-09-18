
package com.hms.controller;

import com.hms.dto.PrescriptionDTO;
import com.hms.service.PrescriptionService;
import com.util.AuthUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/prescriptions")
public class PrescriptionController {

    private final PrescriptionService prescriptionService;

    public PrescriptionController(PrescriptionService prescriptionService) {
        this.prescriptionService = prescriptionService;
    }

    @PostMapping("/appointment/{appointmentId}")
    public ResponseEntity<?> create(@PathVariable Long appointmentId, @Valid @RequestBody PrescriptionDTO dto, @RequestHeader(value = "role", required = false) String role) {
        if (!AuthUtil.hasRole("DOCTOR", role)) {
            return ResponseEntity.status(403).body("Only DOCTOR can create prescription!");
        }
        return ResponseEntity.ok(prescriptionService.createPrescription(appointmentId, dto));
    }
}
