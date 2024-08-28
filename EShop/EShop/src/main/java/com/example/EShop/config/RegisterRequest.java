package com.example.EShop.config;


import com.example.EShop.user.Role;
import lombok.Builder;
import lombok.Data;

@Data
@Builder

public class RegisterRequest {

    /*private String firstName;
    private String lastName;
    private String email;
    private String password;
    private Role role;
*/



    private String firstName;

    private String lastName;

    private String email;

    private String password;


    private Role role;

    public String getFirstName() {
        return firstName;
    }

    public RegisterRequest(String firstName, String lastName, String email, String password, com.example.EShop.user.Role role) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.role = role;
    }

    public RegisterRequest() {
    }

    public void setRole(com.example.EShop.user.Role role) {
        this.role = role;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Role getRole() {
        return role;
    }
}