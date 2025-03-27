package com.example.userManagement.repository;

import com.example.userManagement.model.ProviderProfile;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ProviderProfileRepository extends JpaRepository<ProviderProfile, Long> {
    boolean existsByEmail(String email);

    Optional<ProviderProfile> findByEmail(String email);

    Optional<ProviderProfile> findByEmailAndService(String email, String service);

    List<ProviderProfile> findByService(String service);

    Optional<ProviderProfile> findByIdAndService(Long id, String service);

    List<ProviderProfile> findByCertifiedFalseOrCertifiedIsNull();

    List<ProviderProfile> findByCertifiedTrue();

    List<ProviderProfile> findByCertified(boolean certified);
}

