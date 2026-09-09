package com.photography.photography.controller;

import com.photography.photography.entity.Admin;
import com.photography.photography.service.AdminService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final AdminService adminService;

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @PostMapping("/register")
    public Admin registerAdmin(@Valid @RequestBody Admin admin) {
        return adminService.createAdmin(admin);
    }

    @PostMapping("/login")
    public String login(@RequestBody Map<String, String> loginData) {

        String username = loginData.get("username");
        String password = loginData.get("password");

        boolean success =
                adminService.login(username, password);

        if (success) {
            return "Login successful";
        }

        return "Invalid username or password";
    }
}