"use client";

import { useState } from "react";
import { apiService } from "../../utils/APIService.js";

export default function DebugPage() {
    const [results, setResults] = useState(null);
    const [loading, setLoading] = useState(false);

    const testEndpoints = async () => {
        setLoading(true);
        try {
            const result = await apiService.testConnection();
            setResults(result);
        } catch (error) {
            setResults({ error: error.message });
        } finally {
            setLoading(false);
        }
    };

    const testLogin = async () => {
        setLoading(true);
        try {
            const result = await apiService.login(
                "test@example.com",
                "password123"
            );
            setResults({ loginResult: result });
        } catch (error) {
            setResults({ loginError: error.message });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-8">API Debug Page</h1>

                <div className="space-y-4 mb-8">
                    <button
                        onClick={testEndpoints}
                        disabled={loading}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                    >
                        {loading ? "Testing..." : "Test API Endpoints"}
                    </button>

                    <button
                        onClick={testLogin}
                        disabled={loading}
                        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50 ml-4"
                    >
                        {loading ? "Testing..." : "Test Login"}
                    </button>
                </div>

                {results && (
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-xl font-semibold mb-4">Results:</h2>
                        <pre className="bg-gray-100 p-4 rounded overflow-auto text-sm">
                            {JSON.stringify(results, null, 2)}
                        </pre>
                    </div>
                )}
            </div>
        </div>
    );
}
