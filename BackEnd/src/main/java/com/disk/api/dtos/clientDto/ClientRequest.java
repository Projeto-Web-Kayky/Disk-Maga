package com.disk.api.dtos.clientDto;

import jakarta.validation.constraints.NotBlank;

public record ClientRequest(
    @NotBlank
    String clientName,
    String clientNickname,
    @NotBlank
    String phoneNumber,
    Double clientDebts
) {}