package com.example.userManagement.repository;

import com.example.userManagement.model.ProviderProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface ProviderProfileRepository extends JpaRepository<ProviderProfile, Long> {
    boolean existsByEmail(String email);

    Optional<ProviderProfile> findByName(String name);

    Optional<ProviderProfile> findByEmail(String email);
}

