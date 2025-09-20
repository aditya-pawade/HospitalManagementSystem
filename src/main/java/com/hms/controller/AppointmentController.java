package com.hms.controller;
import com.hms.entity.Appointment;
import com.hms.enums.AppointmentStatus;
import com.hms.service.AppointmentService;
import com.hms.dto.AppointmentDTO;
import com.hms.util.AuthUtil;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/appointments")
public class AppointmentController {
    private final AppointmentService service;
    public AppointmentController(AppointmentService service){ this.service = service; }

    @PostMapping
    public ResponseEntity<?> book(@RequestBody Appointment a, @RequestHeader(value="role", required=false) String role){
        if(!AuthUtil.hasRole("PATIENT", role)) return ResponseEntity.status(403).body("Only PATIENT can book");
        a.setStatus(AppointmentStatus.REQUESTED);
        return ResponseEntity.ok(toDto(service.saveAppointment(a)));
    }

    @GetMapping
    public ResponseEntity<List<AppointmentDTO>> all(@RequestParam(defaultValue="0") int page, @RequestParam(defaultValue="20") int size){
        return ResponseEntity.ok(service.getAllAppointments(page,size).stream().map(this::toDto).collect(Collectors.toList()));
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<?> updateStatus(@PathVariable Long id, @RequestParam AppointmentStatus status, @RequestHeader(value="role", required=false) String role){
        if(!(AuthUtil.hasRole("DOCTOR", role) || AuthUtil.hasRole("ADMIN", role))) return ResponseEntity.status(403).body("Only DOCTOR or ADMIN can update status");
        return ResponseEntity.ok(toDto(service.updateStatus(id,status)));
    }

    @GetMapping("/doctor/{doctorId}")
    public ResponseEntity<List<AppointmentDTO>> byDoctor(@PathVariable Long doctorId){ return ResponseEntity.ok(service.getAppointmentsByDoctor(doctorId).stream().map(this::toDto).collect(Collectors.toList())); }

    private AppointmentDTO toDto(Appointment a){ AppointmentDTO dto = new AppointmentDTO(); dto.setId(a.getId()); if(a.getDoctor()!=null){ dto.setDoctorId(a.getDoctor().getId()); dto.setDoctorName(a.getDoctor().getName()); } if(a.getPatient()!=null){ dto.setPatientId(a.getPatient().getId()); dto.setPatientName(a.getPatient().getName()); } dto.setAppointmentDateTime(a.getAppointmentDateTime()); dto.setStatus(a.getStatus().name()); dto.setNotes(a.getNotes()); return dto; }
}
