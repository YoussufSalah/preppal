"use client";

import { useState } from "react";

export default function EnvCheckPage() {
    const [showSecrets, setShowSecrets] = useState(false);

    const envVars = {
        NEXT_PUBLIC_API_BASE_URL:
            process.env.NEXT_PUBLIC_API_BASE_URL ||
            "https://ai-study-companion-api-production.up.railway.app (default)",
        NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
        NEXT_PUBLIC_SUPABASE_ANON_KEY:
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    };

    const checkEnvVar = (value) => {
        if (!value) return { status: "missing", color: "text-red-600" };
        if (value.includes("your-") || value.includes("placeholder"))
            return { status: "placeholder", color: "text-yellow-600" };
        return { status: "set", color: "text-green-600" };
    };

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-8">
                    Environment Variables Check
                </h1>

                <div className="bg-white p-6 rounded-lg shadow mb-8">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-semibold">
                            Environment Variables
                        </h2>
                        <button
                            onClick={() => setShowSecrets(!showSecrets)}
                            className="bg-gray-600 text-white px-3 py-1 rounded text-sm hover:bg-gray-700"
                        >
                            {showSecrets ? "Hide" : "Show"} Secrets
                        </button>
                    </div>

                    <div className="space-y-4">
                        {Object.entries(envVars).map(([key, value]) => {
                            const check = checkEnvVar(value);
                            return (
                                <div
                                    key={key}
                                    className="border rounded-lg p-4"
                                >
                                    <div className="flex items-center justify-between">
                                        <span className="font-medium">
                                            {key}
                                        </span>
                                        <span
                                            className={`text-sm font-medium ${check.color}`}
                                        >
                                            {check.status.toUpperCase()}
                                        </span>
                                    </div>
                                    <div className="mt-2">
                                        {showSecrets || !key.includes("KEY") ? (
                                            <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                                                {value || "Not set"}
                                            </code>
                                        ) : (
                                            <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                                                {value
                                                    ? "••••••••••••••••"
                                                    : "Not set"}
                                            </code>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-xl font-semibold mb-4">Next Steps</h2>
                    <div className="space-y-3 text-sm">
                        <div className="flex items-start space-x-2">
                            <span className="text-blue-600 font-medium">
                                1.
                            </span>
                            <span>
                                The API base URL is set to use the deployed
                                Railway instance by default
                            </span>
                        </div>
                        <div className="flex items-start space-x-2">
                            <span className="text-blue-600 font-medium">
                                2.
                            </span>
                            <span>
                                If you need to use a different API URL, set the{" "}
                                <code className="bg-gray-100 px-1 rounded">
                                    NEXT_PUBLIC_API_BASE_URL
                                </code>{" "}
                                environment variable
                            </span>
                        </div>
                        <div className="flex items-start space-x-2">
                            <span className="text-blue-600 font-medium">
                                3.
                            </span>
                            <span>
                                Restart your development server after changing
                                environment variables
                            </span>
                        </div>
                        <div className="flex items-start space-x-2">
                            <span className="text-blue-600 font-medium">
                                4.
                            </span>
                            <span>
                                Visit{" "}
                                <code className="bg-gray-100 px-1 rounded">
                                    /test-auth
                                </code>{" "}
                                to test authentication
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
