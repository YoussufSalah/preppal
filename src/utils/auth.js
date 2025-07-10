// auth.js - Backend API Authentication
import { apiService } from "./APIService.js";
import { supabase } from "./supabaseClient.js";

// Since we know the API has custom auth endpoints, we'll use them directly
async function checkAuthMethod() {
    return false; // Always use custom API authentication
}

// Sign Up with Email/Password
export async function signUp(email, password, username) {
    try {
        const useSupabase = await checkAuthMethod();

        if (useSupabase && supabase) {
            // Use Supabase authentication
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        username: username,
                    },
                },
            });

            if (error) throw error;

            return { success: true, data };
        } else {
            // Use custom API authentication
            const response = await apiService.register(
                email,
                password,
                username
            );

            if (response.status === "success") {
                return { success: true, data: response.data };
            } else {
                throw new Error(response.message || "Registration failed");
            }
        }
    } catch (error) {
        console.error("Sign up error:", error);
        throw error;
    }
}

// Sign In with Email/Password
export async function signIn(email, password) {
    try {
        const useSupabase = await checkAuthMethod();

        if (useSupabase && supabase) {
            // Use Supabase authentication
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) throw error;

            // Store the access token
            apiService.setToken(data.session.access_token);
            return { success: true, data };
        } else {
            // Use custom API authentication
            const response = await apiService.login(email, password);

            if (response.status === "success") {
                // Store the access token from the session
                if (response.session && response.session.access_token) {
                    apiService.setToken(response.session.access_token);
                }
                return { success: true, data: response };
            } else {
                throw new Error(response.message || "Login failed");
            }
        }
    } catch (error) {
        console.error("Sign in error:", error);
        throw error;
    }
}

// Sign Out
export async function signOut() {
    try {
        const useSupabase = await checkAuthMethod();

        if (useSupabase && supabase) {
            // Use Supabase sign out
            const { error } = await supabase.auth.signOut();
            if (error) throw error;
        }

        // Remove token from localStorage
        apiService.removeToken();
        return { success: true };
    } catch (error) {
        console.error("Sign out error:", error);
        throw error;
    }
}

// Get Current User
export async function getCurrentUser() {
    try {
        const useSupabase = await checkAuthMethod();

        if (useSupabase && supabase) {
            // Use Supabase to get current user
            const {
                data: { user },
                error,
            } = await supabase.auth.getUser();
            if (error) throw error;
            return user;
        } else {
            // Use custom API to get current user
            const token = apiService.getToken();
            if (!token) {
                return null;
            }

            const response = await apiService.getCurrentUser(token);

            if (response.status === "success") {
                return response.data.user;
            } else {
                // Token might be invalid, remove it
                apiService.removeToken();
                return null;
            }
        }
    } catch (error) {
        console.error("Get user error:", error);
        // Remove invalid token
        apiService.removeToken();
        return null;
    }
}

// Get User Tokens
export async function getUserTokens() {
    try {
        const token = apiService.getToken();
        if (!token) {
            throw new Error("No authentication token found");
        }

        const response = await apiService.getUserTokens(token);

        if (response.status === "success") {
            return response.data;
        } else {
            throw new Error(response.message || "Failed to get user tokens");
        }
    } catch (error) {
        console.error("Get user tokens error:", error);
        throw error;
    }
}

// Use User Tokens
export async function useTokens(amount) {
    try {
        const token = apiService.getToken();
        if (!token) {
            throw new Error("No authentication token found");
        }

        const response = await apiService.useTokens(amount, token);

        if (response.status === "success") {
            return response.data;
        } else {
            throw new Error(response.message || "Failed to use tokens");
        }
    } catch (error) {
        console.error("Use tokens error:", error);
        throw error;
    }
}

// Check if user is authenticated
export function isAuthenticated() {
    return apiService.isAuthenticated();
}

// Get stored token
export function getToken() {
    return apiService.getToken();
}

// Set token (for external auth flows like Google OAuth)
export function setToken(token) {
    apiService.setToken(token);
}
