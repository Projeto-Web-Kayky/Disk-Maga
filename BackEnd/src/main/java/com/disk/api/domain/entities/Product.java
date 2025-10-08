package com.disk.api.domain.entities;

import java.time.LocalDateTime;
import java.util.List;
import com.disk.api.domain.enums.Category;

import com.disk.api.domain.enums.UnityMeasure;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "products")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long productId;

    @NotBlank
    private String productName;

    private Category category;

    @NotBlank
    private Double salePrice;

    @NotBlank
    private Double costPrice;

    private Integer quantity;

    private UnityMeasure unityMeasure;

    private LocalDateTime deletedAt;

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL)
    private List<SaleProduct> saleProducts;
}
