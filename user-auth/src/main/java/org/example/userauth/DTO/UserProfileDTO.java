package org.example.userauth.DTO;

import java.io.Serializable;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserProfileDTO implements Serializable {
    private static final long serialVersionUID = 1L;

    private String email;
    private String firstName;
    private String lastName;
    private String role;
}