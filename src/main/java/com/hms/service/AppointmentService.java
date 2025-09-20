package com.hms.service;
import com.hms.entity.Appointment; import com.hms.enums.AppointmentStatus; import java.util.List; import java.util.Optional;
public interface AppointmentService {
    Appointment saveAppointment(Appointment appointment);
    List<Appointment> getAllAppointments(int page, int size);
    Optional<Appointment> getAppointmentById(Long id);
    void deleteAppointment(Long id);
    List<Appointment> getAppointmentsByDoctor(Long doctorId);
    List<Appointment> getAppointmentsByPatient(Long patientId);
    Appointment updateStatus(Long id, AppointmentStatus status);
}
