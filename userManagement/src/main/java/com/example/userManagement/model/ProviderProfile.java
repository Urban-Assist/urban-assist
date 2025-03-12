package com.example.userManagement.model;

import jakarta.persistence.*;
import lombok.Data;
import java.util.List;

@Data
@Entity
@Table(name = "provider_profile")
public class ProviderProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String firstName;

    @Column(nullable = false)
    private String lastName;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column
    private String profilePic;

    @Column
    private int stars = 0;

    @Column
    private String address;

    @Column
    private String price;

    @ElementCollection
    private List<String> workImages;

    @ElementCollection
    private List<String> testimonials;

    @Column
    private String phoneNumber;

    @Column(unique = true, nullable = false)
    private String email;

    @Column
    private String linkedin;
  
    private String certificationNumber;
    private int experience;
    private boolean certified;
  
}