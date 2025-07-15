"use client";

import { useEffect } from "react";

export default function PaddleProvider() {
    useEffect(() => {
        if (typeof window !== "undefined" && window.Paddle) {
            // Sandbox or production — adjust as needed
            window.Paddle.Environment.set("sandbox");

            window.Paddle.Initialize({
                token: process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN,
                checkout: {
                    settings: {
                        theme: "light", // or "dark"
                        variant: "overlay", // or "overlay", "one-page"
                    },
                },
            });
        }
    }, []);

    return null; // It’s just for setup
}
