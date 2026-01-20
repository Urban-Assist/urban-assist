package com.example.userManagement.service;

import com.example.userManagement.model.Booking;
import com.example.userManagement.repository.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    public Booking createBooking(Booking booking) {
        return bookingRepository.save(booking);
    }

    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    public Optional<Booking> getBookingById(Long id) {
        return bookingRepository.findById(id);
    }

    public List<Booking> getBookingsByUserEmail(String userEmail) {
        return bookingRepository.findByUserEmailOrderByBookingDateDesc(userEmail);
    }

    public List<Booking> getBookingsByProviderEmail(String providerEmail) {
        return bookingRepository.findByProviderEmailOrderByBookingDateDesc(providerEmail);
    }

    public Optional<Booking> updateBookingStatus(Long id, String status) {
        Optional<Booking> bookingOpt = bookingRepository.findById(id);
        if (bookingOpt.isPresent()) {
            Booking booking = bookingOpt.get();
            booking.setStatus(status);
            bookingRepository.save(booking);
            return Optional.of(booking);
        }
        return Optional.empty();
    }

    public Optional<Booking> updateBooking(Long id, Booking updatedBooking) {
        Optional<Booking> bookingOpt = bookingRepository.findById(id);
        if (bookingOpt.isPresent()) {
            Booking booking = bookingOpt.get();

            if (updatedBooking.getBookingDate() != null) {
                booking.setBookingDate(updatedBooking.getBookingDate());
            }
            if (updatedBooking.getStartTime() != null) {
                booking.setStartTime(updatedBooking.getStartTime());
            }
            if (updatedBooking.getEndTime() != null) {
                booking.setEndTime(updatedBooking.getEndTime());
            }
            if (updatedBooking.getStatus() != null) {
                booking.setStatus(updatedBooking.getStatus());
            }
            if (updatedBooking.getNotes() != null) {
                booking.setNotes(updatedBooking.getNotes());
            }

            bookingRepository.save(booking);
            return Optional.of(booking);
        }
        return Optional.empty();
    }

    public boolean deleteBooking(Long id) {
        if (bookingRepository.existsById(id)) {
            bookingRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
