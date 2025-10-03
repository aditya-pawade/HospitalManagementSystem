package com.hms.controller;

import com.hms.entity.User;
import com.hms.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class LoginController {

	private final UserService userService;

	public LoginController(UserService userService) {
		this.userService = userService;
	}

	// Register new user
	@PostMapping("/register")
	public ResponseEntity<Map<String, Object>> register(@RequestBody User user) {
		try {
			// Check if username already exists
			if (userService.findByUsername(user.getUsername()).isPresent()) {
				Map<String, Object> response = new HashMap<>();
				response.put("success", false);
				response.put("message", "Username already exists");
				return ResponseEntity.badRequest().body(response);
			}

			// Save the user
			User savedUser = userService.saveUser(user);
			
			Map<String, Object> response = new HashMap<>();
			response.put("success", true);
			response.put("message", "User registered successfully");
			
			Map<String, Object> userInfo = new HashMap<>();
			userInfo.put("id", savedUser.getId());
			userInfo.put("username", savedUser.getUsername());
			userInfo.put("role", savedUser.getRole());
			response.put("user", userInfo);
			
			return ResponseEntity.ok(response);
		} catch (Exception e) {
			Map<String, Object> response = new HashMap<>();
			response.put("success", false);
			response.put("message", "Registration failed: " + e.getMessage());
			return ResponseEntity.badRequest().body(response);
		}
	}

	// Login user
	@PostMapping("/login")
	public ResponseEntity<Map<String, Object>> login(@RequestBody User loginUser) {
		return userService.findByUsername(loginUser.getUsername()).map(user -> {
			if (user.getPassword().equals(loginUser.getPassword())) {
				Map<String, Object> response = new HashMap<>();
				response.put("success", true);
				response.put("message", "Login successful");
				
				Map<String, Object> userInfo = new HashMap<>();
				userInfo.put("id", user.getId());
				userInfo.put("username", user.getUsername());
				userInfo.put("role", user.getRole());
				response.put("user", userInfo);
				
				return ResponseEntity.ok(response);
			} else {
				Map<String, Object> response = new HashMap<>();
				response.put("success", false);
				response.put("message", "Invalid password");
				return ResponseEntity.badRequest().body(response);
			}
		}).orElse(ResponseEntity.badRequest().body(new HashMap<String, Object>() {{
			put("success", false);
			put("message", "User not found");
		}}));
	}
}
