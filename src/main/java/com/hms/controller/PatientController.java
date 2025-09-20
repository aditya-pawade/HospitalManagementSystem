package com.hms.controller;
import com.hms.entity.Patient;
import com.hms.service.PatientService;
import com.hms.dto.PatientDTO;
import com.hms.util.AuthUtil;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/patients")
public class PatientController {
    private final PatientService service;
    public PatientController(PatientService service){ this.service = service; }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody Patient p, @RequestHeader(value="role", required=false) String role){
        if(!AuthUtil.hasRole("ADMIN", role)) return ResponseEntity.status(403).body("Only ADMIN can add patients");
        return ResponseEntity.ok(toDto(service.savePatient(p)));
    }

    @GetMapping
    public ResponseEntity<List<PatientDTO>> all(@RequestParam(defaultValue="0") int page, @RequestParam(defaultValue="20") int size){
        return ResponseEntity.ok(service.getAllPatients(page,size).stream().map(this::toDto).collect(Collectors.toList()));
    }

    private PatientDTO toDto(Patient p){ PatientDTO dto = new PatientDTO(); dto.setId(p.getId()); dto.setName(p.getName()); dto.setAge(p.getAge()); dto.setAddress(p.getAddress()); dto.setGender(p.getGender()); dto.setPhone(p.getPhone()); return dto; }
}
