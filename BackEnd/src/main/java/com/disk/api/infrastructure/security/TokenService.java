package com.disk.api.infrastructure.security;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.disk.api.domain.entities.User;

@Service
public class TokenService {
    @Value("${api.security.token.secret}")
    private String secret;

    public String generateToken(User user) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(secret);
            return JWT.create()
                .withIssuer("disk-maga-api")
                .withSubject(user.getLogin())
                .withExpiresAt(genExpirationDate())
                .sign(algorithm);
        } catch (JWTCreationException e) {
            throw new RuntimeException("Erro ao gerar token", e);
        }
    }

    public String validateToken(String token) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(secret);
            return JWT.require(algorithm)
                .withIssuer("disk-maga-api")
                .build()
                .verify(token)
                .getSubject();
        } catch (JWTVerificationException e) {
            return null;
        }
    }

    private Instant genExpirationDate() {
        return LocalDateTime.now().plusMinutes(10).toInstant(ZoneOffset.of("-03:00"));
    }
}
