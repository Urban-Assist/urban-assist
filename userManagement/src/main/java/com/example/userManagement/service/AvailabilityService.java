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

@Service
@RequiredArgsConstructor
public class AvailabilityService {

    private final AvailabilityRepository availabilityRepository;
    private final ProviderProfileRepository providerRepository;

    public List<AvailabilityDTO> getAvailabilities( String service) {
        String email =  SecurityContextHolder.getContext().getAuthentication().getName();

        ProviderProfile provider = providerRepository.findByEmailAndService(email,service)
                .orElseThrow(() -> new RuntimeException("Provider not found"));
        
        return availabilityRepository.findByProviderAndService(provider, service).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public AvailabilityDTO createAvailability( AvailabilityDTO availabilityDTO) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();

        System.out.println("email");
        System.out.println(email);

        ProviderProfile provider = providerRepository.findByEmailAndService(email,availabilityDTO.getService())
                .orElseThrow(() -> new RuntimeException("Provider not found"));

        System.out.println("provider");
        System.out.println(provider);

        Availability availability = convertToEntity(availabilityDTO);
        availability.setProvider(provider);
        availability.setService(availabilityDTO.getService());
        return convertToDTO(availabilityRepository.save(availability));
    }

    public void deleteAvailability(Long id) {
        availabilityRepository.deleteById(id);
    }

    private AvailabilityDTO convertToDTO(Availability availability) {
        return new AvailabilityDTO(availability.getId(), availability.getStartTime(), availability.getEndTime(), availability.getProvider().getEmail(), availability.getService());
    }

    private Availability convertToEntity(AvailabilityDTO availabilityDTO) {
        return new Availability(null, availabilityDTO.getStartTime(), availabilityDTO.getEndTime(), null, availabilityDTO.getService());
    }
}