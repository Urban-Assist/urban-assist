package com.example.userManagement.controller;

import com.example.userManagement.dto.ProviderProfileDTO;
import com.example.userManagement.service.ProviderProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("/api/provider")
@RequiredArgsConstructor
public class ProviderManagementController {

    private final ProviderProfileService providerProfileService;

    @GetMapping
    public ResponseEntity<ProviderProfileDTO> getCurrentProviderProfile(@RequestParam String service) {
        
        ProviderProfileDTO profile = providerProfileService.getCurrentProviderProfile(service);
        return ResponseEntity.ok(profile);
    }

    @PostMapping
    public ResponseEntity<ProviderProfileDTO> createProviderProfile(@RequestParam String service) {
        System.out.println("Received name: " + service);
        ProviderProfileDTO profile = providerProfileService.createProviderProfile(service);
        return ResponseEntity.status(HttpStatus.CREATED).body(profile);
    }

    @PutMapping
    public ResponseEntity<ProviderProfileDTO> updateProfile(@RequestBody ProviderProfileDTO profileDTO) {
        ProviderProfileDTO updatedProfile = providerProfileService.updateProfile(profileDTO);
        return ResponseEntity.ok(updatedProfile);
    }


    
}