// lib/usePaddleCheckout.js
"use client";

import { useEffect, useState } from "react";

export const usePaddleCheckout = () => {
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const interval = setInterval(() => {
                if (
                    window.Paddle &&
                    typeof window.Paddle.Checkout?.open === "function"
                ) {
                    setIsReady(true);
                    clearInterval(interval);
                }
            }, 200); // check every 200ms

            return () => clearInterval(interval);
        }
    }, []);

    const openCheckout = ({
        priceId,
        amountPaid,
        subscriptionTypeName,
        subscriptionPeriod,
        token,
    }) => {
        if (!isReady) {
            return alert(
                "⚠️ Paddle is still initializing. Try again in a few seconds."
            );
        }

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
                    location.reload();
                } else {
                    alert("❌ Something went wrong: " + result.msg);
                }
            },
        });
    };

    return { openCheckout, isReady };
};
