package org.example.userauth.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import org.bouncycastle.asn1.x509.SubjectPublicKeyInfo;
import org.bouncycastle.jce.provider.BouncyCastleProvider;
import org.bouncycastle.openssl.PEMKeyPair;
import org.bouncycastle.openssl.PEMParser;
import org.bouncycastle.openssl.jcajce.JcaPEMKeyConverter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.io.FileReader;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.security.KeyFactory;
import java.security.KeyPair;
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
    static {
    try {
        Security.addProvider(new BouncyCastleProvider());
        
        // Read private key (PKCS#1 format)
        PEMParser pemParser = new PEMParser(new FileReader("/Users/vaibhav_patel/Documents/urban-assist/user-auth/private.pem"));
        JcaPEMKeyConverter converter = new JcaPEMKeyConverter().setProvider("BC");
        Object object = pemParser.readObject();
        
        if (object instanceof PEMKeyPair) {
            KeyPair keyPair = converter.getKeyPair((PEMKeyPair) object);
            privateKey = keyPair.getPrivate();
        } else {
            throw new IllegalArgumentException("Unexpected private key format");
        }
        pemParser.close();
        
        // Read public key (X.509 format)
        //to do : change the hardcoded path to the env
        pemParser = new PEMParser(new FileReader("/Users/vaibhav_patel/Documents/urban-assist/user-auth/public.pem"));
        object = pemParser.readObject();
        
        if (object instanceof SubjectPublicKeyInfo) {
            publicKey = converter.getPublicKey((SubjectPublicKeyInfo) object);
        } else {
            throw new IllegalArgumentException("Unexpected public key format");
        }
        pemParser.close();
        
        System.out.println("Keys loaded successfully");
    } catch (Exception e) {
        e.printStackTrace();
        throw new RuntimeException("Failed to load keys", e);
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
                .setExpiration(new Date(System.currentTimeMillis() +5 * 60 * 1000)) // 10 hours
                .signWith(SignatureAlgorithm.RS256, privateKey)
                .compact();
    }

    public Boolean validateToken(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }
}