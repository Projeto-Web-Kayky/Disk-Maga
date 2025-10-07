package com.disk.api.dtos.productDto;

import java.util.Locale.Category;

import com.disk.api.domain.enums.UnityMeasure;

public record ProductRequest(
    String productName,
    Category category,
    Double costPrice,
    Double salePrice,
    Integer quantity,
    UnityMeasure unityMeasure
) {}
