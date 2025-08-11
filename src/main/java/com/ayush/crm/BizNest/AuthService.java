package com.ayush.crm.BizNest;

import org.springframework.stereotype.Service;
import java.util.HashMap;
import java.util.Map;

@Service
public class AuthService {
    private final Map<String, String> tokenStore = new HashMap<>();

    public void storeToken(String email, String token) {
        tokenStore.put(token, email);
    }

    public boolean isValidToken(String token) {
        return tokenStore.containsKey(token);
    }

    public String getEmailFromToken(String token) {
        return tokenStore.get(token);
    }
}
