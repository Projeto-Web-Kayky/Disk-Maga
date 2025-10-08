package com.disk.api.dtos.saleDto;

import com.disk.api.domain.enums.Payment;

public record SaleResponse(
    Long saleId,
    String saleDate,
    Payment payment,
    String clientName,
    Double subtotal
) {}
