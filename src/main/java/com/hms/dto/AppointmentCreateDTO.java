package com.hms.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class AppointmentCreateDTO {
    private LocalDateTime appointmentDate;
    private String status;
    private Long patientId;
    private Long doctorId;
}
