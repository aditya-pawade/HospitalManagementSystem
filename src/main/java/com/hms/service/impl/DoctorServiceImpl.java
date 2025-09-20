package com.hms.service.impl;
import com.hms.entity.Doctor; import com.hms.repository.DoctorRepository; import com.hms.service.DoctorService; import org.springframework.stereotype.Service; import org.springframework.data.domain.PageRequest; import java.util.List; import java.util.Optional;
@Service
public class DoctorServiceImpl implements DoctorService {
    private final DoctorRepository repo;
    public DoctorServiceImpl(DoctorRepository repo){ this.repo = repo; }
    @Override public Doctor saveDoctor(Doctor doctor){ return repo.save(doctor); }
    @Override public List<Doctor> getAllDoctors(int page,int size){ return repo.findAll(PageRequest.of(page,size)).getContent(); }
    @Override public Optional<Doctor> getDoctorById(Long id){ return repo.findById(id); }
    @Override public void deleteDoctor(Long id){ repo.deleteById(id); }
    @Override public Doctor approveDoctor(Long id){ Doctor d = repo.findById(id).orElseThrow(()->new RuntimeException("Doctor not found")); d.setStatus("ACTIVE"); return repo.save(d); }
}
