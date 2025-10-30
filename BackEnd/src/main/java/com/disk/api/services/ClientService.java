package com.disk.api.services;

import java.io.File;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.disk.api.domain.entities.Client;
import com.disk.api.domain.repositories.ClientRepository;
import com.disk.api.dtos.clientDto.ClientResponse;
import com.disk.api.dtos.responsesDto.ServiceResponse;
import com.disk.api.utils.ImageUtils;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ClientService {
    private final ClientRepository clientRepo;
    private static final String UPLOAD_DIR = "./BackEnd/uploads/clientes/";

    public ServiceResponse<String> newClientWithPhoto(
            String name,
            String nickname,
            String phone,
            Double debts,
            MultipartFile photo
    ) {
        var response = new ServiceResponse<String>();

        try {
            // 1️⃣ Cria e salva o cliente no banco primeiro
            Client client = new Client();
            client.setClientName(name);
            client.setClientNickname(nickname);
            client.setPhoneNumber(phone);
            client.setClientDebts(debts);
            clientRepo.save(client);

            // 2️⃣ Cria diretório se não existir
            File dir = new File(UPLOAD_DIR);
            if (!dir.exists()) dir.mkdirs();

            // 3️⃣ Se enviou foto, salva comprimida e registra caminho
            if (photo != null && !photo.isEmpty()) {
                String fileName = "client_" + client.getClientId() + ".jpg";
                File targetFile = new File(UPLOAD_DIR + fileName);

                ImageUtils.saveCompressedImage(photo, targetFile);

                client.setFotoPath("uploads/clientes/" + fileName);
                clientRepo.save(client);
            }

            response.setMessage("Cliente cadastrado com sucesso!");
            response.setStatus(HttpStatus.CREATED);
        } catch (IOException e) {
            response.setMessage("Erro ao salvar a imagem: " + e.getMessage());
            response.setStatus(HttpStatus.INTERNAL_SERVER_ERROR);
        }

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
                        c.getClientDebts(),
                        c.getFotoPath()))
                .collect(Collectors.toList());

        response.setData(clientResponses);
        response.setStatus(HttpStatus.ACCEPTED);
        return response;
    }

    public ServiceResponse<String> deleteClient(Long id) {
        var response = new ServiceResponse<String>();
        var clientOpt = clientRepo.findById(id);

        if (clientOpt.isEmpty()) {
            response.setMessage("Cliente não encontrado.");
            response.setStatus(HttpStatus.BAD_REQUEST);
            return response;
        }

        var client = clientOpt.get();
        client.setDeletedAt(LocalDateTime.now());
        clientRepo.save(client);

        response.setMessage("Cliente deletado com sucesso!");
        response.setStatus(HttpStatus.ACCEPTED);
        return response;
    }
}
