package com.disk.api.domain.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.disk.api.domain.entities.Client;
import java.util.List;


@Repository
public interface ClientRepository extends JpaRepository<Client, Long>{
    List<Client> findByDeletedAtIsNull();
}
