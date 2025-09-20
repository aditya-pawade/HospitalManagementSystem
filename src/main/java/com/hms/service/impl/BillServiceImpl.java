package com.hms.service.impl;
import com.hms.entity.Bill; import com.hms.repository.BillRepository; import com.hms.service.BillService; import org.springframework.stereotype.Service; import java.util.List;
@Service
public class BillServiceImpl implements BillService {
    private final BillRepository repo;
    public BillServiceImpl(BillRepository repo){ this.repo = repo; }
    @Override public Bill create(Bill b){ return repo.save(b); }
    @Override public List<Bill> findByPatient(Long patientId){ return repo.findByPatientId(patientId); }
}
