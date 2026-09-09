package com.photography.photography.service;

import com.photography.photography.entity.Admin;
import com.photography.photography.repository.AdminRepository;
import org.springframework.stereotype.Service;

@Service
public class AdminService {

    private final AdminRepository adminRepository;

    public AdminService(AdminRepository adminRepository) {
        this.adminRepository = adminRepository;
    }

    public Admin createAdmin(Admin admin) {
        return adminRepository.save(admin);
    }

    public boolean login(String username, String password) {

        return adminRepository.findByUsername(username)
                .map(admin -> admin.getPassword().equals(password))
                .orElse(false);
    }
}