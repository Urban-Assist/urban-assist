package com.example.userManagement.service;

import com.example.userManagement.dto.ProviderProfileDTO;
import com.example.userManagement.model.ProviderProfile;
import com.example.userManagement.repository.ProviderProfileRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.amqp.rabbit.annotation.RabbitListener;

@Service
public class ProviderProfileService {

    private final ProviderProfileRepository providerProfileRepository;

    public ProviderProfileService(ProviderProfileRepository providerProfileRepository) {
        this.providerProfileRepository = providerProfileRepository;
    }

    public ProviderProfileDTO getCurrentProviderProfile() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        ProviderProfile provider = providerProfileRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Profile not found"));
        return convertToDTO(provider);
    }

    public ProviderProfileDTO updateProfile(ProviderProfileDTO providerDTO) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        if (!email.equals(providerDTO.getEmail())) {
            throw new RuntimeException("Cannot update other provider's profile");
        }

        // Fetch existing provider profile
        ProviderProfile existingProvider = providerProfileRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Profile not found"));

        // Update the existing profile
        BeanUtils.copyProperties(providerDTO, existingProvider, "id", "email"); // Don't overwrite id and email

        existingProvider = providerProfileRepository.save(existingProvider); // Save the updated profile
        return convertToDTO(existingProvider);
    }

    @RabbitListener(queues = "${rabbitmq.queue.name}")
    public void handleProviderRegistration(ProviderProfileDTO providerDTO) {
        if (!providerProfileRepository.existsByEmail(providerDTO.getEmail())) {
            ProviderProfile provider = new ProviderProfile();
            provider.setEmail(providerDTO.getEmail());
            provider.setName(providerDTO.getName());
            provider.setDescription(providerDTO.getDescription());
            provider.setExperience(providerDTO.getExperience());
            provider.setCharge(providerDTO.getCharge());
            provider.setCertification(providerDTO.isCertified());
            provider.setCertificationNumber(providerDTO.getCertificationNumber());

            providerProfileRepository.save(provider);
            System.out.println("Provider profile created for: " + providerDTO.getEmail() + " ✅");
        } else {
            System.out.println("Profile already exists for: " + providerDTO.getEmail());
        }
    }

    private ProviderProfileDTO convertToDTO(ProviderProfile provider) {
        ProviderProfileDTO dto = new ProviderProfileDTO();
        BeanUtils.copyProperties(provider, dto);
        return dto;
    }
}
