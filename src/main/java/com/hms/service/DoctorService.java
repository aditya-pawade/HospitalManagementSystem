package com.hms.service;
import com.hms.entity.Doctor; import java.util.List; import java.util.Optional;
public interface DoctorService {
    Doctor saveDoctor(Doctor doctor);
    List<Doctor> getAllDoctors(int page, int size);
    Optional<Doctor> getDoctorById(Long id);
    void deleteDoctor(Long id);
    Doctor approveDoctor(Long id);
}
