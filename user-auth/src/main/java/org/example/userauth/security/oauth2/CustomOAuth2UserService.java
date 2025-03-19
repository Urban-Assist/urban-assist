package org.example.userauth.security.oauth2;

import java.util.Optional;
import java.util.UUID;

import org.example.userauth.DTO.UserProfileDTO;
import org.example.userauth.model.User;
import org.example.userauth.repository.UserRepository;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

@Service
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RabbitTemplate rabbitTemplate;

    @Value("${rabbitmq.exchange.name}")
    private String exchange;

    @Value("${rabbitmq.routing.key}")
    private String routingKey;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest oAuth2UserRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(oAuth2UserRequest);

        try {
            return processOAuth2User(oAuth2UserRequest, oAuth2User);
        } catch (Exception ex) {
            throw new InternalAuthenticationServiceException(ex.getMessage(), ex.getCause());
        }
    }

    private OAuth2User processOAuth2User(OAuth2UserRequest oAuth2UserRequest, OAuth2User oAuth2User) {
        OAuth2UserInfo oAuth2UserInfo = new OAuth2UserInfo(oAuth2User.getAttributes());

        if (oAuth2UserInfo.getEmail() == null) {
            throw new OAuth2AuthenticationException("Email not found from OAuth2 provider");
        }

        Optional<User> userOptional = userRepository.findByEmail(oAuth2UserInfo.getEmail());
        User user;

        if (!userOptional.isPresent()) {
            String defaultRole = "user"; // or "PROVIDER"
            user = registerNewUser(oAuth2UserRequest, oAuth2UserInfo, defaultRole);
        }

        // if(userOptional.isPresent()) {
        // user = userOptional.get();
        // user = updateExistingUser(user, oAuth2UserInfo);
        // } else {
        // user = registerNewUser(oAuth2UserRequest, oAuth2UserInfo);
        // }

        // Return the original OAuth2User so the SuccessHandler can extract needed info
        return oAuth2User;
    }

    private User registerNewUser(OAuth2UserRequest oAuth2UserRequest, OAuth2UserInfo oAuth2UserInfo,String role) {
        User user = new User();

        user.setEmail(oAuth2UserInfo.getEmail());
        user.setFirstName(oAuth2UserInfo.getFirstName());
        user.setLastName(oAuth2UserInfo.getLastName());
        user.setVerified(true); // OAuth2 users are pre-verified
        user.setRole(role);
        // Generate a random password for OAuth2 users
        user.setPassword(UUID.randomUUID().toString());

        User registeredUser = userRepository.save(user);
        System.out.println("User registered ✅");

        // Send user profile data to RabbitMQ
        UserProfileDTO profileDTO = new UserProfileDTO(
                registeredUser.getEmail(),
                registeredUser.getFirstName(),
                registeredUser.getLastName(),
                registeredUser.getRole());

        rabbitTemplate.convertAndSend(exchange, routingKey, profileDTO);
        System.out.println("Profile data sent to queue ✅");

        return registeredUser;
    }

    private User updateExistingUser(User existingUser, OAuth2UserInfo oAuth2UserInfo) {
        // Only update name fields if they're not already set
        if (existingUser.getFirstName() == null || existingUser.getFirstName().isEmpty()) {
            existingUser.setFirstName(oAuth2UserInfo.getFirstName());
        }

        if (existingUser.getLastName() == null || existingUser.getLastName().isEmpty()) {
            existingUser.setLastName(oAuth2UserInfo.getLastName());
        }

        // Always mark as verified if they authenticated via OAuth2
        existingUser.setVerified(true);

        return userRepository.save(existingUser);
    }
}