"use client";

import Script from "next/script";

export default function PaddleScript() {
    return (
        <Script
            src="https://cdn.paddle.com/paddle/v2/paddle.js"
            strategy="beforeInteractive"
            onLoad={() => {
                if (Paddle) {
                    Paddle.Environment.set("sandbox");
                    Paddle.Initialize({
                        token: process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN,
                        eventCallback: function (data) {
                            console.log(data);
                        },
                    });
                }
            }}
        />
    );
}
