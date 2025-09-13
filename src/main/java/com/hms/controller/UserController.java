package com.hms.controller;

import com.hms.entity.User;
import com.hms.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

	@Autowired
	private UserService userService;

	// Register new user (anyone can register)
	@PostMapping("/register")
	public ResponseEntity<?> registerUser(@RequestBody User user) {
		User saved = userService.saveUser(user);
		return ResponseEntity.ok(saved);
	}

	// Login (manual check, no JWT for now)
	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody User user) {
		return userService.findByUsername(user.getUsername()).map(found -> {
			if (found.getPassword().equals(user.getPassword())) {
				return ResponseEntity.ok("Login successful! Role: " + found.getRole());
			} else {
				return ResponseEntity.status(401).body("Invalid password!");
			}
		}).orElse(ResponseEntity.status(404).body("User not found!"));
	}

	// Only ADMIN can view all users
	@GetMapping
	public ResponseEntity<?> getAllUsers(@RequestHeader("role") String role) {
		if (!"ADMIN".equalsIgnoreCase(role)) {
			return ResponseEntity.status(403).body("Only ADMIN can view all users!");
		}
		List<User> users = userService.getAllUsers();
		return ResponseEntity.ok(users);
	}
}
