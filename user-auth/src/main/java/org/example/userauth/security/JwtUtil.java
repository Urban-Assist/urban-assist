package org.example.userauth.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import org.bouncycastle.jce.provider.BouncyCastleProvider;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.security.KeyFactory;
import java.security.PrivateKey;
import java.security.PublicKey;
import java.security.Security;
import java.security.spec.PKCS8EncodedKeySpec;
import java.security.spec.X509EncodedKeySpec;
import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

@Component
public class JwtUtil {

    private static PrivateKey privateKey;
    private static PublicKey publicKey;
    
    public JwtUtil(@Value("${PRIVATE_KEY:}") String privateKeyPem, 
                  @Value("${PUBLIC_KEY:}") String publicKeyPem) {
        try {
            Security.addProvider(new BouncyCastleProvider());
            
            // Process private key from environment variable
            String privateKeyContent = privateKeyPem
                    .replace("-----BEGIN RSA PRIVATE KEY-----", "")
                    .replace("-----END RSA PRIVATE KEY-----", "")
                    .replaceAll("\\s", "");
            
            // Process public key from environment variable
            String publicKeyContent = publicKeyPem
                    .replace("-----BEGIN PUBLIC KEY-----", "")
                    .replace("-----END PUBLIC KEY-----", "")
                    .replaceAll("\\s", "");
            
            KeyFactory keyFactory = KeyFactory.getInstance("RSA", "BC");
            
            // Generate private key
            PKCS8EncodedKeySpec privateKeySpec = new PKCS8EncodedKeySpec(
                    Base64.getDecoder().decode(privateKeyContent));
            privateKey = keyFactory.generatePrivate(privateKeySpec);
            
            // Generate public key
            X509EncodedKeySpec publicKeySpec = new X509EncodedKeySpec(
                    Base64.getDecoder().decode(publicKeyContent));
            publicKey = keyFactory.generatePublic(publicKeySpec);
            
            System.out.println("Keys loaded successfully from environment variables");
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Failed to load keys from environment variables", e);
        }
    }
    
    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parser().setSigningKey(publicKey).parseClaimsJws(token).getBody();
    }

    private Boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

     public String generateToken(UserDetails userDetails) {
        Map<String, Object> claims = new HashMap<>();
        
        // Add roles to claims
        claims.put("roles", userDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList()));
        
        // Add userId to claims (if using CustomUserDetails)
        if (userDetails instanceof CustomUserDTO) {
            claims.put("id", ((CustomUserDTO) userDetails).getUserId());
        }

        return createToken(claims, userDetails.getUsername());
    }

    private String createToken(Map<String, Object> claims, String subject) {
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(subject)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 5 * 60 * 1000)) // 5 minutes
                .signWith(SignatureAlgorithm.RS256, privateKey)
                .compact();
    }

    public Boolean validateToken(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }
}