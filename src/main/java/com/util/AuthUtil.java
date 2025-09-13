package com.util;

public class AuthUtil {

	// Check if role is allowed
	public static boolean hasRole(String requiredRole, String currentRole) {
		if (currentRole == null) {
			return false; // no role provided
		}
		return requiredRole.equalsIgnoreCase(currentRole);
	}

	// Optional: check multiple roles
	public static boolean hasAnyRole(String[] allowedRoles, String currentRole) {
		if (currentRole == null) {
			return false;
		}
		for (String role : allowedRoles) {
			if (role.equalsIgnoreCase(currentRole)) {
				return true;
			}
		}
		return false;
	}
}
