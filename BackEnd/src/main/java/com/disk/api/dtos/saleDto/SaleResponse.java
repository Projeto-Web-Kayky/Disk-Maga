package com.disk.api.dtos.saleDto;

import java.time.ZonedDateTime;
import java.util.List;

import com.disk.api.domain.enums.Payment;
import com.disk.api.dtos.productDto.ProductResponse;

public record SaleResponse(
    ZonedDateTime saleDate,
    List<ProductResponse> products,
    List<Integer> quantities,
    Payment payment,
    String clientName,
    Double subtotal
) {}
