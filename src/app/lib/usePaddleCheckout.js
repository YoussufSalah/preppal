// lib/usePaddleCheckout.js

"use client";

import { useEffect } from "react";

export const usePaddleCheckout = () => {
    console.log(process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN);
    useEffect(() => {
        if (typeof window !== "undefined" && window.Paddle) {
            window.Paddle.Setup({
                token: process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN,
            });
        }
    }, []);

    const openCheckout = ({
        priceId,
        amountPaid,
        subscriptionTypeName,
        subscriptionPeriod,
        token,
    }) => {
        if (!window?.Paddle) return alert("Checkout not ready yet.");

        window.Paddle.Checkout.open({
            items: [{ priceId }],
            onCheckoutComplete: async (data) => {
                const res = await fetch("/api/paddle/success", {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        paddlePaymentId: data.id,
                        amountPaid,
                        subscriptionTypeName,
                        subscriptionPeriod,
                    }),
                });

                const result = await res.json();
                if (result.status === "success") {
                    alert("🎉 Subscription activated!");
                    location.reload(); // or navigate to dashboard
                } else {
                    alert("❌ Something went wrong: " + result.msg);
                }
            },
        });
    };

    return { openCheckout };
};
