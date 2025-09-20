package com.hms.entity;
import lombok.*;
import javax.persistence.*;
@Entity @Table(name = "patients")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @ToString(exclude = "appointments")
public class Patient {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;
    private String name;
    private Integer age;
    private String gender;
    private String address;
    private String phone;
}
