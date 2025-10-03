package com.disk.api.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.disk.api.dtos.clientDto.ClientRequest;
import com.disk.api.services.ClientService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.parameters.RequestBody;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping(value = "/client")
@Tag(name = "client")
@RequiredArgsConstructor
public final class ClientController {
    private final ClientService clientService;
    @Operation(summary = "Cadastra um novo cliente", method = "POST")

    @PostMapping("/register-client")

    public ResponseEntity<?> registerClient(@RequestBody ClientRequest clientRequest){
        var response = this.clientService.newClient(clientRequest);
        return ResponseEntity.status(response.getStatus()).body(response);
    }
}
