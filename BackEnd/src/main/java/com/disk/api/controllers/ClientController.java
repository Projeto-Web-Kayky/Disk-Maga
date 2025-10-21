package com.disk.api.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.disk.api.dtos.clientDto.ClientRequest;
import com.disk.api.services.ClientService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;



@RestController
@RequestMapping(value = "/clients")
@Tag(name = "client")
@RequiredArgsConstructor
public final class ClientController {
    private final ClientService clientService;

    @Operation(summary = "Cadastra um novo cliente", method = "POST")
    @PostMapping("/register-client")
    public ResponseEntity<?> registerClient(@RequestBody ClientRequest clientRegister){
        var response = this.clientService.newClient(clientRegister);
        return ResponseEntity.status(response.getStatus()).body(response);
    }

    @Operation(summary = "Retorna uma lista de clientes", method = "GET")
    @GetMapping()
    public ResponseEntity<?> getClients() {
        var response = this.clientService.getClient();
        return ResponseEntity.status(response.getStatus()).body(response);

    }
    
    @Operation(summary = "Atualiza um cliente", method = "PUT")
    @PutMapping("/{id}")
    public ResponseEntity<?>updateClient (@PathVariable Long id, @RequestBody @Valid ClientRequest updateClient) {
        var response = this.clientService.updateClient(id, updateClient);
        return ResponseEntity.status(response.getStatus()).body(response);
    }

    @Operation(summary = "Deleta um cliente", method = "DELETE")
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteClient (@PathVariable Long id) {
        var response = this.clientService.deleteClient(id);
        return ResponseEntity.status(response.getStatus()).body(response);
    }
}
