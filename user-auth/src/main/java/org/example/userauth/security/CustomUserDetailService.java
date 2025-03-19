package org.example.userauth.security;

import java.util.Collections;
import java.util.Optional;

import org.example.userauth.model.User;
import org.example.userauth.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;


@Service
public class CustomUserDetailService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Optional<User> userOptional = userRepository.findByEmail(email);
        
        // Check if the user exists
        if (!userOptional.isPresent()) {
            throw new UsernameNotFoundException("User not found with email: " + email);
        }
        
        User user = userOptional.get();
        if (user == null) {
            throw new UsernameNotFoundException("User not found");
        }      
        return new CustomUserDTO(
            user.getEmail(),
            user.getPassword(),
            user.getId(), // Include userId
            Collections.singletonList(new SimpleGrantedAuthority(user.getRole()))
    );
    }
}