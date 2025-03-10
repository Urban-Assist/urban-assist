package org.example.userauth.security;

import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

public class CustomUserDTO implements UserDetails {

    private String username;
    private String password;
    private Long userId;
    private Collection<? extends GrantedAuthority> authorities;

    public CustomUserDTO(String username, String password, Long userId, Collection<? extends GrantedAuthority> authorities) {
        this.username = username; //doest not mean actual user name, it means email.
        this.password = password;
        this.userId = userId;
        this.authorities = authorities; // roles
    }

    public Long getUserId() {
        return userId;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}