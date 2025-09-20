package com.hms.controller;
import com.hms.entity.Prescription;
import com.hms.service.PrescriptionService;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import java.util.List;
@RestController
@RequestMapping("/api/prescriptions")
public class PrescriptionController {
    private final PrescriptionService service;
    public PrescriptionController(PrescriptionService service){ this.service = service; }
    @PostMapping public ResponseEntity<?> create(@RequestBody Prescription p){ return ResponseEntity.ok(service.create(p)); }
    @GetMapping("/patient/{patientId}") public ResponseEntity<List<Prescription>> byPatient(@PathVariable Long patientId){ return ResponseEntity.ok(service.findByPatient(patientId)); }
}
