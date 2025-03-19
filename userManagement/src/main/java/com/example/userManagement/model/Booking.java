package com.example.userManagement.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;
import java.time.ZonedDateTime;

@Entity
@Table(name = "bookings")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Booking {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String userEmail;
    
    @Column(nullable = false)
    private String userName;
    
    @Column(nullable = false)
    private String providerEmail;
    
    @Column(nullable = false)
    private String providerName;
    
    @Column(nullable = false)
    private String providerPhoneNumber;
    
    @Column(nullable = false)
    private String service;
    
    @Column(nullable = false)
    private Double pricePaid;
    
    @Column(nullable = false)
    private String transactionId;
    
    // Slot information
    @Column(nullable = false)
    private String slotId;
    
    @Column(nullable = false)
    private LocalDate date;
    
    @Column(nullable = false)
    private String startTime;
    
    @Column(nullable = false)
    private String endTime;
    
    @Column(nullable = false)
    private ZonedDateTime originalStartTime;
    
    @Column(nullable = false)
    private ZonedDateTime originalEndTime;
}