package org.example.userauth.service;

import java.util.UUID;

import org.example.userauth.DTO.MailRequest;
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
    EmailService emailService;
    public ResponseEntity<?> registerUser(User user) {
      
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        //create token for email varification
        String token = UUID.randomUUID().toString();
        System.out.println("Token generated ✅");

        //send email with token for verification
        Boolean emailSent = emailService.sendEmail(token, user);
        if (emailSent){
            User registeredUser = userRepository.save(user);
            System.out.println("User registered ✅");
    
            //setting the token for the email verification.
            EmailConfirmation emailObject = new EmailConfirmation();
            emailObject.setToken(token);
            emailObject.setUser(user);
            emailTokenRepository.save(emailObject);
    
            System.out.println("Email token saved ✅");

            //create respone JSON object
            ObjectMapper objectMapper = new ObjectMapper();
            ObjectNode response = objectMapper.createObjectNode();
            response.put("message", "User registered successfully ✅");
            response.put("Registered User", registeredUser.getEmail());   
            
            //send the resopnse
            return ResponseEntity.status(200).body(response);
        }
        else{
             //create respone JSON object
             ObjectMapper objectMapper = new ObjectMapper();
             ObjectNode response = objectMapper.createObjectNode();
             response.put("message", "Unable to register user ❌");
             response.put("Reason","Email not sent ❌");    
             System.out.println("Unable to register user ❌");
             
            return ResponseEntity.status(400).body(response);   
        }
     }
}