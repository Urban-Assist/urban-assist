package com.example.userManagement.service;

import com.example.userManagement.model.ProviderProfile;
import com.example.userManagement.repository.ProviderProfileRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProviderProfileService {

    private final ProviderProfileRepository providerProfileRepository;

    public ProviderProfileService(ProviderProfileRepository providerProfileRepository) {
        this.providerProfileRepository = providerProfileRepository;
    }

    public List<ProviderProfile> getAllProviders() {
        return providerProfileRepository.findAll();
    }

    public List<ProviderProfile> getProvidersByService(String service) {
        return providerProfileRepository.findByService(service);
    }

    public Optional<ProviderProfile> getProviderByName(String firstName, String lastName) {
        return providerProfileRepository.findByFirstNameAndLastName(firstName, lastName);
    }

    public Optional<ProviderProfile> getProviderById(Long id) {
        return providerProfileRepository.findById(id);
    }

    public Optional<ProviderProfile> getProviderByEmail(String email) {
        return providerProfileRepository.findByEmail(email);
    }

    public Optional<ProviderProfile> updateProviderByEmail(String email, ProviderProfile updatedProvider) {
        Optional<ProviderProfile> existingProviderOpt = providerProfileRepository.findByEmail(email);

        if (existingProviderOpt.isPresent()) {
            // Update existing provider
            ProviderProfile existingProvider = existingProviderOpt.get();
            if (updatedProvider.getFirstName() != null) {
                existingProvider.setFirstName(updatedProvider.getFirstName());
            }
            if (updatedProvider.getLastName() != null) {
                existingProvider.setLastName(updatedProvider.getLastName());
            }
            if (updatedProvider.getPhoneNumber() != null) {
                existingProvider.setPhoneNumber(updatedProvider.getPhoneNumber());
            }
            if (updatedProvider.getService() != null) {
                existingProvider.setService(updatedProvider.getService());
            }
            if (updatedProvider.getDescription() != null) {
                existingProvider.setDescription(updatedProvider.getDescription());
            }
            if (updatedProvider.getExperience() != null) {
                existingProvider.setExperience(updatedProvider.getExperience());
            }
            if (updatedProvider.getPrice() != null) {
                existingProvider.setPrice(updatedProvider.getPrice());
            }
            if (updatedProvider.getAddress() != null) {
                existingProvider.setAddress(updatedProvider.getAddress());
            }
            if (updatedProvider.getLinkedin() != null) {
                existingProvider.setLinkedin(updatedProvider.getLinkedin());
            }
            if (updatedProvider.getCertified() != null) {
                existingProvider.setCertified(updatedProvider.getCertified());
            }
            if (updatedProvider.getCertificationNumber() != null) {
                existingProvider.setCertificationNumber(updatedProvider.getCertificationNumber());
            }
            if (updatedProvider.getStars() != null) {
                existingProvider.setStars(updatedProvider.getStars());
            }
            return Optional.of(providerProfileRepository.save(existingProvider));
        } else {
            // Create new provider profile
            updatedProvider.setEmail(email);
            if (updatedProvider.getStars() == null) {
                updatedProvider.setStars(0);
            }
            ProviderProfile savedProvider = providerProfileRepository.save(updatedProvider);
            System.out.println("Provider profile created for: " + email + " ✅");
            return Optional.of(savedProvider);
        }
    }

    public Optional<ProviderProfile> updateProviderStars(Long id, Double stars) {
        Optional<ProviderProfile> providerOpt = providerProfileRepository.findById(id);
        if (providerOpt.isPresent()) {
            ProviderProfile provider = providerOpt.get();
            provider.setStars(stars.intValue()); // Convert Double to Integer
            return Optional.of(providerProfileRepository.save(provider));
        }
        return Optional.empty();
    }
}
