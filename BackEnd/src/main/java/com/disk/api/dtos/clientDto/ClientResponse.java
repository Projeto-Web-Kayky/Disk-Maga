package com.disk.api.dtos.clientDto;

public record ClientResponse(
    Long clientId,
    String clientName,
    String clientNickname,
    String phoneNumber,
    Double clientDebts
) {}
