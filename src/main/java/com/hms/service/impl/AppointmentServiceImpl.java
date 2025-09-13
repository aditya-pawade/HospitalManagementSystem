package com.hms.service.impl;

import com.hms.dto.AppointmentDTO;
import com.hms.entity.Appointment;
import com.hms.repository.AppointmentRepository;
import com.hms.service.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class AppointmentServiceImpl implements AppointmentService {

	@Autowired
	private AppointmentRepository appointmentRepository;

	@Override
	public Appointment saveAppointment(Appointment appointment) {
		return appointmentRepository.save(appointment);
	}

	@Override
	public List<Appointment> getAllAppointments() {
		return appointmentRepository.findAll();
	}

	@Override
	public Optional<Appointment> getAppointmentById(Long id) {
		return appointmentRepository.findById(id);
	}

	@Override
	public void deleteAppointment(Long id) {
		appointmentRepository.deleteById(id);
	}

	@Override
	public List<AppointmentDTO> getAllAppointmentDTOs() {
		return appointmentRepository.findAll().stream().map(appointment -> {
			AppointmentDTO dto = new AppointmentDTO();
			dto.setId(appointment.getId());
			dto.setAppointmentDate(appointment.getAppointmentDate());
			dto.setStatus(appointment.getStatus());

			if (appointment.getPatient() != null) {
				dto.setPatientName(appointment.getPatient().getName());
			}
			if (appointment.getDoctor() != null) {
				dto.setDoctorName(appointment.getDoctor().getName());
			}

			return dto;
		}).collect(Collectors.toList());
	}
}
