package org.example.userauth.service;

import java.io.IOException;
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
import org.springframework.transaction.annotation.Transactional;

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

    public ResponseEntity<?> registerUser(User user, HttpServletRequest request) throws IOException {
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        // create token for email verification
        String token = UUID.randomUUID().toString();
        System.out.println("Token generated ✅");

        // send email with token for verification
        Boolean emailSent = emailService.sendEmail(token, user, request, "verify.html");
        if (emailSent) {
            User registeredUser = userRepository.save(user);
            System.out.println("User registered ✅");

            // Send user profile data to RabbitMQ
            UserProfileDTO profileDTO = new UserProfileDTO(
                    registeredUser.getEmail(),
                    registeredUser.getFirstName(),
                    registeredUser.getLastName(),
                    registeredUser.getRole()

            );
            // save email token
            EmailConfirmation emailObject = new EmailConfirmation();
            emailObject.setToken(token);
            emailObject.setUser(user);
            emailTokenRepository.save(emailObject);
            rabbitTemplate.convertAndSend(exchange, routingKey, profileDTO);
            System.out.println("Profile data sent to queue ✅");

            System.out.println("Email token saved ✅");

            // create response JSON object
            ObjectMapper objectMapper = new ObjectMapper();
            ObjectNode response = objectMapper.createObjectNode();
            response.put("message", "User registered successfully ✅");
            response.put("Registered User", registeredUser.getEmail());

            // send the response
            return ResponseEntity.status(200).body(response);
        } else {
            // create response JSON object
            ObjectMapper objectMapper = new ObjectMapper();
            ObjectNode response = objectMapper.createObjectNode();
            response.put("message", "Unable to register user ❌");
            response.put("Reason", "Email not sent ❌");
            System.out.println("Unable to register user ❌");

            return ResponseEntity.status(400).body(response);
        }
    }

    @Transactional
    public ResponseEntity<?> verifyEmail(String token, HttpServletRequest request) throws IOException {
        System.out.println("Verifying token: " + token);

        // Add debug logging for database query
        System.out.println("Looking for token in database: " + token);
        EmailConfirmation emailToken = emailTokenRepository.findByToken(token);
        System.out.println(emailToken);
        System.out.println("Database query result: "
                + (emailToken == null ? "No token found" : "Token found for user: " + emailToken.getUser().getEmail()));

        if (emailToken == null) {
            ObjectMapper objectMapper = new ObjectMapper();
            ObjectNode response = objectMapper.createObjectNode();
            response.put("message", "Invalid token ❌");
            response.put("reason", "Token not found ❌");
            System.out.println("Invalid token ❌");
            return ResponseEntity.status(400).body(response);
        }

        User tempUser = emailToken.getUser();
        User user = userRepository.findById(tempUser.getId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Set verified flag and save
        user.setVerified(true);
        userRepository.save(user);

        // send a welcome email
        Boolean emailSent = emailService.sendWelcomeEmail("welcome.html", request, tempUser);
        if (!emailSent) {
            ObjectMapper objectMapper = new ObjectMapper();
            ObjectNode response = objectMapper.createObjectNode();
            response.put("message", "Unable to verify email ❌");
            response.put("reason", "Email not sent ❌");
            System.out.println("Unable to verify email ❌");
            return ResponseEntity.status(400).body(response);
        }
        // Delete token after successful verification
        if (emailToken != null) {
            emailTokenRepository.delete(emailToken);

        }

        System.out.println("Email verified successfully for user: " + user.getEmail());
        return ResponseEntity.ok().body("Email verified successfully ✅");
    }
}
