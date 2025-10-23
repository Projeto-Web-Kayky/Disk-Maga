package com.disk.api.services;

import java.time.ZonedDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.disk.api.domain.entities.Client;
import com.disk.api.domain.entities.Product;
import com.disk.api.domain.entities.Sale;
import com.disk.api.domain.entities.SaleProduct;
import com.disk.api.domain.repositories.ClientRepository;
import com.disk.api.domain.repositories.ProductRepository;
import com.disk.api.domain.repositories.SaleRepository;
import com.disk.api.dtos.productDto.ProductResponse;
import com.disk.api.dtos.responsesDto.ServiceResponse;
import com.disk.api.dtos.saleDto.SaleRequest;
import com.disk.api.dtos.saleDto.SaleResponse;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SaleService {

    private final SaleRepository saleRepo;
    private final ProductRepository productRepo;
    private final ClientRepository clientRepo;

    public ServiceResponse<String> createSale(SaleRequest saleRequest) {

        var response = new ServiceResponse<String>();

        List<Product> products = productRepo.findAllById(saleRequest.productIds());

        if (products.isEmpty()) {
            response.setStatus(HttpStatus.BAD_REQUEST);
            response.setMessage("Não existem produtos cadastrados.");
            return response;
        } else {
            for (int i = 0; i < products.size(); i++) {
                Product product = products.get(i);
                Integer quantity = saleRequest.quantities().get(i);

                if (product.getQuantity() < quantity) {
                    response.setStatus(HttpStatus.BAD_REQUEST);
                    response.setMessage("Estoque insuficiente.");
                    return response;
                }
            }
        }

        Sale sale = new Sale();
        sale.setSaleDate(ZonedDateTime.now());
        sale.setPayment(saleRequest.payment());

        if (saleRequest.clientId() != null) {
            Client client = clientRepo.findById(saleRequest.clientId())
                    .orElseThrow(() -> new RuntimeException("Cliente não encontrado"));
            sale.setClient(client);
        } else {
            sale.setClient(null);
        }

        if (!products.isEmpty()) {
            for (int i = 0; i < products.size(); i++) {
                Product product = products.get(i);

                Integer quantity = saleRequest.quantities().get(i);
                sale.addProduct(product, quantity);

                product.setQuantity(product.getQuantity() - quantity);
                productRepo.save(product);
            }
        }

        sale.calculateSubtotal();
        saleRepo.save(sale);

        response.setStatus(HttpStatus.OK);
        response.setMessage("Venda registrada com sucesso!");
        return response;
    }

    public ServiceResponse<List<SaleResponse>> getAllSales() {

        List<Sale> sales = saleRepo.findAll();

        var response = new ServiceResponse<List<SaleResponse>>();

        List<SaleResponse> saleResponses = sales.stream()
                .map(sale -> {

                    List<ProductResponse> productResponses = sale.getSaleProducts().stream()
                            .filter(saleProduct -> saleProduct.getProduct() != null)
                            .map(saleProduct -> new ProductResponse(
                                    saleProduct.getProduct().getProductId(),
                                    saleProduct.getProduct().getProductName(),
                                    saleProduct.getProduct().getCategory(),
                                    saleProduct.getProduct().getCostPrice(),
                                    saleProduct.getProduct().getSalePrice(),
                                    saleProduct.getProduct().getUnityMeasure(),
                                    saleProduct.getProduct().getQuantity()))
                            .collect(Collectors.toList());

                    List<Integer> quantities = sale.getSaleProducts().stream()
                            .map(SaleProduct::getQuantity)
                            .collect(Collectors.toList());

                    return new SaleResponse(
                        sale.getSaleDate(),
                        productResponses,
                        quantities,
                        sale.getPayment(),
                        sale.getClient() != null ? sale.getClient().getClientName() : null,
                        sale.getSubtotal()
                    );
                })
                    .sorted((sA, sB) -> sB.saleDate().compareTo(sA.saleDate()))
                    .collect(Collectors.toList());
                    
                    response.setData(saleResponses);
                    response.setStatus(HttpStatus.OK);
                    return response;
    }
}