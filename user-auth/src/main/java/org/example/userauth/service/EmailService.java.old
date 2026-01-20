package org.example.userauth.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

import org.example.userauth.DTO.MailRequest;
import org.example.userauth.DTO.MailResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import jakarta.servlet.http.HttpServletRequest;

import org.example.userauth.model.User;

@Service
public class EmailService {

    @Autowired
    RestTemplate restTemplate;

    @Value("${EMAIL_SERVER_URL}") // Inject the URL from the environment variable
    private String emailServiceUrl;

    public boolean sendEmail(String token, User user, HttpServletRequest request) throws IOException {
        // Read the HTML template
        String htmlTemplate = new String(Files.readAllBytes(Paths.get("user-auth/src/main/java/org/example/userauth/templates/verify.html")));

        // Generate the verification link
        String verificationLink = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + "/auth-api/public/email-verification?token=" + token;

        // Replace the placeholder with the actual verification link
        String emailContent = htmlTemplate.replace("{{verificationLink}}", verificationLink);

        // Send email with the verification link
        MailRequest emailRequest = new MailRequest();
        emailRequest.setTo(user.getEmail());
        emailRequest.setText(emailContent); // Use the modified HTML content
        emailRequest.setSubject("Email Verification");
        String url = emailServiceUrl;

        try {
             MailResponse response = restTemplate.postForObject(url, emailRequest, MailResponse.class);

            // Check if the email was sent successfully
            if (response.getStatus() == 200 && response.getMessage().equals("Email sent successfully")) {
                System.out.println("Email sent successfully ✅");
                return true;
            } else {
                System.out.println("Email not sent ❌");
                return false;
            }
        } catch (Exception e) {
            // Situation where the Email microservice is not running
            System.out.println("Email not sent ❌" + " " + "Possible cause: Email microservice is not running");
            return false;
        }
    }
}