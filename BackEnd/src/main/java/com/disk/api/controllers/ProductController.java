package com.disk.api.controllers;

import org.springframework.web.bind.annotation.RestController;

import com.disk.api.dtos.productDto.ProductRequest;
import com.disk.api.services.ProductService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequestMapping(value = "/products")
@RequiredArgsConstructor
@Tag(name = "product")
public class ProductController {

    private final ProductService productService;

    @Operation(summary = "Cadastra um novo Produto.", method = "POST")
    @PostMapping("/register-product")
    public ResponseEntity<?> registerProduct(@RequestBody ProductRequest productRegister) {
        var response = this.productService.newProduct(productRegister);
        return ResponseEntity.status(response.getStatus()).body(response);
    }

    @Operation(summary = "Retorna uma lista de produtos.", method = "GET")
    @GetMapping()
    public ResponseEntity<?> getProducts() {
        var response = this.productService.getProduct();
        return ResponseEntity.status(response.getStatus()).body(response);
    }

    @Operation(summary = "Busca produtos por nome.", method = "GET")
    @GetMapping("/search")
    public ResponseEntity<?> searchProducts(@RequestParam String name) {
        var response = this.productService.searchProductByName(name);
        return ResponseEntity.status(response.getStatus()).body(response);
    }

    @Operation(summary = "Atualiza um produto.", method = "PUT")
    @PutMapping("/{id}")
    public ResponseEntity<?> updateProduct(@PathVariable Long id, @RequestBody @Valid ProductRequest updateProduct) {
        var response = this.productService.updateProduct(id, updateProduct);
        return ResponseEntity.status(response.getStatus()).body(response);
    }

    @Operation(summary = "Deleta um produto.", method = "DELETE")
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteProduct(@PathVariable Long id) {
        var response = this.productService.deleteProduct(id);
        return ResponseEntity.status(response.getStatus()).body(response);
    }
}
