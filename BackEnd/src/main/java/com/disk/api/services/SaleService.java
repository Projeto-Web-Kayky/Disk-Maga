package com.disk.api.services;

import java.time.ZonedDateTime;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.disk.api.domain.entities.Client;
import com.disk.api.domain.entities.Product;
import com.disk.api.domain.entities.Sale;
import com.disk.api.domain.repositories.ClientRepository;
import com.disk.api.domain.repositories.ProductRepository;
import com.disk.api.domain.repositories.SaleRepository;
import com.disk.api.dtos.responsesDto.ServiceResponse;
import com.disk.api.dtos.saleDto.SaleRequest;

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
}
