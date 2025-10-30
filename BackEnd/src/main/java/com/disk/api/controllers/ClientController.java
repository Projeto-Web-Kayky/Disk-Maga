package com.disk.api.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.disk.api.dtos.clientDto.ClientRequest;
import com.disk.api.services.ClientService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/clients")
@Tag(name = "client")
@RequiredArgsConstructor
public class ClientController {
    private final ClientService clientService;

    @Operation(summary = "Cadastra um novo cliente com foto", method = "POST")
    @PostMapping(value = "/register-client", consumes = {"multipart/form-data"})
    public ResponseEntity<?> registerClient(
            @ModelAttribute ClientRequest clientRegister,
            @RequestPart(value = "photo", required = false) MultipartFile photo
    ) {
        var response = clientService.newClientWithPhoto(
                clientRegister.clientName(),
                clientRegister.clientNickname(),
                clientRegister.phoneNumber(),
                clientRegister.clientDebts(),
                photo
        );
        return ResponseEntity.status(response.getStatus()).body(response);
    }

    @Operation(summary = "Retorna todos os clientes", method = "GET")
    @GetMapping
    public ResponseEntity<?> getClients() {
        var response = clientService.getClient();
        return ResponseEntity.status(response.getStatus()).body(response);
    }
}
