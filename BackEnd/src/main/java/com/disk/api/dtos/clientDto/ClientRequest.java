package com.disk.api.dtos.clientDto;

import jakarta.validation.constraints.NotBlank;

public record ClientRequest(
    @NotBlank
    String client_name,
    String client_nickname,
    @NotBlank
    String phone_number,
    Double client_debts
) {

}