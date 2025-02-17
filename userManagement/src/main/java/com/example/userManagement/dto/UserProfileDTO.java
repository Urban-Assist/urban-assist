package com.example.userManagement.dto;

import com.example.userManagement.model.Address;
import lombok.Data;

@Data
public class UserProfileDTO {
    private String email;
    private String firstName;
    private String lastName;
    private String phoneNumber;
    private String role;
    private String profilePicUrl;
    private Address address;
}