package com.example.userManagement.service;

import lombok.RequiredArgsConstructor;
import com.example.userManagement.model.Booking;
import com.example.userManagement.repository.BookingRepository;

import org.springframework.stereotype.Service;
import com.example.userManagement.dto.SlotDataDTO;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;

@Service
@RequiredArgsConstructor
public class BookingService {

    private final BookingRepository bookingRepository;
    
    public Booking createBookingAfterPayment(String userEmail, String userName, 
                                            String providerEmail, String providerName,
                                            String providerPhoneNumber, String service,
                                            Double pricePaid, String transactionId,
                                            SlotDataDTO slotData) {

        String authenticatedEmail = SecurityContextHolder.getContext().getAuthentication().getName();
                                        
                                              
        
        Booking booking = Booking.builder()
                .userEmail(userEmail)
                .userName(userName)
                .providerEmail(slotData.getProviderEmail()) // Using email from slot data
                .providerName(providerName)
                .providerPhoneNumber(providerPhoneNumber)
                .service(slotData.getService()) // Using service from slot data
                .pricePaid(pricePaid)
                .transactionId(transactionId)
                .slotId(slotData.get_id())
                .date(LocalDate.parse(slotData.getDate()))
                .startTime(slotData.getStartTime())
                .endTime(slotData.getEndTime())
                .originalStartTime(ZonedDateTime.parse(slotData.getOriginalStartTime(), 
                                  DateTimeFormatter.ISO_DATE_TIME))
                .originalEndTime(ZonedDateTime.parse(slotData.getOriginalEndTime(), 
                                DateTimeFormatter.ISO_DATE_TIME))
                .build();
                
        return bookingRepository.save(booking);
    }

    public List<Booking> findBookingsByUserEmail(String userEmail) {
        return bookingRepository.findByUserEmailOrderByOriginalStartTimeDesc(userEmail);
    }

    public List<Booking> findBookingsByProviderEmail(String providerEmail) {
        return bookingRepository.findByProviderEmailOrderByOriginalStartTimeDesc(providerEmail);
    }
}