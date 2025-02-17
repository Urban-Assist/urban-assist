package org.example.userauth.service;

import java.util.UUID;

import org.example.userauth.DTO.MailRequest;
import org.example.userauth.DTO.UserProfileDTO;
import org.example.userauth.DTO.MailResponse;
import org.example.userauth.model.EmailConfirmation;
import org.example.userauth.model.User;
import org.example.userauth.repository.EmailTokenRepository;
import org.example.userauth.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Value;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

 
@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private EmailTokenRepository emailTokenRepository;

    @Autowired
    private RabbitTemplate rabbitTemplate;

    @Value("${rabbitmq.exchange.name}")
    private String exchange;

    @Value("${rabbitmq.routing.key}")
    private String routingKey;


    @Autowired
    EmailService emailService;
    public ResponseEntity<?> registerUser(User user) {

        user.setPassword(passwordEncoder.encode(user.getPassword()));

        String token = UUID.randomUUID().toString();
        System.out.println("Token generated ✅");

        Boolean emailSent = emailService.sendEmail(token, user);
        if (emailSent) {
            User registeredUser = userRepository.save(user);
            System.out.println("User registered ✅");

            // Send user profile data to profile service
            UserProfileDTO profileDTO = new UserProfileDTO(
                    registeredUser.getEmail(),
                    registeredUser.getFirstName(),
                    registeredUser.getLastName()
            );

            rabbitTemplate.convertAndSend(exchange, routingKey, profileDTO);
            System.out.println("Profile data sent to queue ✅");

            EmailConfirmation emailObject = new EmailConfirmation();
            emailObject.setToken(token);
            emailObject.setUser(user);
            emailTokenRepository.save(emailObject);

            System.out.println("Email token saved ✅");

            ObjectMapper objectMapper = new ObjectMapper();
            ObjectNode response = objectMapper.createObjectNode();
            response.put("message", "User registered successfully ✅");
            response.put("Registered User", registeredUser.getEmail());

            return ResponseEntity.status(200).body(response);
        } else {
            ObjectMapper objectMapper = new ObjectMapper();
            ObjectNode response = objectMapper.createObjectNode();
            response.put("message", "Unable to register user ❌");
            response.put("Reason","Email not sent ❌");
            System.out.println("Unable to register user ❌");

            return ResponseEntity.status(400).body(response);
        }
     }
}