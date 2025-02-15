package org.example.userauth.controller;
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


@RestController
@RequestMapping("/auth")
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


    @PostMapping("/register")
    public ResponseEntity<?> registerUser( @Valid @RequestBody User user, HttpServletRequest request) {
       try {
        if(userRepository.existsByEmail(user.getEmail())) {
            return ResponseEntity.status(409).body("User with email already exists, try logging in");
        }
        ResponseEntity<?> response = userService.registerUser(user, request);
        return ResponseEntity.status(200).body(response);
       } catch (Exception e) {
        e.printStackTrace();
        return ResponseEntity.badRequest().body("Error during registration: " + e.getMessage());
       }
    }

    @PostMapping("/authenticate")
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

    @PostMapping("/email-verification")
    public ResponseEntity<?> postMethodName(@RequestParam("token") String token) {
        //TODO: process POST request
         
        userService.verifyEmail(token);
        return ResponseEntity.ok("Email verified successfully");
    }
    
}