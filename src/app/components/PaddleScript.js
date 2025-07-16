"use client";

import Script from "next/script";

export default function PaddleScript() {
    return (
        <Script
            src="https://cdn.paddle.com/paddle/v2/paddle.js"
            strategy="beforeInteractive"
            onLoad={() => {
                if (window.Paddle) {
                    window.Paddle.Environment.set("sandbox");
                    window.Paddle.Initialize({
                        token: process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN,
                        checkout: {
                            settings: {
                                displayMode: "overlay",
                                theme: "light",
                                locale: "en",
                            },
                        },
                        eventCallback: (data) =>
                            console.log("Paddle event:", data),
                    });
                }
            }}
        />
    );
}
