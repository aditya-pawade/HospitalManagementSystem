package com.hms.entity;
import lombok.*;
import javax.persistence.*;
import java.math.BigDecimal;
import com.hms.enums.PaymentStatus;
@Entity @Table(name = "bills")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @ToString
public class Bill {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;
    private Long appointmentId;
    private Long patientId;
    private BigDecimal amount;
    @Enumerated(EnumType.STRING) private PaymentStatus status = PaymentStatus.PENDING;
    private String transactionRef;
}
