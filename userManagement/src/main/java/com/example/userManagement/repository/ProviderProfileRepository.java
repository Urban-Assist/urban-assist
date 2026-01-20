package com.example.userManagement.repository;

import com.example.userManagement.model.ProviderProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProviderProfileRepository extends JpaRepository<ProviderProfile, Long> {
    List<ProviderProfile> findByService(String service);

    Optional<ProviderProfile> findByFirstNameAndLastName(String firstName, String lastName);

    Optional<ProviderProfile> findByEmail(String email);
}
