package com.example.userManagement.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.userManagement.model.Booking;


@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByUserEmailOrderByOriginalStartTimeDesc(String userEmail);
    List<Booking> findByProviderEmailOrderByOriginalStartTimeDesc(String providerEmail);
}