package com.hms.service;
import com.hms.entity.Prescription; import java.util.List;
public interface PrescriptionService {
    Prescription create(Prescription p);
    List<Prescription> findByPatient(Long patientId);
}
