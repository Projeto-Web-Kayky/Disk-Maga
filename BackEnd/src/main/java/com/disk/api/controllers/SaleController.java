package com.disk.api.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.disk.api.dtos.saleDto.SaleRequest;
import com.disk.api.services.SaleService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/sales")
@Tag(name = "Sales")
@RequiredArgsConstructor
public class SaleController {

    private final SaleService saleService;

    @Operation(summary = "Registra uma nova venda", method = "POST")
    @PostMapping("/new-sale")
    public ResponseEntity<?> createSale(@RequestBody SaleRequest saleRegister) {
        var response = this.saleService.createSale(saleRegister);
        return ResponseEntity.status(response.getStatus()).body(response);
    }

    @Operation(summary = "Retorna todas as vendas", method = "GET")
    @GetMapping()
    public ResponseEntity<?> getAllSales() {
        var response = this.saleService.getAllSales();
        return ResponseEntity.status(response.getStatus()).body(response);
    }
    
}
