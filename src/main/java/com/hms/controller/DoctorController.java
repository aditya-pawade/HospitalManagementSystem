package com.hms.controller;
import com.hms.entity.Doctor;
import com.hms.service.DoctorService;
import com.hms.dto.DoctorDTO;
import com.hms.util.AuthUtil;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/doctors")
public class DoctorController {
    private final DoctorService service;
    public DoctorController(DoctorService service){ this.service = service; }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody Doctor doctor, @RequestHeader(value="role", required=false) String role){
        if(!AuthUtil.hasRole("ADMIN", role)) return ResponseEntity.status(403).body("Only ADMIN can add doctors");
        if(doctor.getStatus()==null) doctor.setStatus("PENDING");
        return ResponseEntity.ok(toDto(service.saveDoctor(doctor)));
    }

    @GetMapping
    public ResponseEntity<List<DoctorDTO>> all(@RequestParam(defaultValue="0") int page, @RequestParam(defaultValue="20") int size){
        return ResponseEntity.ok(service.getAllDoctors(page,size).stream().map(this::toDto).collect(Collectors.toList()));
    }

    @PutMapping("/{id}/approve")
    public ResponseEntity<?> approve(@PathVariable Long id, @RequestHeader(value="role", required=false) String role){
        if(!AuthUtil.hasRole("ADMIN", role)) return ResponseEntity.status(403).body("Only ADMIN can approve");
        return ResponseEntity.ok(toDto(service.approveDoctor(id)));
    }

    private DoctorDTO toDto(Doctor d){ DoctorDTO dto = new DoctorDTO(); dto.setId(d.getId()); dto.setName(d.getName()); dto.setSpecialization(d.getSpecialization()); dto.setPhone(d.getPhone()); dto.setEmail(d.getEmail()); dto.setStatus(d.getStatus()); return dto; }
}
