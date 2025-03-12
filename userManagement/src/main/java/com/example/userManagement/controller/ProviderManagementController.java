package com.example.userManagement.controller;

import com.example.userManagement.dto.ProviderProfileDTO;
import com.example.userManagement.service.ProviderProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;



@RestController
@RequestMapping("/api/provider")
@RequiredArgsConstructor
public class ProviderManagementController {

    private final ProviderProfileService providerProfileService;

    @GetMapping
    public ResponseEntity<ProviderProfileDTO> getCurrentProviderProfile() {
        ProviderProfileDTO profile = providerProfileService.getCurrentProviderProfile();
        return ResponseEntity.ok(profile);
    }

    @PostMapping
    public ResponseEntity<ProviderProfileDTO> createProviderProfile() {
        ProviderProfileDTO profile = providerProfileService.createProviderProfile();
        return ResponseEntity.status(HttpStatus.CREATED).body(profile);
    }

    @PutMapping
    public ResponseEntity<ProviderProfileDTO> updateProfile(@RequestBody ProviderProfileDTO profileDTO) {
        ProviderProfileDTO updatedProfile = providerProfileService.updateProfile(profileDTO);
        return ResponseEntity.ok(updatedProfile);
    }


    
}