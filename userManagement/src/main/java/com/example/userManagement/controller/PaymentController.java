package com.example.userManagement.controller;

import lombok.RequiredArgsConstructor;
import com.example.userManagement.model.Booking;
import com.example.userManagement.service.BookingService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.example.userManagement.dto.PaymentSuccessRequestDTO;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;

@RestController
@RequestMapping("/api/booking")
@RequiredArgsConstructor
public class PaymentController {

    private final BookingService bookingService;
    
    @PostMapping("/success")
    public ResponseEntity<Booking> handlePaymentSuccess(@RequestBody PaymentSuccessRequestDTO request) {
        // Assuming payment is already verified
        
        Booking booking = bookingService.createBookingAfterPayment(
            request.getUserEmail(),
            request.getUserName(),
            request.getProviderEmail(),
            request.getProviderName(),
            request.getProviderPhoneNumber(),
            request.getService(),
            request.getPricePaid(),
            request.getTransactionId(),
            request.getSlotData()
        );
        
        return ResponseEntity.ok(booking);
    }

    @GetMapping
    public ResponseEntity<List<Booking>> getBookings(@RequestParam(required = false) String role) {
        // Get the currently authenticated user's email
        String userEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        
        // Retrieve bookings based on the role
        List<Booking> bookings;
        if ("provider".equalsIgnoreCase(role)) {
            bookings = bookingService.findBookingsByProviderEmail(userEmail);
        } else {
            // Default to customer bookings if no role or role is "customer"
            bookings = bookingService.findBookingsByUserEmail(userEmail);
        }
        
        return ResponseEntity.ok(bookings);
    }
}

