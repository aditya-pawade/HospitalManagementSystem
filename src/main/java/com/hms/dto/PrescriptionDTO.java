
package com.hms.dto;

import lombok.*;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class PrescriptionDTO {
    private Long id;
    @NotBlank(message = "medicines cannot be blank")
    private String medicines;
    private String notes;
    private Long appointmentId;
}
