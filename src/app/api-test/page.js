"use client";

import { useState } from "react";
import { apiService } from "../../utils/APIService.js";

export default function APITestPage() {
    const [testResults, setTestResults] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const runAPITests = async () => {
        setIsLoading(true);
        setError(null);

        try {
            console.log("Starting API tests...");

            // Test 1: Check API connection
            const connectionTest = await apiService.testConnection();
            console.log("Connection test result:", connectionTest);

            // Test 2: Test specific endpoints
            const endpointTests = {};

            // Test root endpoint
            try {
                const rootResponse = await fetch(apiService.baseURL);
                endpointTests.root = {
                    status: rootResponse.status,
                    statusText: rootResponse.statusText,
                    success: rootResponse.ok,
                };
            } catch (err) {
                endpointTests.root = { error: err.message, success: false };
            }

            // Test API endpoint
            try {
                const apiResponse = await fetch(`${apiService.baseURL}/api`);
                endpointTests.api = {
                    status: apiResponse.status,
                    statusText: apiResponse.statusText,
                    success: apiResponse.ok,
                };
            } catch (err) {
                endpointTests.api = { error: err.message, success: false };
            }

            // Test auth endpoints
            try {
                const authResponse = await fetch(
                    `${apiService.baseURL}/api/auth/login`,
                    {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            email: "test@test.com",
                            password: "test",
                        }),
                    }
                );
                endpointTests.auth = {
                    status: authResponse.status,
                    statusText: authResponse.statusText,
                    success: authResponse.status === 401, // Expected for invalid credentials
                };
            } catch (err) {
                endpointTests.auth = { error: err.message, success: false };
            }

            setTestResults({
                baseURL: apiService.baseURL,
                connectionTest,
                endpointTests,
                timestamp: new Date().toISOString(),
            });
        } catch (err) {
            console.error("API test failed:", err);
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-8">
                    API Integration Test
                </h1>

                <div className="bg-white p-6 rounded-lg shadow mb-8">
                    <h2 className="text-xl font-semibold mb-4">
                        Test Configuration
                    </h2>
                    <div className="space-y-2 text-sm">
                        <p>
                            <strong>API Base URL:</strong> {apiService.baseURL}
                        </p>
                        <p>
                            <strong>Is Local:</strong>{" "}
                            {apiService.isLocal ? "Yes" : "No"}
                        </p>
                        <p>
                            <strong>Use Supabase Auth:</strong>{" "}
                            {apiService.useSupabaseAuth ? "Yes" : "No"}
                        </p>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow mb-8">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-semibold">Run Tests</h2>
                        <button
                            onClick={runAPITests}
                            disabled={isLoading}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                        >
                            {isLoading ? "Running Tests..." : "Run API Tests"}
                        </button>
                    </div>

                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                            <strong>Error:</strong> {error}
                        </div>
                    )}
                </div>

                {testResults && (
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-xl font-semibold mb-4">
                            Test Results
                        </h2>
                        <div className="space-y-4">
                            <div>
                                <h3 className="font-medium mb-2">
                                    Connection Test
                                </h3>
                                <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
                                    {JSON.stringify(
                                        testResults.connectionTest,
                                        null,
                                        2
                                    )}
                                </pre>
                            </div>

                            <div>
                                <h3 className="font-medium mb-2">
                                    Endpoint Tests
                                </h3>
                                <div className="space-y-2">
                                    {Object.entries(
                                        testResults.endpointTests
                                    ).map(([endpoint, result]) => (
                                        <div
                                            key={endpoint}
                                            className="border rounded p-3"
                                        >
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="font-medium">
                                                    {endpoint}
                                                </span>
                                                <span
                                                    className={`text-sm px-2 py-1 rounded ${
                                                        result.success
                                                            ? "bg-green-100 text-green-800"
                                                            : "bg-red-100 text-red-800"
                                                    }`}
                                                >
                                                    {result.success
                                                        ? "SUCCESS"
                                                        : "FAILED"}
                                                </span>
                                            </div>
                                            <pre className="text-sm bg-gray-50 p-2 rounded">
                                                {JSON.stringify(
                                                    result,
                                                    null,
                                                    2
                                                )}
                                            </pre>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="text-sm text-gray-600">
                                <strong>Test completed at:</strong>{" "}
                                {testResults.timestamp}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
