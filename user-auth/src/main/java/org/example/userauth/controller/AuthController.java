package org.example.userauth.controller;

import java.io.IOException;
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
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.oauth2.client.registration.ClientRegistration;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/auth-api")
// for making end point which is accessible for the users = /auth-api/user
// for making end point which is accessible for the admin = /auth-api/admin
// for making end point which is accessible for the provider =
// /auth-api/provider
// for making end point as open use , just /auth-api/public/ENDPOINT_NAME
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

    @Autowired(required = false)
    private ClientRegistrationRepository clientRegistrationRepository;

    @PostMapping("/public/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody User user, HttpServletRequest request) {
        try {
            if (userRepository.existsByEmail(user.getEmail())) {
                return ResponseEntity.status(409).body("User with email already exists, try logging in");
            }
            ResponseEntity<?> response = userService.registerUser(user, request);
            return ResponseEntity.status(200).body(response);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Error during registration: " + e.getMessage());
        }
    }

    @PostMapping("/public/authenticate")
    public ResponseEntity<?> createAuthenticationToken(@Valid @RequestBody AuthenticationRequest request)
            throws Exception {
        // Authenticate the user
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
        } catch (BadCredentialsException e) {
            // Handle invalid email or password
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
        }

        // Load user details
        final UserDetails userDetails = userDetailsService.loadUserByUsername(request.getEmail());

        Optional<User> optionalExistingUser = userRepository.findByEmail(userDetails.getUsername());

        User existingUser = optionalExistingUser.get();
        if (existingUser.getVerified() == false) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Email not verified");
        }
        // Generate JWT token
        final String jwt = jwtUtil.generateToken(userDetails);

        return ResponseEntity.ok(jwt);
    }

    @GetMapping("/public/email-verification")
    public ResponseEntity<?> postMethodName(@RequestParam("token") String token, HttpServletRequest request)
            throws IOException {

        userService.verifyEmail(token, request);
        return ResponseEntity.ok("Email verified successfully");
    }

    @GetMapping("/provider/demo")
    public ResponseEntity<?> admin() {
        return ResponseEntity.ok("user access granted");
    }

    @GetMapping("/public/oauth2-urls")
    public ResponseEntity<?> getOAuth2Urls(HttpServletRequest request) {
        Map<String, String> urls = new HashMap<>();

        // Build the authorization URLs manually or use OAuth2 client registration
        // repository
        String googleAuthUrl = "http://localhost:8080/auth-api/oauth2/authorize/google";
        String githubAuthUrl = "http://localhost:8080/auth-api/oauth2/authorize/github";

        urls.put("google", googleAuthUrl);
        urls.put("github", githubAuthUrl);

        return ResponseEntity.ok(urls);
    }

}