package com.disk.api.domain.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.disk.api.domain.entities.Sale;

@Repository
public interface SaleRepository extends JpaRepository<Sale, Long> {

}
