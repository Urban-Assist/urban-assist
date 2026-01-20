package org.example.userauth.service;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;
import org.example.userauth.model.EmailConfirmation;
import org.example.userauth.model.PasswordResetToken;
import org.example.userauth.model.User;
import org.example.userauth.repository.EmailTokenRepository;
import org.example.userauth.repository.PasswordResetTokenRepository;
import org.example.userauth.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
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
    private PasswordResetTokenRepository passwordResetTokenRepository;

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
        Boolean emailSent = emailService.sendEmail(token, user, request);
        if (emailSent) {
            User registeredUser = userRepository.save(user);
            System.out.println("User registered ✅");

            // RabbitMQ disabled - not needed for current setup
            // Send user profile data to RabbitMQ
            // UserProfileDTO profileDTO = new UserProfileDTO(
            // registeredUser.getEmail(),
            // registeredUser.getFirstName(),
            // registeredUser.getLastName());
            // rabbitTemplate.convertAndSend(exchange, routingKey, profileDTO);
            // System.out.println("Profile data sent to queue ✅");

            // save email token
            EmailConfirmation emailObject = new EmailConfirmation();
            emailObject.setToken(token);
            emailObject.setUser(user);
            emailTokenRepository.save(emailObject);

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

    public ResponseEntity<?> verifyEmail(String token) {
        System.out.println(token);

        EmailConfirmation emailToken = emailTokenRepository.findByToken(token);
        if (emailToken == null) {
            // create response JSON object
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

    @Transactional
    public ResponseEntity<?> forgotPassword(String email, HttpServletRequest request) {
        ObjectMapper objectMapper = new ObjectMapper();
        ObjectNode response = objectMapper.createObjectNode();

        // Check if user exists
        User user = userRepository.findByEmail(email);
        if (user == null) {
            response.put("message", "If the email exists, a password reset link has been sent");
            return ResponseEntity.ok(response);
        }

        // Delete any existing reset tokens for this user
        passwordResetTokenRepository.deleteByUser_Id(user.getId());

        // Generate reset token
        String token = UUID.randomUUID().toString();
        PasswordResetToken resetToken = new PasswordResetToken();
        resetToken.setToken(token);
        resetToken.setUser(user);
        resetToken.setExpiryDate(LocalDateTime.now().plusHours(1)); // Token valid for 1 hour
        passwordResetTokenRepository.save(resetToken);

        // Send password reset email
        try {
            String resetUrl = getBaseUrl(request) + "/reset-password?token=" + token;
            Boolean emailSent = emailService.sendPasswordResetEmail(token, user, resetUrl);

            if (emailSent) {
                response.put("message", "If the email exists, a password reset link has been sent");
                return ResponseEntity.ok(response);
            } else {
                response.put("message", "Error sending password reset email");
                return ResponseEntity.status(500).body(response);
            }
        } catch (Exception e) {
            response.put("message", "Error processing password reset request");
            return ResponseEntity.status(500).body(response);
        }
    }

    @Transactional
    public ResponseEntity<?> resetPassword(String token, String newPassword) {
        ObjectMapper objectMapper = new ObjectMapper();
        ObjectNode response = objectMapper.createObjectNode();

        // Find token
        PasswordResetToken resetToken = passwordResetTokenRepository.findByToken(token);

        if (resetToken == null) {
            response.put("message", "Invalid or expired reset token");
            return ResponseEntity.status(400).body(response);
        }

        if (resetToken.isUsed()) {
            response.put("message", "This reset token has already been used");
            return ResponseEntity.status(400).body(response);
        }

        if (resetToken.isExpired()) {
            response.put("message", "Reset token has expired");
            passwordResetTokenRepository.delete(resetToken);
            return ResponseEntity.status(400).body(response);
        }

        // Update user password
        User user = resetToken.getUser();
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);

        // Mark token as used and delete
        resetToken.setUsed(true);
        passwordResetTokenRepository.delete(resetToken);

        response.put("message", "Password has been reset successfully");
        return ResponseEntity.ok(response);
    }

    private String getBaseUrl(HttpServletRequest request) {
        String scheme = request.getScheme();
        String serverName = request.getServerName();
        int serverPort = request.getServerPort();
        String contextPath = request.getContextPath();

        // For development, return frontend URL
        return "http://localhost:5174";
    }

    public boolean checkPassword(User user, String rawPassword) {
        return passwordEncoder.matches(rawPassword, user.getPassword());
    }

    public String encodePassword(String rawPassword) {
        return passwordEncoder.encode(rawPassword);
    }
}
