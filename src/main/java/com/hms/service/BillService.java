package com.hms.service;
import com.hms.entity.Bill; import java.util.List;
public interface BillService {
    Bill create(Bill b);
    List<Bill> findByPatient(Long patientId);
}
