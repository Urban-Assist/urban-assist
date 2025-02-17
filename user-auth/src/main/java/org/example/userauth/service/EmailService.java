package org.example.userauth.service;

import org.example.userauth.DTO.MailRequest;
import org.example.userauth.DTO.MailResponse;
import org.example.userauth.model.EmailConfirmation;
import org.example.userauth.repository.EmailTokenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

 
import org.example.userauth.model.User;


@Service
public class EmailService {
    
 

    @Autowired
    RestTemplate restTemplate;

    @Value("http://localhost:9000/mail/send") // Inject the URL from the environment variable
    private String emailServiceUrl;
    public boolean sendEmail( String token, User user) {
        if(true) return true;
        //send email with token for verification
        MailRequest emailRequest = new MailRequest();
            emailRequest.setTo(user.getEmail());
            emailRequest.setText(token);
            emailRequest.setSubject("Email Verification");
            String url = emailServiceUrl;
    
            try {
                MailResponse response = restTemplate.postForObject(url, emailRequest, MailResponse.class);

                //check if the email was sent successfully
                if(response.getStatus() == 200 && response.getMessage().equals("Email sent successfully")) {
                    System.out.println("Email sent successfully ✅");
                    return true;
                }
                else {
                    System.out.println("Email not sent ❌");
                    return false;
                }
            } catch (Exception e) {
                    //Situation where the Email microservice is not running
                    System.out.println("Email not sent ❌"+" "+"Possible cause: Email microservice is not running");
                    return false;
                }
    }
}
