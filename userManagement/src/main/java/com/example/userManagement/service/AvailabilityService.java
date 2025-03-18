package com.example.userManagement.service;

import com.example.userManagement.dto.AvailabilityDTO;
import com.example.userManagement.model.Availability;
import com.example.userManagement.model.ProviderProfile;
import com.example.userManagement.repository.AvailabilityRepository;
import com.example.userManagement.repository.ProviderProfileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;

@Service
@RequiredArgsConstructor
public class AvailabilityService {

    private final AvailabilityRepository availabilityRepository;
    private final ProviderProfileRepository providerRepository;

    public List<AvailabilityDTO> getAvailabilities(Long providerId, String service) {
        // Fetch authenticated user's email
        String authenticatedEmail = SecurityContextHolder.getContext().getAuthentication().getName();

        if (authenticatedEmail == null || authenticatedEmail.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User not authenticated");
        }

        ProviderProfile provider;

        if (providerId != null) {
            // Client fetching provider's availability
            provider = providerRepository.findByIdAndService(providerId, service)
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Provider not found"));
        } else {
            // Provider fetching their own availability
            provider = providerRepository.findByEmailAndService(authenticatedEmail, service)
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Provider profile not found"));
        }

        return availabilityRepository.findByProviderAndService(provider, service).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public AvailabilityDTO createAvailability(AvailabilityDTO availabilityDTO) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();

        System.out.println("email");
        System.out.println(email);

        ProviderProfile provider = providerRepository.findByEmailAndService(email, availabilityDTO.getService())
                .orElseThrow(() -> new RuntimeException("Provider not found"));

        System.out.println("provider");
        System.out.println(provider);

        Availability availability = convertToEntity(availabilityDTO);
        availability.setProvider(provider);
        availability.setService(availabilityDTO.getService());
        return convertToDTO(availabilityRepository.save(availability));
    }

    public void deleteAvailability(Long id) {
        // Get the current user's email from the security context
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        // Find the provider using their email
        boolean providerExists = providerRepository.existsByEmail(email);
        if (!providerExists) {
            throw new RuntimeException("Provider not found");
        }

        // Retrieve the availability entity by ID
        Availability availability = availabilityRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Availability not found"));

        // Ensure that the provider is the owner of the availability before deleting
        if (!availability.getProvider().getEmail().equals(email)) {
            throw new RuntimeException("Unauthorized to delete this availability");
        }

        // Proceed to delete the availability
        availabilityRepository.deleteById(id);
    }

    private AvailabilityDTO convertToDTO(Availability availability) {
        return new AvailabilityDTO(availability.getId(), availability.getStartTime(), availability.getEndTime(),
                availability.getProvider().getEmail(), availability.getService());
    }

    private Availability convertToEntity(AvailabilityDTO availabilityDTO) {
        return new Availability(null, availabilityDTO.getStartTime(), availabilityDTO.getEndTime(), null,
                availabilityDTO.getService());
    }
}