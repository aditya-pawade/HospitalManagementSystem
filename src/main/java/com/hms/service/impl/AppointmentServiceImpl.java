
package com.hms.service.impl;

import com.hms.dto.AppointmentDTO;
import com.hms.entity.Appointment;
import com.hms.entity.Doctor;
import com.hms.entity.Patient;
import com.hms.enums.AppointmentStatus;
import com.hms.repository.AppointmentRepository;
import com.hms.repository.DoctorRepository;
import com.hms.repository.PatientRepository;
import com.hms.service.AppointmentService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AppointmentServiceImpl implements AppointmentService {

    private final AppointmentRepository appointmentRepository;
    private final DoctorRepository doctorRepository;
    private final PatientRepository patientRepository;

    public AppointmentServiceImpl(AppointmentRepository appointmentRepository,
                                  DoctorRepository doctorRepository,
                                  PatientRepository patientRepository) {
        this.appointmentRepository = appointmentRepository;
        this.doctorRepository = doctorRepository;
        this.patientRepository = patientRepository;
    }

    private AppointmentDTO mapToDTO(Appointment ap) {
        AppointmentDTO dto = new AppointmentDTO();
        dto.setId(ap.getId());
        dto.setAppointmentDateTime(ap.getAppointmentDateTime());
        dto.setStatus(ap.getStatus()!=null?ap.getStatus().name():null);
        if (ap.getPatient()!=null) {
            dto.setPatientId(ap.getPatient().getId());
            dto.setPatientName(ap.getPatient().getName());
        }
        if (ap.getDoctor()!=null) {
            dto.setDoctorId(ap.getDoctor().getId());
            dto.setDoctorName(ap.getDoctor().getName());
        }
        return dto;
    }

    private Appointment mapToEntity(AppointmentDTO dto) {
        Appointment ap = new Appointment();
        ap.setId(dto.getId());
        ap.setAppointmentDateTime(dto.getAppointmentDateTime());
        if (dto.getStatus()!=null) {
            try {
                ap.setStatus(AppointmentStatus.valueOf(dto.getStatus()));
            } catch (IllegalArgumentException ex) {
                ap.setStatus(AppointmentStatus.REQUESTED);
            }
        } else {
            ap.setStatus(AppointmentStatus.REQUESTED);
        }
        return ap;
    }

    @Override
    public AppointmentDTO createAppointment(AppointmentDTO dto) {
        Patient patient = patientRepository.findById(dto.getPatientId())
                .orElseThrow(() -> new RuntimeException("Patient not found: " + dto.getPatientId()));
        Doctor doctor = doctorRepository.findById(dto.getDoctorId())
                .orElseThrow(() -> new RuntimeException("Doctor not found: " + dto.getDoctorId()));
        Appointment ap = mapToEntity(dto);
        ap.setPatient(patient);
        ap.setDoctor(doctor);
        ap.setStatus(AppointmentStatus.REQUESTED);
        Appointment saved = appointmentRepository.save(ap);
        return mapToDTO(saved);
    }

    @Override
    public java.util.List<AppointmentDTO> getAllAppointments() {
        return appointmentRepository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    public AppointmentDTO getAppointmentById(Long id) {
        Appointment ap = appointmentRepository.findById(id).orElseThrow(() -> new RuntimeException("Appointment not found: " + id));
        return mapToDTO(ap);
    }

    @Override
    public java.util.List<AppointmentDTO> getAppointmentsByDoctor(Long doctorId) {
        return appointmentRepository.findByDoctorId(doctorId).stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    public java.util.List<AppointmentDTO> getAppointmentsByPatient(Long patientId) {
        return appointmentRepository.findByPatientId(patientId).stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    public AppointmentDTO updateAppointmentStatus(Long id, AppointmentStatus status) {
        Appointment ap = appointmentRepository.findById(id).orElseThrow(() -> new RuntimeException("Appointment not found: " + id));
        ap.setStatus(status);
        Appointment updated = appointmentRepository.save(ap);
        return mapToDTO(updated);
    }

    @Override
    public void deleteAppointment(Long id) {
        appointmentRepository.deleteById(id);
    }
}
