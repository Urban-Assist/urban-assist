package org.example.userauth.service;

import java.io.IOException;
import java.nio.charset.StandardCharsets;

import org.example.userauth.DTO.MailRequest;
import org.example.userauth.DTO.MailResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;
import org.springframework.util.StreamUtils;
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
        // Read the HTML template from classpath resources
        ClassPathResource resource = new ClassPathResource("templates/verify.html");
        String htmlTemplate = StreamUtils.copyToString(resource.getInputStream(), StandardCharsets.UTF_8);

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

    public boolean sendPasswordResetEmail(String token, User user, String resetUrl) {
        try {
            String emailContent = "<html><body style='font-family: Arial, sans-serif;'>" +
                    "<div style='max-width: 600px; margin: 0 auto; padding: 20px;'>" +
                    "<h2 style='color: #333;'>Password Reset Request</h2>" +
                    "<p>Hello " + user.getFirstName() + ",</p>" +
                    "<p>We received a request to reset your password. Click the button below to reset it:</p>" +
                    "<div style='margin: 30px 0;'>" +
                    "<a href='" + resetUrl
                    + "' style='background-color: #7c3aed; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;'>Reset Password</a>"
                    +
                    "</div>" +
                    "<p>Or copy and paste this link into your browser:</p>" +
                    "<p style='color: #666; word-break: break-all;'>" + resetUrl + "</p>" +
                    "<p style='color: #999; font-size: 12px; margin-top: 30px;'>This link will expire in 1 hour. If you didn't request a password reset, please ignore this email.</p>"
                    +
                    "</div></body></html>";

            MailRequest emailRequest = new MailRequest();
            emailRequest.setTo(user.getEmail());
            emailRequest.setText(emailContent);
            emailRequest.setSubject("Password Reset Request - Urban Assist");

            String url = emailServiceUrl;
            MailResponse response = restTemplate.postForObject(url, emailRequest, MailResponse.class);

            if (response.getStatus() == 200 && response.getMessage().equals("Email sent successfully")) {
                System.out.println("Password reset email sent successfully ✅");
                return true;
            } else {
                System.out.println("Password reset email not sent ❌");
                return false;
            }
        } catch (Exception e) {
            System.out.println("Password reset email not sent ❌ Possible cause: Email microservice is not running");
            e.printStackTrace();
            return false;
        }
    }
}
