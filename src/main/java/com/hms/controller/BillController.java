
package com.hms.controller;

import com.hms.dto.BillDTO;
import com.hms.service.BillService;
import com.util.AuthUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/bills")
public class BillController {

    private final BillService billService;

    public BillController(BillService billService) {
        this.billService = billService;
    }

    @PostMapping
    public ResponseEntity<?> create(@Valid @RequestBody BillDTO dto, @RequestHeader(value = "role", required = false) String role) {
        if (!AuthUtil.hasRole("ADMIN", role)) {
            return ResponseEntity.status(403).body("Only ADMIN can create bills!");
        }
        return ResponseEntity.ok(billService.createBill(dto));
    }
}
