package com.example.userManagement.model;

import java.util.List;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Table(name = "provider")
@NoArgsConstructor
@AllArgsConstructor
public class ProviderProfile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String description;
    private int experience;
    private double charge;
    private boolean certification;
    private String certificationNumber;
    private String email;

    @Lob
    private String picture; // Base64 or URL for image storage

    @ElementCollection
    private List<String> reviews;

    public ProviderProfile orElseThrow(Object object) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'orElseThrow'");
    }
}
