package org.example.userauth.controller;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.security.core.Authentication;
import org.example.userauth.model.User;
import org.example.userauth.repository.UserRepository;
import org.example.userauth.security.CustomUserDetailService;
import org.example.userauth.security.JwtUtil;
import org.example.userauth.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
 

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
 
 import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
 

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;


 

@RestController
@RequestMapping("/auth-api")
//for making end point which is accessible for the users = /auth-api/user
//for making end point which is accessible for the admin = /auth-api/admin
//for making end point which is accessible for the provider = /auth-api/provider
//for making end point as open  use , just /auth-api/public/ENDPOINT_NAME
@Validated
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private CustomUserDetailService userDetailsService;

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @Value("${PUBLIC_KEY}")  
    private String publicKey;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser( @Valid @RequestBody User user, HttpServletRequest request) {
       try {
        if(userRepository.existsByEmail(user.getEmail())) {
            ObjectMapper objectMapper = new ObjectMapper();
            ObjectNode response = objectMapper.createObjectNode();
            response.put("message", "User with email already exists, try logging in");
            return ResponseEntity.status(409).body(response);
        }
        ResponseEntity<?> response = userService.registerUser(user, request);
        return ResponseEntity.status(200).body(response);
       } catch (Exception e) {
        e.printStackTrace();
        return ResponseEntity.badRequest().body("Error during registration: " + e.getMessage());
       }
    }

    @PostMapping("/public/authenticate")
    public ResponseEntity<?> createAuthenticationToken(@Valid @RequestBody AuthenticationRequest request) throws Exception {
        // Authenticate the user
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
            );
        } catch (BadCredentialsException e) {
            // Handle invalid email or password
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
        }

        // Load user details
        final UserDetails userDetails = userDetailsService.loadUserByUsername(request.getEmail());

        User existingUser = userRepository.findByEmail(userDetails.getUsername());
        
        // Generate JWT token
        final String jwt = jwtUtil.generateToken(userDetails);
        
        
         return ResponseEntity.ok(jwt);
    }

    @GetMapping("/email-verification")
    public ResponseEntity<?> postMethodName(@RequestParam("token") String token ) {
        //TODO: process POST request
         
        userService.verifyEmail(token );
        return ResponseEntity.ok("Email verified successfully");
    }
    
     @GetMapping("/public-key")
    public String getPublicKey() throws Exception {
        return new String(publicKey);
    }
    @GetMapping("/provider/demo")
    public ResponseEntity<?> admin() {
        return ResponseEntity.ok("user access granted");
    }
}