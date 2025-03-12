package com.example.userManagement.repository;

import com.example.userManagement.model.ProviderProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface ProviderProfileRepository extends JpaRepository<ProviderProfile, Long> {
    boolean existsByEmail(String email);

    Optional<ProviderProfile> findByEmail(String email);

    Optional<ProviderProfile> findByEmailAndService(String email, String service);
}

