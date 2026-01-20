package com.example.userManagement.controller;

import com.example.userManagement.model.ProviderProfile;
import com.example.userManagement.service.ProviderProfileService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/providers")
@CrossOrigin(origins = { "http://localhost:5173", "http://localhost:5174", "http://localhost:5175",
        "http://localhost:8002", "http://127.0.0.1:5173", "http://127.0.0.1:8002",
        "http://reviews:8002" }) // Added Docker service name
public class ProviderProfileController {

    private final ProviderProfileService providerProfileService;

    public ProviderProfileController(ProviderProfileService providerProfileService) {
        this.providerProfileService = providerProfileService;
    }

    @GetMapping
    public ResponseEntity<List<ProviderProfile>> getAllProviders() {
        return ResponseEntity.ok(providerProfileService.getAllProviders());
    }

    @GetMapping("/service/{service}")
    public ResponseEntity<List<ProviderProfile>> getProvidersByService(@PathVariable String service) {
        return ResponseEntity.ok(providerProfileService.getProvidersByService(service));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProviderProfile> getProviderById(@PathVariable Long id) {
        return providerProfileService.getProviderById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/name/{firstName}/{lastName}")
    public ResponseEntity<ProviderProfile> getProviderByName(
            @PathVariable String firstName,
            @PathVariable String lastName) {
        return providerProfileService.getProviderByName(firstName, lastName)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/email/{email}")
    public ResponseEntity<ProviderProfile> getProviderByEmail(@PathVariable String email) {
        return providerProfileService.getProviderByEmail(email)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/email/{email}")
    public ResponseEntity<ProviderProfile> updateProviderByEmail(
            @PathVariable String email,
            @RequestBody ProviderProfile updatedProvider) {
        return providerProfileService.updateProviderByEmail(email, updatedProvider)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}/stars")
    public ResponseEntity<ProviderProfile> updateProviderStars(
            @PathVariable Long id,
            @RequestBody Map<String, Double> starsUpdate) {
        Double stars = starsUpdate.get("stars");
        if (stars == null) {
            return ResponseEntity.badRequest().build();
        }
        return providerProfileService.updateProviderStars(id, stars)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
