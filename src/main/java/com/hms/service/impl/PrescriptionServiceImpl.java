package com.hms.service.impl;
import com.hms.entity.Prescription; import com.hms.repository.PrescriptionRepository; import com.hms.service.PrescriptionService; import org.springframework.stereotype.Service; import java.util.List;
@Service
public class PrescriptionServiceImpl implements PrescriptionService {
    private final PrescriptionRepository repo;
    public PrescriptionServiceImpl(PrescriptionRepository repo){ this.repo = repo; }
    @Override public Prescription create(Prescription p){ return repo.save(p); }
    @Override public List<Prescription> findByPatient(Long patientId){ return repo.findByPatientId(patientId); }
}
