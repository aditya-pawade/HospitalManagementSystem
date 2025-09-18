package com.hms.service.impl;

import com.hms.dto.BillDTO;
import com.hms.entity.Appointment;
import com.hms.entity.Bill;
import com.hms.repository.AppointmentRepository;
import com.hms.repository.BillRepository;
import com.hms.service.BillService;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
public class PrescriptionServiceImpl_Bill implements BillService {

	private final BillRepository billRepository;
	private final AppointmentRepository appointmentRepository;

	public PrescriptionServiceImpl_Bill(BillRepository billRepository, AppointmentRepository appointmentRepository) {
		this.billRepository = billRepository;
		this.appointmentRepository = appointmentRepository;
	}

	@Override
	public BillDTO createBill(BillDTO dto) {
		Appointment ap = appointmentRepository.findById(dto.getAppointmentId())
				.orElseThrow(() -> new RuntimeException("Appointment not found: " + dto.getAppointmentId()));
		Bill b = new Bill();
		b.setAppointment(ap);
		b.setAmount(dto.getAmount());
		b.setStatus(dto.getStatus() != null ? dto.getStatus() : "PENDING");
		Bill saved = billRepository.save(b);
		dto.setId(saved.getId());
		return dto;
	}
}
