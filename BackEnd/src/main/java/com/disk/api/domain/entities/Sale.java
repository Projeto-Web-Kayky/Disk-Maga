package com.disk.api.domain.entities;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.List;

import com.disk.api.domain.enums.Payment;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "sales")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Sale {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long saleId;

    private ZonedDateTime saleDate;
    private Payment payment;

    @ManyToOne
    @JoinColumn(name = "client_id")
    private Client client;
    
    private Double subtotal;

    @OneToMany(mappedBy = "sale", cascade = CascadeType.ALL)
    private List<SaleProduct> saleProducts = new ArrayList<>();

    public void addProduct(Product product, Integer quantity) {
        SaleProduct saleProduct = new SaleProduct(this, product, quantity);
        this.saleProducts.add(saleProduct);
    }

    public void calculateSubtotal() {
        if (saleProducts != null) {
            Double total = 0.0;
            for (SaleProduct saleProduct : saleProducts) {
                if (saleProduct.getProduct() != null) {
                    total += saleProduct.getProduct().getSalePrice() * saleProduct.getQuantity();
                }
            }

            BigDecimal formattedTotal = new BigDecimal(total).setScale(2, RoundingMode.HALF_UP);
            this.subtotal = formattedTotal.doubleValue();
        }
    }
}
