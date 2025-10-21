package com.disk.api.dtos.saleDto;

import java.util.List;

import com.disk.api.domain.enums.Payment;

public record SaleRequest(
    List<Long> productIds,
    List<Integer> quantities,
    Long clientId,
    Payment payment
) {}
