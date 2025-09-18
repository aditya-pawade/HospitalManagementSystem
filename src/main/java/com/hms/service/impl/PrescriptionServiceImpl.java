
package com.hms.service.impl;

import com.hms.dto.PrescriptionDTO;
import com.hms.entity.Appointment;
import com.hms.entity.Prescription;
import com.hms.repository.AppointmentRepository;
import com.hms.repository.PrescriptionRepository;
import com.hms.service.PrescriptionService;
import org.springframework.stereotype.Service;

@Service
public class PrescriptionServiceImpl implements PrescriptionService {

    private final PrescriptionRepository prescriptionRepository;
    private final AppointmentRepository appointmentRepository;

    public PrescriptionServiceImpl(PrescriptionRepository prescriptionRepository, AppointmentRepository appointmentRepository) {
        this.prescriptionRepository = prescriptionRepository;
        this.appointmentRepository = appointmentRepository;
    }

    @Override
    public PrescriptionDTO createPrescription(Long appointmentId, PrescriptionDTO dto) {
        Appointment ap = appointmentRepository.findById(appointmentId)
                .orElseThrow(() -> new RuntimeException("Appointment not found: " + appointmentId));
        Prescription p = new Prescription();
        p.setAppointment(ap);
        p.setMedicines(dto.getMedicines());
        p.setNotes(dto.getNotes());
        Prescription saved = prescriptionRepository.save(p);
        dto.setId(saved.getId());
        return dto;
    }
}
