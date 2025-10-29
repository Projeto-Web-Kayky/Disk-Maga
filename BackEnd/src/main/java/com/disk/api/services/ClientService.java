package com.disk.api.services;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.disk.api.domain.entities.Client;
import com.disk.api.domain.repositories.ClientRepository;
import com.disk.api.dtos.clientDto.ClientRequest;
import com.disk.api.dtos.clientDto.ClientResponse;
import com.disk.api.dtos.responsesDto.ServiceResponse;

import java.io.File;
import java.io.IOException;
import org.springframework.web.multipart.MultipartFile;
import com.disk.api.utils.ImageUtils;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ClientService {
    private final ClientRepository clientRepo;
    private static final String UPLOAD_DIR = "uploads/clientes/";

    public ServiceResponse<String> newClient(ClientRequest ClientRegister) {
        var response = new ServiceResponse<String>();

        Client client = new Client();

        client.setClientName(ClientRegister.clientName());
        client.setClientNickname(ClientRegister.clientNickname());
        client.setPhoneNumber(ClientRegister.phoneNumber());
        client.setClientDebts(ClientRegister.clientDebts());

        this.clientRepo.save(client);
        response.setMessage("Cliente Cadastrado!");
        response.setStatus(HttpStatus.CREATED);

        return response;
    }

    public ServiceResponse<List<ClientResponse>> getClient() {
        var response = new ServiceResponse<List<ClientResponse>>();

        List<Client> clients = clientRepo.findByDeletedAtIsNull();

        List<ClientResponse> clientResponses = clients.stream()
                .map(c -> new ClientResponse(
                        c.getClientId(),
                        c.getClientName(),
                        c.getClientNickname(),
                        c.getPhoneNumber(),
                        c.getClientDebts()))  

                .collect(Collectors.toList());  
        
        response.setData(clientResponses);
        response.setStatus(HttpStatus.ACCEPTED);
        return response;
    }

    public ServiceResponse<String> updateClient(Long id, ClientRequest updateClient) {
        var response = new ServiceResponse<String>();

        Long clientId;
        try {
            clientId = id;
        } catch (IllegalArgumentException e) {
            response.setMessage("ID inválido");
            response.setStatus(HttpStatus.BAD_REQUEST);
            return response;
        }

        var clientEntity = this.clientRepo.findById(clientId);
        if (clientEntity.isPresent()) {
            var client = clientEntity.get();

            client.setClientName(updateClient.clientName());
            client.setClientNickname(updateClient.clientNickname());
            client.setPhoneNumber(updateClient.phoneNumber());
            client.setClientDebts(updateClient.clientDebts());

            clientRepo.save(client);
            response.setMessage("Cliente atualizado com sucesso!");
            response.setStatus(HttpStatus.ACCEPTED);
            
        } else {
            response.setMessage("Cliente não encontrado");
            response.setStatus(HttpStatus.BAD_REQUEST);
        }
        return response;
    }

    public ServiceResponse<String> deleteClient(Long id) {
        var response = new ServiceResponse<String>();

        var clientEntity = this.clientRepo.findById(id);
        
        if(clientEntity.isPresent()) {
            Client client = clientEntity.get();

            if(client.getDeletedAt() != null) {
                response.setMessage("O cliente já foi deletado.");
                response.setStatus(HttpStatus.BAD_REQUEST);
                return response;
            }

            client.setDeletedAt(LocalDateTime.now());
            clientRepo.save(client);

            response.setMessage("Cliente deletado com sucesso!");
            response.setStatus(HttpStatus.ACCEPTED);
        } else {
            response.setMessage("Cliente não encontrado.");
            response.setStatus(HttpStatus.BAD_REQUEST);
        }

        return response;
    }

    public ServiceResponse<String> uploadClientPhoto(Long clientId, MultipartFile file) {
        var response = new ServiceResponse<String>();

        var clientOpt = clientRepo.findById(clientId);
        if (clientOpt.isEmpty()) {
            response.setMessage("Cliente não encontrado");
            response.setStatus(HttpStatus.BAD_REQUEST);
            return response;
        }

        try {
            File uploadDir = new File(UPLOAD_DIR);
            if (!uploadDir.exists()) uploadDir.mkdirs();

            String fileName = "client_" + clientId + ".jpg";
            File tempFile = new File(uploadDir, "temp_" + fileName);
            file.transferTo(tempFile);

            File finalFile = new File(uploadDir, fileName);
            ImageUtils.saveCompressedImage(tempFile, finalFile);

            tempFile.delete();

            var client = clientOpt.get();
            client.setFotoPath(UPLOAD_DIR + fileName);
            clientRepo.save(client);

            response.setMessage("Foto salva com sucesso!");
            response.setStatus(HttpStatus.OK);
        } catch (IOException e) {
            response.setMessage("Erro ao processar imagem: " + e.getMessage());
            response.setStatus(HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return response;
    }
}
