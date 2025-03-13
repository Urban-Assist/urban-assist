package com.example.userManagement.repository;

import com.example.userManagement.model.Availability;
import com.example.userManagement.model.ProviderProfile;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AvailabilityRepository extends JpaRepository<Availability, Long> {
    List<Availability> findByProviderAndService(ProviderProfile provider, String service);
}
