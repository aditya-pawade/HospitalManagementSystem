package com.hms.entity;
import lombok.*;
import javax.persistence.*;
import java.time.LocalDateTime;
import com.hms.enums.AppointmentStatus;
@Entity @Table(name = "appointments")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @ToString
public class Appointment {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;
    @ManyToOne @JoinColumn(name = "patient_id") private Patient patient;
    @ManyToOne @JoinColumn(name = "doctor_id") private Doctor doctor;
    private LocalDateTime appointmentDateTime;
    @Enumerated(EnumType.STRING) private AppointmentStatus status = AppointmentStatus.REQUESTED;
    private String notes;
}
