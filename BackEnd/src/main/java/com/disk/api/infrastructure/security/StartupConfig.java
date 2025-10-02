package com.disk.api.infrastructure.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.disk.api.domain.entities.User;
import com.disk.api.domain.repositories.UserRepository;

@Component
public class StartupConfig implements CommandLineRunner {
    @Value("${app.admin.login}")
    private String adminLogin;

    @Value("${app.admin.password}")
    private String adminPassword;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        if (!userRepository.existsByLogin(adminLogin)) {
            var user = new User();
            user.setLogin(adminLogin);
            user.setPassword(passwordEncoder.encode(adminPassword));
            userRepository.save(user);
        }
    }

}
