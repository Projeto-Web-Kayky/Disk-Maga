package com.disk.api.services;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.disk.api.domain.entities.Product;
import com.disk.api.domain.repositories.ProductRepository;
import com.disk.api.dtos.productDto.ProductRequest;
import com.disk.api.dtos.productDto.ProductResponse;
import com.disk.api.dtos.responsesDto.ServiceResponse;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProductService {
    private final ProductRepository productRepo;

    public ServiceResponse<String> newProduct(ProductRequest productRequest) {
        var response = new ServiceResponse<String>();

        Product product = new Product();
        product.setProductName(productRequest.productName());
        product.setCategory(productRequest.category());
        product.setCostPrice(productRequest.costPrice());
        product.setSalePrice(productRequest.salePrice());
        product.setQuantity(productRequest.quantity());
        product.setUnityMeasure(productRequest.unityMeasure());

        productRepo.save(product);

        response.setMessage("Produto criado com sucesso.");
        response.setStatus(HttpStatus.CREATED);

        return response;
    }

    public ServiceResponse<List<ProductResponse>> getProduct() {
        var response = new ServiceResponse<List<ProductResponse>>();

        List<Product> products = productRepo.findByDeletedAtIsNull();

        List<ProductResponse> productResponses = products.stream()
                .map(p -> new ProductResponse(
                        p.getProductId(),
                        p.getProductName(),
                        p.getCategory(),
                        p.getCostPrice(),
                        p.getSalePrice(),
                        p.getUnityMeasure(),
                        p.getQuantity()))
                .collect(Collectors.toList());
            
        response.setData(productResponses);
        response.setMessage("Exibindo lista de produtos.");
        response.setStatus(HttpStatus.ACCEPTED);

        return response;
    }

    public ServiceResponse<String> updateProduct(Long productId, ProductRequest updateProduct) {
        var response = new ServiceResponse<String>();

        var productEntity = this.productRepo.findById(productId);

        if (productEntity.isPresent()) {
            var product = productEntity.get();
            
            int newStockQuantity = product.getQuantity() + updateProduct.quantity();

            product.setProductName(updateProduct.productName());
            product.setCategory(updateProduct.category());
            product.setCostPrice(updateProduct.costPrice());
            product.setSalePrice(updateProduct.salePrice());
            product.setQuantity(newStockQuantity);

            productRepo.save(product);
            response.setMessage("Produto atualizado com sucesso.");
            response.setStatus(HttpStatus.ACCEPTED);
        } else {
            response.setMessage("Produto não encontrado.");
            response.setStatus(HttpStatus.BAD_REQUEST);
        }

        return response;
    }

    public ServiceResponse<String> deleteProduct(Long productId) {
        var response = new ServiceResponse<String>();

        var productOpt = productRepo.findById(productId);

        if (productOpt.isPresent()) {
            Product product = productOpt.get();

            if (product.getDeletedAt() != null) {
                response.setMessage("O produto já foi deletado.");
                response.setStatus(HttpStatus.BAD_REQUEST);
                return response;
            }

            product.setDeletedAt(LocalDateTime.now());
            productRepo.save(product);

            response.setMessage("Produto deletado com sucesso.");
            response.setStatus(HttpStatus.ACCEPTED);
        } else {
            response.setMessage("Produto não encontrado.");
            response.setStatus(HttpStatus.NOT_FOUND);
        }

        return response;
    }

}
