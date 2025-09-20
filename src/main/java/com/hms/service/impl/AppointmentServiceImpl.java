package com.hms.service.impl;
import com.hms.entity.Appointment; import com.hms.enums.AppointmentStatus; import com.hms.repository.AppointmentRepository; import com.hms.service.AppointmentService; import org.springframework.stereotype.Service; import org.springframework.data.domain.PageRequest; import java.util.List; import java.util.Optional;
@Service
public class AppointmentServiceImpl implements AppointmentService {
    private final AppointmentRepository repo;
    public AppointmentServiceImpl(AppointmentRepository repo){ this.repo = repo; }
    @Override public Appointment saveAppointment(Appointment appointment){ return repo.save(appointment); }
    @Override public List<Appointment> getAllAppointments(int page,int size){ return repo.findAll(PageRequest.of(page,size)).getContent(); }
    @Override public Optional<Appointment> getAppointmentById(Long id){ return repo.findById(id); }
    @Override public void deleteAppointment(Long id){ repo.deleteById(id); }
    @Override public List<Appointment> getAppointmentsByDoctor(Long doctorId){ return repo.findByDoctorId(doctorId); }
    @Override public List<Appointment> getAppointmentsByPatient(Long patientId){ return repo.findByPatientId(patientId); }
    @Override public Appointment updateStatus(Long id, AppointmentStatus status){ Appointment a = repo.findById(id).orElseThrow(()->new RuntimeException("Appointment not found")); a.setStatus(status); return repo.save(a); }
}
