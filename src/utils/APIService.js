if (!process.env.NEXT_PUBLIC_API_BASE_URL) {
    throw new Error("Missing NEXT_PUBLIC_API_BASE_URL in env!");
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

class APIService {
    constructor() {
        this.baseURL = API_BASE_URL;
        this.isLocal =
            this.baseURL.includes("localhost") ||
            this.baseURL.includes("127.0.0.1");
        this.useSupabaseAuth = false; // Will be set after checking available endpoints
    }

    async checkAvailableEndpoints() {
        console.log("Checking available endpoints on the server...");

        const testEndpoints = [
            "/api/auth/login",
            "/api/auth/register",
            "/api/user/me",
            "/api/upload/pdf",
            "/api/summarize",
            "/api/flashcards",
            "/health",
            "/status",
            "/",
        ];

        const results = {};

        for (const endpoint of testEndpoints) {
            try {
                const response = await fetch(`${this.baseURL}${endpoint}`, {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                });
                results[endpoint] = {
                    status: response.status,
                    statusText: response.statusText,
                    available: response.status !== 404,
                };
                console.log(
                    `${endpoint}: ${response.status} ${response.statusText}`
                );
            } catch (error) {
                results[endpoint] = {
                    error: error.message,
                    available: false,
                };
                console.log(`${endpoint}: Error - ${error.message}`);
            }
        }

        // Check if any auth endpoints are available
        const authEndpointsAvailable =
            results["/api/auth/login"]?.available ||
            results["/api/auth/register"]?.available;

        if (!authEndpointsAvailable) {
            console.log(
                "No custom auth endpoints found. Will use Supabase authentication."
            );
            this.useSupabaseAuth = true;
        } else {
            console.log(
                "Custom auth endpoints found. Using custom authentication."
            );
            this.useSupabaseAuth = false;
        }

        return results;
    }

    async makeRequest(endpoint, options = {}) {
        let url = this.baseURL;

        if (!endpoint.startsWith("/api/")) {
            url += `/api`;
        }

        url += endpoint;

        const config = {
            headers: {
                ...options.headers,
            },
            ...options,
        };

        // Handle FormData differently
        if (options.isFormData) {
            delete config.headers["Content-Type"];
        } else {
            config.headers["Content-Type"] = "application/json";
        }

        if (options.isFormData) {
            config.body = options.body;
        } else if (options.body) {
            config.body = JSON.stringify(options.body);
        }

        // 🔁 Add timeout logic
        const controller = new AbortController();
        const timeoutId = setTimeout(() => {
            controller.abort();
        }, 300000); // 5 minutes = 300,000ms
        config.signal = controller.signal;

        try {
            console.log(`Making request to: ${url}`);
            const response = await fetch(url, config);
            clearTimeout(timeoutId);

            const contentType = response.headers.get("content-type");
            if (!contentType || !contentType.includes("application/json")) {
                console.error(
                    `Non-JSON response from ${url}:`,
                    response.status,
                    response.statusText
                );

                if (response.status === 404) {
                    console.error(`Endpoint not found: ${url}`);
                }

                throw new Error(
                    `Server returned ${response.status}: ${response.statusText}. Expected JSON response.`
                );
            }

            const data = await response.json();

            if (!response.ok) {
                if (response.status === 500) {
                    if (data.message === "Database connection not available") {
                        throw new Error(
                            "Backend is not properly configured. Please check the environment variables."
                        );
                    }
                    throw new Error(data.message || "Server error occurred");
                }
                throw new Error(
                    data.message ||
                        data.error ||
                        `HTTP ${response.status}: ${response.statusText}`
                );
            }

            return data;
        } catch (error) {
            clearTimeout(timeoutId);
            if (error.name === "AbortError") {
                throw new Error(
                    "The request took too long and was cancelled. Try again."
                );
            }
            if (error.name === "TypeError" && error.message.includes("fetch")) {
                throw new Error(
                    "Cannot connect to backend server. Please make sure the backend is running."
                );
            }
            throw error;
        }
    }

    // Authentication Methods
    async login(email, password) {
        // If using Supabase auth, this will be handled by the auth.js file
        if (this.useSupabaseAuth) {
            throw new Error(
                "This API uses Supabase authentication. Please use the Supabase auth methods."
            );
        }
        return this.makeRequest("/auth/login", {
            method: "POST",
            body: { email, password },
        });
    }

    async register(email, password, username) {
        // If using Supabase auth, this will be handled by the auth.js file
        if (this.useSupabaseAuth) {
            throw new Error(
                "This API uses Supabase authentication. Please use the Supabase auth methods."
            );
        }

        return this.makeRequest("/auth/register", {
            method: "POST",
            body: { email, password, username },
        });
    }

    async googleAuth(redirectTo) {
        return this.makeRequest("/auth/google", {
            method: "POST",
            body: { redirectTo },
        });
    }

    async getCurrentUser(token) {
        return this.makeRequest("/user/me/", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    }

    // Token Management
    async getUserTokens(token) {
        return this.makeRequest("/user/tokens/", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    }

    async useTokens(amount, token) {
        return this.makeRequest(`/user/tokens/use?amount=${amount}`, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    }

    async addTokens(amount, token) {
        return this.makeRequest(`/user/tokens/add?amount=${amount}`, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    }

    // Upload Methods
    async uploadPDF(file, token) {
        const formData = new FormData();
        formData.append("pdf", file);

        return this.makeRequest("/upload/pdf", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData,
            isFormData: true,
        });
    }

    // Summary Methods
    async generatePDFSummary(uploadId, token) {
        return this.makeRequest(`/summarize/pdf/${uploadId}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    }

    async getAllSummaries(token) {
        return this.makeRequest("/summarize/", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    }

    // Flashcard Methods
    async generatePDFFlashcards(uploadId, token) {
        return this.makeRequest(`/flashcards/pdf/${uploadId}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    }

    async getAllFlashcards(token) {
        return this.makeRequest("/flashcards/", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    }

    // Utility Methods
    getToken() {
        if (typeof window !== "undefined") {
            return localStorage.getItem("accessToken");
        }
        return null;
    }

    setToken(token) {
        if (typeof window !== "undefined") {
            localStorage.setItem("accessToken", token);
        }
    }

    removeToken() {
        if (typeof window !== "undefined") {
            localStorage.removeItem("accessToken");
        }
    }

    isAuthenticated() {
        return !!this.getToken();
    }

    // Debug method to test API connectivity
    async testConnection() {
        try {
            console.log("Testing API connection...");
            console.log("Base URL:", this.baseURL);
            console.log("Is Local:", this.isLocal);

            // First check what endpoints are available
            const availableEndpoints = await this.checkAvailableEndpoints();

            const results = {};

            // Test basic connectivity
            try {
                const response = await fetch(this.baseURL);
                results.root = {
                    status: response.status,
                    statusText: response.statusText,
                };
                console.log(
                    "Root endpoint response:",
                    response.status,
                    response.statusText
                );
            } catch (error) {
                results.root = { error: error.message };
            }

            // Test if /api endpoint exists
            try {
                const apiResponse = await fetch(`${this.baseURL}/api`);
                results.api = {
                    status: apiResponse.status,
                    statusText: apiResponse.statusText,
                };
                console.log(
                    "/api endpoint response:",
                    apiResponse.status,
                    apiResponse.statusText
                );
            } catch (error) {
                results.api = { error: error.message };
            }

            return {
                baseURL: this.baseURL,
                isLocal: this.isLocal,
                useSupabaseAuth: this.useSupabaseAuth,
                availableEndpoints,
                results,
            };
        } catch (error) {
            console.error("Connection test failed:", error);
            throw error;
        }
    }
}

export const apiService = new APIService();
