package com.example.userManagement.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.time.ZonedDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AvailabilityDTO {
    private Long id;
    private ZonedDateTime  startTime;
    private ZonedDateTime  endTime;
    private String providerEmail;
    private String service;
}