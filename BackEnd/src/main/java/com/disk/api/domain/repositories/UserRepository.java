package com.disk.api.domain.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.disk.api.domain.entities.User;

public interface UserRepository extends JpaRepository<User, Long>{
    Optional<User> findByLogin(String login);
    boolean existsByLogin(String login);
}
