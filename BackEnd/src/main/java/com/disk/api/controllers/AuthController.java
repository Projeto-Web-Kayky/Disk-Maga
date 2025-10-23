package com.disk.api.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import com.disk.api.dtos.authDto.LoginRequest;
import com.disk.api.dtos.responsesDto.ServiceResponse;
import com.disk.api.services.AuthService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/auth")
@Tag (name = "Auth")
public class AuthController {
    @Autowired
    private AuthService authService;

    @Operation(summary = "Autentica o Usuário.")
    @PostMapping("/login")
    public ResponseEntity<?> userLogin(@RequestBody @Valid LoginRequest loginRequest) {
        var response = this.authService.userLogin(loginRequest);
        return ResponseEntity.status(response.getStatus()).body(response);
    }

    @PostMapping("/logout")
    @Operation(summary = "Finaliza a sessão do usuário.", method = "POST")
    public ResponseEntity<ServiceResponse<String>> logout(HttpServletRequest request) {

        ServiceResponse<String> response = authService.logout(request);
        return ResponseEntity.status(response.getStatus()).body(response);
    }
    
}
