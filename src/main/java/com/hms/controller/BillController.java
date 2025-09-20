package com.hms.controller;
import com.hms.entity.Bill;
import com.hms.service.BillService;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import java.util.List;
@RestController
@RequestMapping("/api/bills")
public class BillController {
    private final BillService service;
    public BillController(BillService service){ this.service = service; }
    @PostMapping public ResponseEntity<?> create(@RequestBody Bill b){ return ResponseEntity.ok(service.create(b)); }
    @GetMapping("/patient/{patientId}") public ResponseEntity<List<Bill>> byPatient(@PathVariable Long patientId){ return ResponseEntity.ok(service.findByPatient(patientId)); }
}
