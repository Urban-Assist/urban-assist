package com.example.userManagement.dto;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import jakarta.validation.constraints.NotBlank;


@Data
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class ProviderProfileDTO {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String id;

    @NotBlank(message = "Provider ID is mandatory")
    private int providerID;

    private String picture;

    @NotBlank(message = "Email is mandatory")
    private String email;

    private String name;
    private String description;
    private String certificationNumber;

     
    private int experience;
    private double charge;
    private boolean certified;

}
