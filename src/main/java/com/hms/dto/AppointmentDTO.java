package com.hms.dto;

import java.time.LocalDateTime;
import lombok.*;

@Getter
@Setter
@ToString
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
public class AppointmentDTO {
	private Long id;
	private LocalDateTime appointmentDate;
	private String status;
	private String patientName;
	private String doctorName;
}
