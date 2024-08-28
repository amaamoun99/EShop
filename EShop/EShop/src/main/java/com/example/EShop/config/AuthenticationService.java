package com.example.EShop.config;


import com.example.EShop.model.User;
import com.example.EShop.user.Role;
import com.example.EShop.repository.UserRepository;
import org.springframework.dao.DataAccessException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service

public class AuthenticationService {
    public AuthenticationService(UserRepository repository, PasswordEncoder passwordEncoder, JwtService jwtService, AuthenticationManager authenticationManager) {
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
    }

    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    //returns a token string
    public AuthenticationResponse register(RegisterRequest request) {
        // Create a new User instance
        User user = new User();
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword())); // Encode the password
        user.setRole(request.getRole());

        // Save the new user to the database
        try {
            repository.save(user);
            // Additional logic if needed
        } catch (DataAccessException e) {
            // Handle database access errors
            System.err.println("Database access error: " + e.getMessage());
            throw new RuntimeException("Error saving user to the database", e);
        } catch (Exception e) {
            // Handle other potential exceptions
            System.err.println("An unexpected error occurred: " + e.getMessage());
            throw new RuntimeException("Unexpected error while saving user", e);
        }

        // Debugging information
        try {
            // Log user details to ensure it's correctly initialized
            System.out.println("Generating token for user: " + user);

            // Generate JWT token for the new user
            String jwtToken = jwtService.generateToken(user);

            // Build and return AuthenticationResponse with the token
            return new AuthenticationResponse(jwtToken);
        } catch (UnsupportedOperationException e) {
            System.err.println("UnsupportedOperationException during token generation: " + e.getMessage());
            throw new RuntimeException("Unsupported operation during JWT token generation", e);
        } catch (Exception e) {
            System.err.println("An unexpected error occurred during token generation: " + e.getMessage());
            throw new RuntimeException("Unexpected error while generating JWT token", e);
        }
    }


    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        var user = repository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found")); // Handle the exception more gracefully
        String jwtToken = jwtService.generateToken(user);

        // Build and return AuthenticationResponse with the token
        return new AuthenticationResponse(jwtToken);
    }
}



