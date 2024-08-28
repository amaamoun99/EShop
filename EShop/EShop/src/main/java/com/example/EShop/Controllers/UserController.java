package com.example.EShop.Controllers;


import com.example.EShop.Services.UserService;
import com.example.EShop.model.Product;
import com.example.EShop.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api/v1/users")
public class UserController {
    @Autowired
    private UserService userService;


    @GetMapping
    public List<User> getAllUsers(){
        return userService.getUsers();
    }

    @PostMapping
    public ResponseEntity<User> saveUser(@RequestBody User user) {
        User createdProduct = userService.saveUser(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdProduct);
    }

    @PostMapping("/{userId}/products/{productId}")
    public User addProductToUser(@PathVariable Long userId, @PathVariable Long productId) {
        return userService.addProductToUser(userId, productId);
    }

    // Endpoint to get user by ID
    @GetMapping("/{id}")
    public User getUserById(@PathVariable Long id) {
        return userService.getUserById(id);
    }

    // Endpoint to get all products of a user by their ID
    @GetMapping("/{id}/basket")
    public Set<Product> getUserProducts(@PathVariable Long id) {
        Set<Product> products = userService.getUserProducts(id);
        if (products == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found or no products available");
        }
        return products;
    }
}
