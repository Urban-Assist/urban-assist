package com.example.userManagement.dto;

import lombok.Data;
import java.util.List;

@Data
public class ProviderProfileDTO {
    private Long id;
    private String firstName;
    private String lastName;
    private String description;
    private String profilePic;
    private int stars;
    private String address;
    private String price;
    private List<String> workImages;
    private List<String> testimonials;
    private String phoneNumber;
    private String email;
    private String linkedin;
    private String service;
}