package com.disk.api.dtos.clientDto;

public record ClientResponse(
    Long clientId,
    String clientName,
    String clientNickname,
    String phoneNumber,
    Double clientDebts
) {

    public ClientResponse(Long clientId2, String clientName2, String clientNickname2, String phoneNumber2,
            Double clientDebts2, Object object) {
        this(clientId2, clientName2, clientNickname2, phoneNumber2, clientDebts2);
    }}
