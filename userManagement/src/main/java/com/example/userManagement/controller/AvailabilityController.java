package com.example.userManagement.controller;

import com.example.userManagement.dto.AvailabilityDTO;
import com.example.userManagement.dto.AvailibilityRequestDTO;

import com.example.userManagement.service.AvailabilityService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;

@RestController
@RequestMapping("/api/availabilities")
@RequiredArgsConstructor
public class AvailabilityController {

    private final AvailabilityService availabilityService;

    @PostMapping("/get")
    public ResponseEntity<List<AvailabilityDTO>> getAvailabilities(@RequestBody AvailibilityRequestDTO data) {
        System.out.println("Received request data: " + data);

        // Validate input data
        if (data.getService() == null || data.getService().isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Service must be provided");
        }

        Long providerId = (data.getId() != null) ? Long.valueOf(data.getId()) : null;
        String service = data.getService();

        // Call service layer for handling authentication and fetching availability
        List<AvailabilityDTO> availabilities = availabilityService.getAvailabilities(providerId, service);

        return ResponseEntity.ok(availabilities);
    }

    @PostMapping
    public ResponseEntity<AvailabilityDTO> createAvailability(@RequestBody AvailabilityDTO availabilityDTO) {

        return ResponseEntity.ok(availabilityService.createAvailability(availabilityDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAvailability(@PathVariable Long id) {
        availabilityService.deleteAvailability(id);
        return ResponseEntity.noContent().build();
    }
}