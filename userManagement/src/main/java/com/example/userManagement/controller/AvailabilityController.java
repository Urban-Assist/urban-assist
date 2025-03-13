package com.example.userManagement.controller;

import com.example.userManagement.dto.AvailabilityDTO;
import com.example.userManagement.service.AvailabilityService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/availabilities")
@RequiredArgsConstructor
public class AvailabilityController {

    private final AvailabilityService availabilityService;

    @GetMapping
    public ResponseEntity<List<AvailabilityDTO>> getAvailabilities(@RequestParam String service) {
        return ResponseEntity.ok(availabilityService.getAvailabilities( service));
    }

    @PostMapping
    public ResponseEntity<AvailabilityDTO> createAvailability(@RequestBody AvailabilityDTO availabilityDTO) {
        
        return ResponseEntity.ok(availabilityService.createAvailability( availabilityDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAvailability(@PathVariable Long id) {
        availabilityService.deleteAvailability(id);
        return ResponseEntity.noContent().build();
    }
}