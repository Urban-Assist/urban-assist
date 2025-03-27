package org.example.userauth.service;

import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
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

    public boolean sendEmail(String token, User user, HttpServletRequest request, String template) throws IOException {
        // Read the HTML template

        InputStream inputStream = getClass().getClassLoader().getResourceAsStream("templates/"+template);
        String htmlTemplate = new String(inputStream.readAllBytes(), StandardCharsets.UTF_8);

        // Generate the verification link
        String verificationLink = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
                + "/auth-api/public/email-verification?token=" + token;

        // Replace the placeholder with the actual verification link
        String emailContent = htmlTemplate.replace("{{verificationLink}}", verificationLink);

        // Send email with the verification link
        MailRequest emailRequest = new MailRequest();
        emailRequest.setTo(user.getEmail());
        emailRequest.setText(emailContent); // Use the modified HTML content
        emailRequest.setSubject("Email Verification");
        String url = emailServiceUrl;

        // Send the email using the Email microservice
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

    public boolean sendWelcomeEmail(String template, HttpServletRequest request, User user) throws IOException {
        InputStream inputStream = getClass().getClassLoader().getResourceAsStream("templates/"+template);
        String htmlTemplate = new String(inputStream.readAllBytes(), StandardCharsets.UTF_8);

        // Generate the verification link
        String loginLink = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
                + "login";
       

        // Replace the placeholder with the signin link 
        String emailContent = htmlTemplate.replace("{{signinLink}}", loginLink);

        // Send email with the verification link
        MailRequest emailRequest = new MailRequest();
        emailRequest.setTo(user.getEmail());
        emailRequest.setText(emailContent); // Use the modified HTML content instead of htmlTemplate
        emailRequest.setSubject("Welcome to the Urban Assist.");
        String url = emailServiceUrl;

        try {
            MailResponse response = restTemplate.postForObject(url, emailRequest, MailResponse.class);

            // Check if the email was sent successfully
            if (response.getStatus() == 200 && response.getMessage().equals("Email sent successfully")) {
                System.out.println("Welcome Email sent successfully ✅");
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