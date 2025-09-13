package com.hms.controller;

import com.hms.entity.User;
import com.hms.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class LoginController {

	private final UserService userService;

	public LoginController(UserService userService) {
		this.userService = userService;
	}

	// Register new user
	@PostMapping("/register")
	public ResponseEntity<User> register(@RequestBody User user) {
		return ResponseEntity.ok(userService.saveUser(user));
	}

	// Login user
	@PostMapping("/login")
	public ResponseEntity<String> login(@RequestBody User loginUser) {
		return userService.findByUsername(loginUser.getUsername()).map(user -> {
			if (user.getPassword().equals(loginUser.getPassword())) {
				return ResponseEntity.ok("Login successful! Role: " + user.getRole());
			} else {
				return ResponseEntity.badRequest().body("Invalid password!");
			}
		}).orElse(ResponseEntity.badRequest().body("User not found!"));
	}
}
