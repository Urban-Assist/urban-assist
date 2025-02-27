package org.example.userauth.service;

import java.util.Optional;
import java.util.UUID;
import org.example.userauth.model.EmailConfirmation;
import org.example.userauth.model.User;
import org.example.userauth.repository.EmailTokenRepository;
import org.example.userauth.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import jakarta.servlet.http.HttpServletRequest;
import org.example.userauth.service.EmailService;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Value;
import org.example.userauth.DTO.UserProfileDTO;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private EmailTokenRepository emailTokenRepository;
    
    @Autowired
    private EmailService emailService;

    @Autowired
    private RabbitTemplate rabbitTemplate;

    @Value("${rabbitmq.exchange.name}")
    private String exchange;

    @Value("${rabbitmq.routing.key}")
    private String routingKey;

    public ResponseEntity<?> registerUser(User user, HttpServletRequest request) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        //create token for email verification
        String token = UUID.randomUUID().toString();
        System.out.println("Token generated ✅");

        //send email with token for verification
        Boolean emailSent = emailService.sendEmail(token, user, request);
        if (emailSent) {
            User registeredUser = userRepository.save(user);
            System.out.println("User registered ✅");

            // Send user profile data to RabbitMQ
            UserProfileDTO profileDTO = new UserProfileDTO(
                    registeredUser.getEmail(),
                    registeredUser.getFirstName(),
                    registeredUser.getLastName()
            );

            rabbitTemplate.convertAndSend(exchange, routingKey, profileDTO);
            System.out.println("Profile data sent to queue ✅");

            //save email token
            EmailConfirmation emailObject = new EmailConfirmation();
            emailObject.setToken(token);
            emailObject.setUser(user);
            emailTokenRepository.save(emailObject);

            System.out.println("Email token saved ✅");

            //create response JSON object
            ObjectMapper objectMapper = new ObjectMapper();
            ObjectNode response = objectMapper.createObjectNode();
            response.put("message", "User registered successfully ✅");
            response.put("Registered User", registeredUser.getEmail());   

            //send the response
            return ResponseEntity.status(200).body(response);
        } else {
            //create response JSON object
            ObjectMapper objectMapper = new ObjectMapper();
            ObjectNode response = objectMapper.createObjectNode();
            response.put("message", "Unable to register user ❌");
            response.put("Reason", "Email not sent ❌");
            System.out.println("Unable to register user ❌");

            return ResponseEntity.status(400).body(response);
        }
    }

    public ResponseEntity<?> verifyEmail(String token) {
        System.out.println(token);

        EmailConfirmation emailToken = emailTokenRepository.findByToken(token);
        if (emailToken == null) {
            //create response JSON object
            ObjectMapper objectMapper = new ObjectMapper();
            ObjectNode response = objectMapper.createObjectNode();
            response.put("message", "Invalid token ❌");
            response.put("Reason", "Token not found ❌");
            System.out.println("Invalid token ❌");

            return ResponseEntity.status(400).body(response);
        }
        User tempUser = emailToken.getUser();
        Optional<User> user = userRepository.findById(tempUser.getId());
        user.get().setVarified(true);
        userRepository.save(user.get());

        emailTokenRepository.delete(emailToken);
        return ResponseEntity.ok().body("Email verified successfully ✅");
    }
}
