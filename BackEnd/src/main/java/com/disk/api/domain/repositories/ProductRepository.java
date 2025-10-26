package com.disk.api.domain.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.disk.api.domain.entities.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByDeletedAtIsNull();
    List<Product> findByDeletedAtIsNullAndProductNameContainingIgnoreCase(String productName);
}

