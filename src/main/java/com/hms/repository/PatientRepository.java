package com.hms.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.hms.entity.Patient;

public interface PatientRepository extends JpaRepository<Patient, Long> {
}
