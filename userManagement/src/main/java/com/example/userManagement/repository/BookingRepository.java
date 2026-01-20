package com.example.userManagement.repository;

import com.example.userManagement.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {

    List<Booking> findByUserEmail(String userEmail);

    List<Booking> findByProviderEmail(String providerEmail);

    List<Booking> findByUserEmailOrderByBookingDateDesc(String userEmail);

    List<Booking> findByProviderEmailOrderByBookingDateDesc(String providerEmail);
}
