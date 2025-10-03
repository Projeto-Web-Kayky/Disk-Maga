package com.disk.api.domain.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.disk.api.domain.entities.Client;

@Repository
public interface ClientRepository extends JpaRepository<Client, Long>{

}
