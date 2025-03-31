package org.example.userauth.security;

 
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import org.example.userauth.model.User;
import org.example.userauth.repository.UserRepository;
import org.example.userauth.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

 

import org.springframework.http.*;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
@RequestMapping("/auth-api/public/OAuth")
public class OAuth {
    @Value("${spring.security.oauth2.client.registration.google.client-id}")
    private String clientId ;

    @Value("${spring.security.oauth2.client.registration.google.client-secret}")
    private String clientSecret ;

    @Autowired
    private RestTemplate restTemplate;

    @Autowired 
   CustomUserDetailService userService;

   @Autowired
   private UserRepository userRepository;

   @Autowired
   private JwtUtil jwtUtil;
     
@Autowired
private PasswordEncoder passwordEncoder;
    @GetMapping("/callback")
    public ResponseEntity<?> handleGoogleCallback(@RequestParam String code){
        try {
            //1. check whether the code is null or empty

            System.out.println(clientId);
            System.out.println(clientSecret);
             if(code == null || code.isEmpty()){
                System.out.println("Did not get the authorization code from the frontend. ❌" );
                return ResponseEntity.badRequest().body("Invalid authorization code");
            }
            System.out.println("Successfully received the authorization code from the frontend. ✅" );
            System.out.println("Authorization code: " + code);

            //2. Exchange the authorization code for an access token from the google auth server.
            String tokenEndpoint = "https://oauth2.googleapis.com/token";

                //2.1 Creating parametes, to be sent to the google auth server
                MultiValueMap<String,String> params = new LinkedMultiValueMap<>();
                params.add("code", code);
                params.add("client_id", clientId);
                params.add("client_secret", clientSecret);
                params.add("scope", "https://www.googleapis.com/auth/userinfo.email openid");

                //This should be the same as the one used in the authorization request
                params.add("redirect_uri", "http://advancedweb-vm4.research.cs.dal.ca/auth-api/public/OAuth/callback");
                params.add("grant_type", "authorization_code");

                //2.2 Creating headers, to be sent to the google auth server
                HttpHeaders headers = new HttpHeaders();
                
                headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
              //  headers.add("User-Agent", "google-oauth-playground");


                // Request to be send to the google auth server with PARAMS and HEADERS
                HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(params, headers);


                // 2.3 Sending the request to the google auth server using RestTemplate
                ResponseEntity<Map> tokenResponse =  restTemplate.postForEntity(tokenEndpoint, request, Map.class);

               

                 
           
            //3 post processing after the response.
                //3.1 Now from the response extract the "id_token" and parse it to the string
                 String idToken = (String) tokenResponse.getBody().get("id_token");
                 // this will get the scopes from the google (Email, name, ....)
                 String userInfoUrl = "https://oauth2.googleapis.com/tokeninfo?id_token=" + idToken;

                 //3.2 send the request for the retrieval of the user info from the given id_token
                 ResponseEntity<Map> userInfoResponse = restTemplate.getForEntity(userInfoUrl, Map.class);

                 //3.4 Response porcessing
                 if(userInfoResponse.getStatusCode() == HttpStatus.OK){
                    // extract the email from the user info response
                    Map<String, Object> userInfo = userInfoResponse.getBody();
                    String email = (String) userInfo.get("email");
                    String fName = (String) userInfo.get("given_name");
                    String lName = (String) userInfo.get("family_name");
                    System.out.println("Successfully received the user info from the google auth server. ✅" );
                    System.out.println("User info: " + userInfo);
                    System.out.println("User email: " + email);
                    System.out.println("User first name: " + fName);
                    System.out.println("User last name: " + lName);
                    /*
                     * Now we got the email
                     * We can design our own flow for this.
                     * ------------------------------------
                     * Urban assist's flow:
                     * 1. check if the email is already registered in the database
                     * 2. if yes, then login the user -- give the JWT token
                     * 3. if no, then register the user and login -- give the JWT token
                     * 4. redirect the user to the home page
                     */
                    
                  
                    
                         // if the user exists in the database, then we will get the user details
                        UserDetails userDetails = null;
                        try {
                            userDetails = userService.loadUserByUsername(email);
                            System.out.println("User found in the database. ✅" );
                        } catch (Exception e) {
                            // if the user does not exist in the database, then we will get an exception
                            System.out.println("User not found in the database. ❌" );
                            User user = new User();
                            user.setEmail(email);
                            user.setFirstName(fName);
                            user.setLastName(lName);
                            user.setVerified(true);
                            // set the random password encoded by the bcrypt password encoder
                            user.setPassword(passwordEncoder.encode(UUID.randomUUID().toString()));
                            userRepository.save(user);
                            System.out.println("User registered successfully via google ✅" );
                            System.out.println("<-----making the call again------->" );
                            userDetails = userService.loadUserByUsername(email);
                        }
                     
                          
                     
                        // if there is the user in the database then it will set the authentication in the security context
                        System.out.println("User found in the database. ✅" );
                        System.out.println("Setting the authentication in the security context. 📍" );
                       String jwtToken = jwtUtil.generateToken(userDetails);
                        System.out.println("JWT token generated successfully. ✅" );
                        System.out.println("JWT token: " + jwtToken);   

                        // Include the token and redirect URL in the response
                        Map<String, String> response = new HashMap<>();
                        response.put("token", jwtToken);
                        response.put("redirectUrl", "http://advancedweb-vm4.research.cs.dal.ca/dashboard");

                        return ResponseEntity.ok(response);
            
                 }

                 return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized");
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal server error");
        }
        
    }
    
    
}



/*
 for frotnend
https://accounts.google.com/o/oauth2/auth?
client_id=YOUR_CLIENT_ID
    &redirect_uri=YOUR_REDIRECT_URI
    &response_type=code
    &scope=email profile
    &access_type=offline
    &prompt=consent

*/