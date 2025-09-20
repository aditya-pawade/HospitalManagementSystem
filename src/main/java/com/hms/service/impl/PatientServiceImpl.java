package com.hms.service.impl;
import com.hms.entity.Patient; import com.hms.repository.PatientRepository; import com.hms.service.PatientService; import org.springframework.stereotype.Service; import org.springframework.data.domain.PageRequest; import java.util.List; import java.util.Optional;
@Service
public class PatientServiceImpl implements PatientService {
    private final PatientRepository repo;
    public PatientServiceImpl(PatientRepository repo){ this.repo = repo; }
    @Override public Patient savePatient(Patient patient){ return repo.save(patient); }
    @Override public List<Patient> getAllPatients(int page,int size){ return repo.findAll(PageRequest.of(page,size)).getContent(); }
    @Override public Optional<Patient> getPatientById(Long id){ return repo.findById(id); }
    @Override public void deletePatient(Long id){ repo.deleteById(id); }
}
