package com.example.userManagement.dto;

import lombok.Data;

@Data
public class SlotDataDTO {
    private String _id;
    private String date;
    private String startTime;
    private String endTime;
    private String providerEmail;
    private String service;
    private String originalStartTime;
    private String originalEndTime;
}