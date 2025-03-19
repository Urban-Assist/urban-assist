package com.example.userManagement.dto;

import lombok.Data;
import com.example.userManagement.dto.SlotDataDTO;

@Data
public class PaymentSuccessRequestDTO {
    private String userEmail;
    private String userName;
    private String providerEmail;
    private String providerName;
    private String providerPhoneNumber;
    private String service;
    private Double pricePaid;
    private String transactionId;
    private SlotDataDTO slotData;
}