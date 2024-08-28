package com.example.EShop.Services;

import com.example.EShop.model.Product;
import com.example.EShop.model.User;
import com.example.EShop.repository.ProductRepository;
import com.example.EShop.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductRepository productRepository;

    public List<User> getUsers() {
        return userRepository.findAll();
    }

    public User saveUser(User user) {
        return userRepository.save(user);
    }

    public User addProductToUser(Long userId, Long productId) {
        Optional<User> userOptional = userRepository.findById(userId);
        Optional<Product> productOptional = productRepository.findById(productId);

        if (userOptional.isPresent() && productOptional.isPresent()) {
            User user = userOptional.get();
            Product product = productOptional.get();
            // Update the relationship
            user.addProduct(product);
            // Save only one side of the relationship, and let the cascade handle the rest
            userRepository.save(user);
            return user;
        }
        return null; // Or throw an exception
    }

    // New method to get a user by ID
    public User getUserById(Long userId) {
        Optional<User> userOptional = userRepository.findById(userId);
        return userOptional.orElse(null); // Return the user if found, otherwise return null
    }

    // New method to get all products of a user by their ID
    public Set<Product> getUserProducts(Long userId) {
        User user = getUserById(userId);
        if (user != null) {
            return user.getProducts(); // Assuming getProducts() returns a list of Product
        }
        return null; // Or throw an exception
    }

}
