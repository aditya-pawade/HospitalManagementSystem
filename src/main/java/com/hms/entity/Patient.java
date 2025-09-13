package com.hms.entity;

import java.util.List;
import javax.persistence.*;
import lombok.*;
import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
@Table(name = "patients")
@Getter
@Setter
@ToString(exclude = "appointments")
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
public class Patient {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String name;
	private int age;
	private String gender;
	private String address;
	private String phone;

	@OneToMany(mappedBy = "patient", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
	@JsonManagedReference("patient-appointments")
	private List<Appointment> appointments;

}
