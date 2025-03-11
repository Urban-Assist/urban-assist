package com.example.userManagement.dto;

import lombok.Data;

@Data
public class ProviderProfileDTO {
    private String picture;
    private String email;
    private String name;
    private String description;
    private String reviews;
    private int experience;
    private double charge;
    private boolean certification;
    private String certificationNumber;
}
