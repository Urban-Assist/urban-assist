package org.example.userauth.repository;
import org.example.userauth.model.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface  EmailTokenRepository extends JpaRepository<EmailConfirmation, Long> {
    EmailConfirmation findByToken(String token);
}
