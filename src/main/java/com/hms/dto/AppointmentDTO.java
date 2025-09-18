
package com.hms.dto;

import lombok.*;

import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class AppointmentDTO {
    private Long id;
    @NotNull(message = "patientId required")
    private Long patientId;
    @NotNull(message = "doctorId required")
    private Long doctorId;
    @NotNull(message = "appointmentDateTime required")
    private LocalDateTime appointmentDateTime;
    private String status;
    private String patientName;
    private String doctorName;
}
