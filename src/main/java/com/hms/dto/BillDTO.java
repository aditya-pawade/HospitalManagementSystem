
package com.hms.dto;

import lombok.*;

import javax.validation.constraints.NotNull;
import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class BillDTO {
    private Long id;
    @NotNull(message = "appointmentId required")
    private Long appointmentId;
    @NotNull(message = "amount required")
    private BigDecimal amount;
    private String status;
}
