package com.hms.entity;

import java.time.LocalDateTime;
import javax.persistence.*;
import lombok.*;
import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name = "appointments")
@Getter
@Setter
@ToString
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
public class Appointment {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private LocalDateTime appointmentDate;
	private String status; // e.g., Scheduled, Completed, Cancelled

	@ManyToOne
	@JoinColumn(name = "patient_id", nullable = false)
	@JsonBackReference("patient-appointments")   // match with Patient.java
	private Patient patient;

	@ManyToOne
	@JoinColumn(name = "doctor_id", nullable = false)
	@JsonBackReference("doctor-appointments")   // match with Doctor.java
	private Doctor doctor;

}
