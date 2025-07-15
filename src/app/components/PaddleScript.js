"use client";

import Script from "next/script";

export default function PaddleScript() {
    return (
        <Script
            src="https://cdn.paddle.com/paddle/paddle.js"
            strategy="beforeInteractive"
            onLoad={() => {
                if (typeof window !== "undefined" && window.Paddle) {
                    window.Paddle.Setup({
                        vendor: 34469,
                        sandbox: true, // keep true for sandbox, false for production
                    });
                }
            }}
        />
    );
}
