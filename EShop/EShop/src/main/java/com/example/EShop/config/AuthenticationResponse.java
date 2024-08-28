package com.example.EShop.config;

import lombok.Builder;
import lombok.Data;

@Data
@Builder

public class AuthenticationResponse {

  private String token;

  public String getToken() {
    return token;
  }

  public void setToken(String token) {
    this.token = token;
  }

  public AuthenticationResponse(String token) {
    this.token = token;
  }
}
