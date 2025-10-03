package com.disk.api.services;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.disk.api.domain.entities.Client;
import com.disk.api.domain.repositories.ClientRepository;
import com.disk.api.dtos.clientDto.ClientRequest;
import com.disk.api.dtos.responsesDto.ServiceResponse;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ClientService {
    private final ClientRepository clientRepo;

    public ServiceResponse<String> newClient(ClientRequest ClientRegister) {
        var response = new ServiceResponse<String>();

        Client client = new Client();

        client.setClient_name(ClientRegister.client_name());
        client.setClient_nickname(ClientRegister.client_nickname());
        client.setPhone_number(ClientRegister.phone_number());

        this.clientRepo.save(client);
        response.setMessage("Cliente Cadastrado!");
        response.setStatus(HttpStatus.CREATED);

        return response;
    }
}
