package com.hms.service;
import com.hms.entity.Patient; import java.util.List; import java.util.Optional;
public interface PatientService {
    Patient savePatient(Patient patient);
    List<Patient> getAllPatients(int page, int size);
    Optional<Patient> getPatientById(Long id);
    void deletePatient(Long id);
}
