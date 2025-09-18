
package com.hms.service;

import com.hms.dto.AppointmentDTO;
import com.hms.enums.AppointmentStatus;
import java.util.List;

public interface AppointmentService {
    AppointmentDTO createAppointment(AppointmentDTO dto);
    java.util.List<AppointmentDTO> getAllAppointments();
    AppointmentDTO getAppointmentById(Long id);
    java.util.List<AppointmentDTO> getAppointmentsByDoctor(Long doctorId);
    java.util.List<AppointmentDTO> getAppointmentsByPatient(Long patientId);
    AppointmentDTO updateAppointmentStatus(Long id, AppointmentStatus status);
    void deleteAppointment(Long id);
}
