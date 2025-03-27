package com.example.userManagement.controller;
import com.example.userManagement.dto.ProviderProfileDTO;
import com.example.userManagement.model.ProviderProfile;
import com.example.userManagement.service.ProviderProfileService;
import com.example.userManagement.repository.ProviderProfileRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.security.Key;
import java.util.List;
import java.util.Optional;
import java.util.Set;


import org.springframework.http.HttpStatus;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;




@RestController
@RequestMapping("/api/provider")
//@RequiredArgsConstructor
public class ProviderManagementController {
   private static final Logger logger = LoggerFactory.getLogger(ProviderManagementController.class);
  private final ProviderProfileService providerProfileService;
  private final ProviderProfileRepository providerProfileRepository;
   @Value("${jwt.secret}")
  private String jwtSecret;




  public ProviderManagementController(ProviderProfileService providerProfileService,
                                    ProviderProfileRepository providerProfileRepository) {
      this.providerProfileService = providerProfileService;
      this.providerProfileRepository = providerProfileRepository;
  }


  @GetMapping("/profile/{id}")
  public ResponseEntity<ProviderProfileDTO> getProviderById(@PathVariable Long id,@RequestParam String service ) {
      System.out.println("Received id: " + service);
      ProviderProfileDTO profile = providerProfileService.getProviderById(id,service);
      return ResponseEntity.ok(profile);
  }


  @GetMapping
  public ResponseEntity<ProviderProfileDTO> getCurrentProviderProfile(@RequestParam String service) {
      ProviderProfileDTO profile = providerProfileService.getCurrentProviderProfile(service);
      return ResponseEntity.ok(profile);
  }


  @GetMapping("/service")
  public ResponseEntity<Set<ProviderProfileDTO>> getProvidersByService(@RequestParam String service ) {
      System.out.println("HI this is sajid"+service);
      Set<ProviderProfileDTO> providers = providerProfileService.getProvidersByService(service);
      return ResponseEntity.ok(providers);
  }




   @PostMapping
  public ResponseEntity<ProviderProfileDTO> createProviderProfile(@RequestParam String service) {
      System.out.println("Received name: " + service);
      ProviderProfileDTO profile = providerProfileService.createProviderProfile(service);
      return ResponseEntity.status(HttpStatus.CREATED).body(profile);
  }




  @PutMapping
  public ResponseEntity<ProviderProfileDTO> updateProfile(@RequestBody ProviderProfileDTO profileDTO) {
      ProviderProfileDTO updatedProfile = providerProfileService.updateProfile(profileDTO);
      return ResponseEntity.ok(updatedProfile);
  }




  // to do : end point to mark the provider as certified
  @PostMapping("/certify/{id}")
  public ResponseEntity<?> certifyProvider(
          @PathVariable Long id,
          @RequestHeader("Authorization") String authHeader) {
      try {
          String token = authHeader.replace("Bearer ", "");


          logger.debug("Request received to certify provider with ID: {}", id);
          // Use the secret key from application.properties
          byte[] keyBytes = Decoders.BASE64.decode(jwtSecret);
          Key key = Keys.hmacShaKeyFor(keyBytes);
        
          // Securely parse JWT token
          Claims claims = Jwts.parserBuilder()
                  .setSigningKey(key)
                  .build()
                  .parseClaimsJws(token)
                  .getBody();




           // Check if user has admin role
           String role = null;
           try {
               // Get the roles array
               List<String> roles = claims.get("roles", List.class);
               if (roles != null && !roles.isEmpty()) {
                   // Get the first role from the array
                   role = roles.get(0);
               }
           } catch (Exception e) {
               logger.warn("Error extracting roles from JWT token", e);
           }


           System.out.println("Role extracted from token: " + role);
           logger.debug("User role from token: {}", role);


           if ("admin".equals(role)) {
               // User is an admin, proceed with the certification
           } else {
               return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Only administrators can certify providers");
           }




          // Fetch provider entity from repository
          Optional<ProviderProfile> providerOpt = providerProfileRepository.findById(id);
          if (providerOpt.isEmpty()) {
              return ResponseEntity.notFound().build();
          }




           // Update certification status
          ProviderProfile provider = providerOpt.get();
          provider.setCertified(true);
          providerProfileRepository.save(provider);  // Persist to database




          return ResponseEntity.ok("Provider certified successfully");
        
      } catch (ExpiredJwtException | MalformedJwtException e) {
          return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid or expired token");
      } catch (Exception e) {
          return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred");
      }
  }

  @GetMapping("/pending-certifications")
  public ResponseEntity<List<ProviderProfileDTO>> getPendingCertificationProviders() {
      List<ProviderProfileDTO> pendingProviders = providerProfileService.getPendingCertificationProviders();
      return ResponseEntity.ok(pendingProviders);
  }

  @GetMapping("/verified-providers")
  public ResponseEntity<List<ProviderProfileDTO>> getVerifiedProviders() {
      List<ProviderProfileDTO> verifiedProviders = providerProfileService.getVerifiedProviders();
      return ResponseEntity.ok(verifiedProviders);
  }




  // to do : end point to delete the provider profile
}
