package org.example.userauth.config;

import org.springframework.security.config.Customizer;
import java.util.Arrays;
import java.util.List;

import org.example.userauth.security.CustomUserDetailService;
import org.example.userauth.security.JwtRequestFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;



@Configuration
@EnableWebSecurity
public class ServiceConfig {

        
    @Autowired
    private CustomUserDetailService userDetailsService;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Autowired
        private JwtRequestFilter JwtRequestFilter;
    @Autowired
    private CorsConfigurationSource corsConfigurationSource;
 
    @Bean
    public AuthenticationManager authenticationManager(HttpSecurity http) throws Exception {
        AuthenticationManagerBuilder authenticationManagerBuilder =
                http.getSharedObject(AuthenticationManagerBuilder.class);
        authenticationManagerBuilder
                .userDetailsService(userDetailsService)
                .passwordEncoder(passwordEncoder());
        return authenticationManagerBuilder.build();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http 
        
                 .cors().configurationSource(corsConfigurationSource)
                 .and()
                .csrf(csrf -> csrf.disable()) // Disable CSRF using the new lambda DSL
                .formLogin(formlogin -> formlogin.disable())
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/auth/**","auth/public-key").permitAll() // Allow public access to these endpoints
                        .anyRequest().authenticated()
                )
                  .addFilterBefore(JwtRequestFilter, UsernamePasswordAuthenticationFilter.class)
                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS) // Use stateless sessions
                ).exceptionHandling(exception -> exception
                        .authenticationEntryPoint(new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED)) // Return 401 for authentication failures
                );;

        return http.build();
    }


    
}