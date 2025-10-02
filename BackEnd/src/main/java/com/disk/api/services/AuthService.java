package com.disk.api.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.disk.api.domain.entities.User;
import com.disk.api.domain.repositories.UserRepository;
import com.disk.api.dtos.authDto.LoginRequest;
import com.disk.api.dtos.responsesDto.ServiceResponse;
import com.disk.api.infrastructure.security.TokenService;

@Service
public class AuthService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Autowired
    private TokenService tokenService;

    public ServiceResponse<String> userLogin(LoginRequest request) {
        ServiceResponse<String> response = new ServiceResponse<String>();

        User user = this.userRepository.findByLogin(request.login()).orElse(null);

        if (user == null) {
            response.setStatus(HttpStatus.NOT_FOUND);
            response.setMessage("Usuário não encontrado.");
            return response;
        }

        if (!passwordEncoder.matches(request.password(), user.getPassword())) {
            response.setMessage("Senha Incorreta.");
            response.setStatus(HttpStatus.UNAUTHORIZED);
            return response;
        }

        String token = this.tokenService.generateToken(user);
        response.setData(token);
        response.setMessage("Login realizado com sucesso.");
        response.setStatus(HttpStatus.OK);
        return response;
    }

}
