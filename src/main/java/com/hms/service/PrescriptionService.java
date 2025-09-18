
package com.hms.service;

import com.hms.dto.PrescriptionDTO;

public interface PrescriptionService {
    com.hms.dto.PrescriptionDTO createPrescription(Long appointmentId, PrescriptionDTO dto);
}
