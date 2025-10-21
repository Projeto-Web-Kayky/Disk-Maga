package com.disk.api.dtos.authDto;

import jakarta.validation.constraints.NotBlank;

public record LoginRequest(
    @NotBlank
    String login,
    @NotBlank
    String password
) {}
