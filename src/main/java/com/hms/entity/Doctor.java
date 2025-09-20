package com.hms.entity;
import lombok.*;
import javax.persistence.*;
@Entity @Table(name = "doctors")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @ToString
public class Doctor {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;
    private String name;
    private String specialization;
    private String phone;
    private String email;
    private String status; // PENDING / ACTIVE / INACTIVE
}
