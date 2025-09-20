package com.hms.entity;
import lombok.*;
import javax.persistence.*;
@Entity @Table(name = "prescriptions")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @ToString
public class Prescription {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;
    private Long appointmentId;
    private Long doctorId;
    private Long patientId;
    private String medicines;
    private String notes;
}
