"use client";

import { useState } from "react";
import { apiService } from "../../utils/APIService.js";
import { signIn, signUp, getCurrentUser } from "../../utils/auth.js";

export default function TestAuthPage() {
    const [results, setResults] = useState(null);
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("test@example.com");
    const [password, setPassword] = useState("testpassword");
    const [username, setUsername] = useState("testuser");

    const testEndpoints = async () => {
        setLoading(true);
        try {
            const result = await apiService.testConnection();
            setResults({ type: "endpoints", data: result });
        } catch (error) {
            setResults({ type: "error", data: error.message });
        } finally {
            setLoading(false);
        }
    };

    const testSignUp = async () => {
        setLoading(true);
        try {
            const result = await signUp(email, password, username);
            setResults({ type: "signup", data: result });
        } catch (error) {
            setResults({ type: "error", data: error.message });
        } finally {
            setLoading(false);
        }
    };

    const testSignIn = async () => {
        setLoading(true);
        try {
            const result = await signIn(email, password);
            setResults({ type: "signin", data: result });
        } catch (error) {
            setResults({ type: "error", data: error.message });
        } finally {
            setLoading(false);
        }
    };

    const testGetUser = async () => {
        setLoading(true);
        try {
            const result = await getCurrentUser();
            setResults({ type: "getuser", data: result });
        } catch (error) {
            setResults({ type: "error", data: error.message });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-8">
                    Authentication Test Page
                </h1>

                <div className="bg-white p-6 rounded-lg shadow mb-8">
                    <h2 className="text-xl font-semibold mb-4">
                        Test Credentials
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Email
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Password
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Username
                            </label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    <button
                        onClick={testEndpoints}
                        disabled={loading}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                    >
                        {loading ? "Testing..." : "Test Endpoints"}
                    </button>

                    <button
                        onClick={testSignUp}
                        disabled={loading}
                        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50"
                    >
                        {loading ? "Testing..." : "Test Sign Up"}
                    </button>

                    <button
                        onClick={testSignIn}
                        disabled={loading}
                        className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 disabled:opacity-50"
                    >
                        {loading ? "Testing..." : "Test Sign In"}
                    </button>

                    <button
                        onClick={testGetUser}
                        disabled={loading}
                        className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 disabled:opacity-50"
                    >
                        {loading ? "Testing..." : "Test Get User"}
                    </button>
                </div>

                {results && (
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-xl font-semibold mb-4">
                            {results.type === "error"
                                ? "Error"
                                : results.type === "endpoints"
                                ? "Endpoint Test Results"
                                : results.type === "signup"
                                ? "Sign Up Results"
                                : results.type === "signin"
                                ? "Sign In Results"
                                : "Get User Results"}
                        </h2>

                        {results.type === "error" ? (
                            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                                <p className="text-red-700">{results.data}</p>
                            </div>
                        ) : (
                            <pre className="bg-gray-100 p-4 rounded overflow-auto text-sm">
                                {JSON.stringify(results.data, null, 2)}
                            </pre>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
