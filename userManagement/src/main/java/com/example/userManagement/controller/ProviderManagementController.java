package com.example.userManagement.controller;

import com.example.userManagement.dto.ProviderProfileDTO;
import com.example.userManagement.service.ProviderProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequestMapping("/api/provider")
@RequiredArgsConstructor
public class ProviderManagementController {

    private final ProviderProfileService providerProfileService;

    @GetMapping("/profile/{id}")
    public ResponseEntity<ProviderProfileDTO> getProviderById(@PathVariable Long id,@RequestParam String service ) {
        System.out.println("Received id: " + service);
        ProviderProfileDTO profile = providerProfileService.getProviderById(id,service);
        return ResponseEntity.ok(profile);
    }

    @GetMapping
    public ResponseEntity<ProviderProfileDTO> getCurrentProviderProfile(@RequestParam String service) {
        ProviderProfileDTO profile = providerProfileService.getCurrentProviderProfile(service);
        return ResponseEntity.ok(profile);
    }

    @GetMapping("/service")
    public ResponseEntity<Set<ProviderProfileDTO>> getProvidersByService(@RequestParam String service) {
        Set<ProviderProfileDTO> providers = providerProfileService.getProvidersByService(service);
        return ResponseEntity.ok(providers);
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

 
    // to do : end point to mark the provider as certified
    
    // to do : end point to delete the provider profile
 
}