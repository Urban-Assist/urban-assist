package org.example.userauth.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@ToString

public class MailResponse {
    private String message;
    private int status;

     
}   
