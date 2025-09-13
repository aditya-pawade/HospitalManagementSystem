package com.hms.service;

import java.util.List;
import java.util.Optional;

import com.hms.entity.Doctor;

public interface DoctorService {
    Doctor saveDoctor(Doctor doctor);
    List<Doctor> getAllDoctors();
    Optional<Doctor> getDoctorById(Long id);
    void deleteDoctor(Long id);
}
