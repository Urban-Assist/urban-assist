package com.example.userManagement.service;

import com.example.userManagement.dto.ProviderProfileDTO;
import com.example.userManagement.model.ProviderProfile;
import com.example.userManagement.model.UserProfile;
import com.example.userManagement.repository.ProviderProfileRepository;
import com.example.userManagement.repository.UserProfileRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;
import java.util.Collections;

@Service
public class ProviderProfileService {

    private final ProviderProfileRepository providerProfileRepository;
    private final UserProfileRepository userProfileRepository;

    public ProviderProfileService(ProviderProfileRepository providerProfileRepository, UserProfileRepository userProfileRepository) {
        this.providerProfileRepository = providerProfileRepository;
        this.userProfileRepository = userProfileRepository;
    }

    /**
     * Fetches the provider profile for the authenticated user.
     * If no profile exists, throws a 404 Not Found error.
     */
    public ProviderProfileDTO getCurrentProviderProfile() {
        // Extract email from the authenticated user's context
        
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        // Fetch the provider profile
        
        ProviderProfile providerProfile = providerProfileRepository.findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException( HttpStatus.NOT_FOUND,"Provider profile not found"));

        return convertToDTO(providerProfile);
    }

    /**
     * Creates a new provider profile for the authenticated user.
     * If the user profile does not exist, throws a 404 Not Found error.
     */
    public ProviderProfileDTO createProviderProfile() {
        // Extract email from the authenticated user's context
        String email = SecurityContextHolder.getContext().getAuthentication().getName();

        // Fetch user details from the user_profile table
        UserProfile userProfile = userProfileRepository.findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User profile not found"));

        // Create a new provider profile with details from the user_profile table
        ProviderProfile newProfile = new ProviderProfile();
        newProfile.setEmail(userProfile.getEmail());
        newProfile.setFirstName(userProfile.getFirstName());
        newProfile.setLastName(userProfile.getLastName());
        newProfile.setDescription("No description available");
        newProfile.setProfilePic("https://wartapoin.com/wp-content/uploads/2023/06/foto-profil-wa-gabut-keren-4.jpg");
        newProfile.setStars(0);
        newProfile.setAddress("Not specified");
        newProfile.setPrice("0");
        newProfile.setWorkImages(Collections.emptyList());
        newProfile.setTestimonials(Collections.emptyList());
        newProfile.setPhoneNumber("Not provided");
        newProfile.setLinkedin("#");

        // Save the new provider profile
        ProviderProfile savedProfile = providerProfileRepository.save(newProfile);
        return convertToDTO(savedProfile);
    }

    
    public ProviderProfileDTO updateProfile(ProviderProfileDTO profileDTO) {
        // Extract email from the authenticated user's context
        String email = SecurityContextHolder.getContext().getAuthentication().getName();

        // Validate that the email matches the profile being updated
        if (!email.equals(profileDTO.getEmail())) {
            throw new RuntimeException("Cannot update another user's profile");
        }

        // Fetch the existing profile
        ProviderProfile existingProfile = providerProfileRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Profile not found"));

        // Update the profile fields (excluding id and email)
        BeanUtils.copyProperties(profileDTO, existingProfile, "id", "email");

        // Save the updated profile
        ProviderProfile updatedProfile = providerProfileRepository.save(existingProfile);
        return convertToDTO(updatedProfile);
    }

    
    private ProviderProfileDTO convertToDTO(ProviderProfile profile) {
        ProviderProfileDTO dto = new ProviderProfileDTO();
        BeanUtils.copyProperties(profile, dto);
        return dto;
    }
}