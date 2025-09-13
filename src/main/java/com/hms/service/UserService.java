package com.hms.service;

import com.hms.entity.User;

import java.util.List;
import java.util.Optional;

public interface UserService {
	User saveUser(User user);

	Optional<User> findByUsername(String username);

	List<User> getAllUsers();
}