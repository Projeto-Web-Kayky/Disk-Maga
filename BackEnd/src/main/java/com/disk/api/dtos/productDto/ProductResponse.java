package com.disk.api.dtos.productDto;

import java.util.Locale.Category;

import com.disk.api.domain.enums.UnityMeasure;

public record ProductResponse(
    Long productId,
    String productName,
    Category category,
    Double costPrice,
    Double salePrice,
    UnityMeasure unityMeasure,
    Integer quantity
) {}
