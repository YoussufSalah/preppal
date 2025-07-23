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

        const controller = new AbortController();
        const timeoutId = setTimeout(() => {
            controller.abort();
        }, 1000 * 60 * 10);
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
        return this.makeRequest("/user/me/tokens", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    }

    async useTokens(amount, token) {
        return this.makeRequest(`/user/me/tokens/use?amount=${amount}`, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    }

    async addTokens(amount, token) {
        return this.makeRequest(`/user/me/tokens/add?amount=${amount}`, {
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
    async generateSummaryFromParsedText(parsedText, tokensNeeded, token) {
        return this.makeRequest(`/summarize/pdf`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: { parsedText, tokensNeeded },
        });
    }

    // Flashcard Methods
    async generateFlashcardsFromParsedText(parsedText, tokensNeeded, token) {
        return this.makeRequest(`/flashcards/pdf`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: { parsedText, tokensNeeded },
        });
    }

    // Quiz Methods
    async generateQuizFromParsedText(parsedText, tokensNeeded, token) {
        return this.makeRequest(`/quizzes/pdf`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: { parsedText, tokensNeeded },
        });
    }

    async addStudyTime(minutes, token) {
        return await this.makeRequest("/user/me/increment-study-time/", {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: { minutes },
        });
    }

    async getStudyTime(token) {
        return await this.makeRequest("/user/me/", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    }

    async getUserStats(token) {
        return this.makeRequest("/user/me/stats/", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    }

    async updateUserStreak({ current_streak, best_streak }, token) {
        return this.makeRequest("/users/me", {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                current_streak,
                best_streak,
            }),
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
