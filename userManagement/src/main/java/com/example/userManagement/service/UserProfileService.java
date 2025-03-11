package com.example.userManagement.service;

 import com.example.userManagement.dto.UserProfileDTO;
import com.example.userManagement.model.ProviderProfile;
import com.example.userManagement.model.UserProfile;
import com.example.userManagement.repository.ProviderProfileRepository;
import com.example.userManagement.repository.UserProfileRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.amqp.rabbit.annotation.RabbitListener;

@Service
public class UserProfileService {

    @Autowired
    private final UserProfileRepository userProfileRepository;

     
 
    @Autowired
    private ProviderProfileRepository providerProfileRepository;
    public UserProfileService(UserProfileRepository userProfileRepository) {
        this.userProfileRepository = userProfileRepository;
    }

    public UserProfileDTO getCurrentUserProfile() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        UserProfile userProfile = userProfileRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Profile not found"));

        return convertToDTO(userProfile);
    }

    public UserProfileDTO updateProfile(UserProfileDTO profileDTO) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        if (!email.equals(profileDTO.getEmail())) {
            throw new RuntimeException("Cannot update other user's profile");
        }
    
        // Fetch existing user profile
        UserProfile existingUserProfile = userProfileRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Profile not found"));
    
        // Update the existing profile
        BeanUtils.copyProperties(profileDTO, existingUserProfile, "id", "email");  // Don't overwrite id and email
    
        existingUserProfile = userProfileRepository.save(existingUserProfile);  // Save the updated profile
        return convertToDTO(existingUserProfile);
    }
    

    @RabbitListener(queues = "${rabbitmq.queue.name}")
    public void handleUserRegistration(UserProfileDTO profileDTO) {
        final String userRole = profileDTO.getRole();
        if(userRole.equals("provider")){

            if(!providerProfileRepository.existsByEmail(profileDTO.getEmail())){
                ProviderProfile providerProfileDTO = new ProviderProfile();
                providerProfileDTO.setEmail(profileDTO.getEmail());
                providerProfileRepository.save(providerProfileDTO);

            }
            else{
                System.out.println("Profile already exists for: " + profileDTO.getEmail());
            }
            System.out.println("Provider profile created for: " + profileDTO.getEmail() + " ✅");
        }
        if(userRole.equals("user")){
            
            if (!userProfileRepository.existsByEmail(profileDTO.getEmail())) {
            UserProfile profile = new UserProfile();
            profile.setEmail(profileDTO.getEmail());
            profile.setFirstName(profileDTO.getFirstName());
            profile.setLastName(profileDTO.getLastName());

            userProfileRepository.save(profile);
            System.out.println("User profile created for: " + profileDTO.getEmail() + " ✅");
        } else {
            System.out.println("Profile already exists for: " + profileDTO.getEmail());
        }
        }
        
        
    }


    private UserProfileDTO convertToDTO(UserProfile userProfile) {
        UserProfileDTO dto = new UserProfileDTO();
        BeanUtils.copyProperties(userProfile, dto);
        return dto;
    }
}