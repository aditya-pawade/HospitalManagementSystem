package com.hms.service;

import com.hms.entity.Appointment;
import com.hms.dto.AppointmentDTO;

import java.util.List;
import java.util.Optional;

public interface AppointmentService {
	Appointment saveAppointment(Appointment appointment);

	List<Appointment> getAllAppointments();

	Optional<Appointment> getAppointmentById(Long id);

	void deleteAppointment(Long id);

	List<AppointmentDTO> getAllAppointmentDTOs();
}
