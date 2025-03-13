package com.example.userManagement.dto;

import lombok.Data;
import java.util.List;

@Data
public class AvailibilityRequestDTO {
    private Long id;
    private String service;
    private String email;
}